// ============================================================
// playwright.spec.js
// Full execution cycle: script → Page → Frame → CDPSession
//                       → WebSocket → Chrome → Promise → back
// Example: page.goto("https://google.com")
// ============================================================

const { chromium } = require('playwright');


// ============================================================
// WHAT HAPPENS WHEN chromium.launch() RUNS
//
// Internally Playwright does:
//   1. finds Chrome binary on your machine
//   2. spawns Chrome as real OS process with flags:
//      --remote-debugging-port=9222
//      --headless
//   3. opens WebSocket: ws://localhost:9222
//   4. creates Browser JS object wrapping that WebSocket
//   5. returns Browser via Promise → await unwraps it
//
// So 'browser' variable = thin JS wrapper holding the WebSocket
// ============================================================


// ============================================================
// STEP 1 — YOUR SCRIPT
// Three setup lines run first. Then goto() starts the cycle.
// ============================================================

// ── SETUP ──────────────────────────────────────────────────
// chromium.launch()
//   internally: spawn Chrome.exe + open WebSocket ws://9222
//   returns:    Promise<Browser>
//   await:      unwraps → real Browser object
const browser = await chromium.launch({ headless: true });

// browser.newContext()
//   internally: CDPSession.send('Target.createBrowserContext')
//   Chrome creates isolated profile, returns contextId
//   returns:    Promise<BrowserContext>
//   await:      unwraps → real BrowserContext object
const context = await browser.newContext();

// context.newPage()
//   internally: CDPSession.send('Target.createTarget', {url:'about:blank'})
//   Chrome opens new tab, returns targetId
//   returns:    Promise<Page>
//   await:      unwraps → real Page object
const page = await context.newPage();

// NOW page is ready. The cycle below starts when you call goto().


// ============================================================
// STEP 2 — Page.goto() IS CALLED
// Page class delegates immediately to its internal _mainFrame
//
// Inside Playwright source — Page class:
//   async goto(url, options = {}) {
//     return this._mainFrame.goto(url, options);
//     //          ↑ Page is just a thin wrapper around Frame
//     //            every tab has one main Frame
//     //            Frame handles all actual navigation
//   }
//
// goto() does NOT talk to Chrome.
// It does NOT open the URL.
// It just passes responsibility to Frame.
// ============================================================

// WITHOUT await — you get a Promise, not a Response
const withoutAwait = page.goto('https://google.com');
console.log(withoutAwait);         // Promise { <pending> }
// withoutAwait.status()           // 💥 ERROR — Promise has no status()

// WITH await — Promise unwraps into real Response object
const response = await page.goto('https://google.com');
console.log(response.status());    // 200
console.log(response.url());       // 'https://www.google.com/'
console.log(response.ok());        // true


// ============================================================
// STEP 3 — Frame.goto() builds CDP command
// Frame constructs exact CDP params and calls _session.send()
//
// Inside Playwright source — Frame class:
//   async goto(url, options) {
//     const result = await this._page._session.send(
//       'Page.navigate',       ← CDP method name
//       {
//         url:            url,
//         frameId:        this._id,
//         transitionType: 'typed'
//       }
//     );
//   }
//
// _session is a CDPSession object
// .send() is the single gateway — like execute() in Selenium
// returns a Promise — Chrome hasn't responded yet
// ============================================================


// ============================================================
// STEP 4 — CDPSession serialises to JSON + sends over WebSocket
//
// CDPSession.send() internally does:
//   1. assigns unique message ID (e.g. 42)
//   2. builds JSON:
//      {
//        "id":     42,
//        "method": "Page.navigate",
//        "params": {
//          "url":    "https://google.com",
//          "frameId":"ABC123"
//        }
//      }
//   3. writes JSON to WebSocket: ws://localhost:9222
//   4. stores Promise resolver: pendingCallbacks.set(42, resolve)
//   5. returns Promise — waiting for Chrome to respond with id:42
//
// Chrome is on the other end of the WebSocket, listening.
// ============================================================


// ============================================================
// STEP 5 — Chrome receives Page.navigate CDP command
//
// Chrome's built-in DevTools engine receives the WebSocket msg.
// Chrome responds IMMEDIATELY with:
//   {
//     "id":     42,
//     "result": {
//       "frameId":  "ABC123",
//       "loaderId": "XYZ789"
//     }
//   }
//
// BUT page is NOT loaded yet!
// Chrome just acknowledged the command.
// Playwright now waits for a SECOND event: Page.loadEventFired
//
// This is different from Selenium's get() which only waits for
// document.readyState === 'complete'
//
// Playwright supports multiple wait states:
//   'commit'          → navigation committed (fastest)
//   'domcontentloaded'→ DOM ready, no CSS/JS yet
//   'load'            → full page load (default)
//   'networkidle'     → no network requests for 500ms
// ============================================================

// You can control what Playwright waits for:
await page.goto('https://google.com', { waitUntil: 'load' });
await page.goto('https://google.com', { waitUntil: 'networkidle' });
await page.goto('https://google.com', { waitUntil: 'domcontentloaded' });


// ============================================================
// STEP 6 — Chrome actually loads google.com
//
// Chrome does ALL real browser work:
//
//   1. DNS lookup:      google.com → 142.250.195.68
//   2. TCP connect:     SYN → SYN-ACK → ACK
//   3. TLS handshake:   ClientHello → ServerHello → Finished
//   4. HTTP/2 GET /:    ← 200 OK (HTML response)
//   5. Parse HTML:      build DOM tree
//   6. Fetch CSS:       apply styles
//   7. Fetch JS:        execute scripts
//   8. Render:          paint pixels on screen
//   9. loadEvent fires: ← Playwright is waiting for THIS
//
// The JS object 'page' does ZERO of this work.
// page is just a remote control.
// Chrome is the TV doing all the real rendering.
// ============================================================


// ============================================================
// STEP 7 — Page.loadEventFired travels back through chain
//
// Chrome fires this CDP event over WebSocket:
//   {
//     "method": "Page.loadEventFired",
//     "params": { "timestamp": 1234567.89 }
//   }
//
// CDPSession receives this event.
// It looks in pendingCallbacks for matching Promise resolver.
// It calls resolve(Response) → Promise is now fulfilled.
// await was waiting → it now unwraps the Promise.
// response variable gets the real Response object.
// ============================================================


// ============================================================
// STEP 8 — await unwraps Promise, Response object returned
// Your next lines now run.
// ============================================================

const res = await page.goto('https://google.com');

// Response object — only available in Playwright, not Selenium
console.log(res.status());      // 200
console.log(res.statusText());  // 'OK'
console.log(res.url());         // 'https://www.google.com/'  (after redirects)
console.log(res.ok());          // true  (status 200-299)
console.log(res.headers());     // { 'content-type': 'text/html', ... }

// every next call follows EXACT same cycle:
// page.click()       → CDPSession.send('Input.dispatchMouseEvent') → Chrome
// page.fill()        → CDPSession.send('Input.insertText')         → Chrome
// page.screenshot()  → CDPSession.send('Page.captureScreenshot')   → Chrome
// page.evaluate()    → CDPSession.send('Runtime.callFunctionOn')    → Chrome


// ============================================================
// FULL CYCLE PROOF — intercept network at CDP level
// This shows Playwright talking CDP directly (no chromedriver)
// ============================================================

test('intercept network request using CDP directly', async () => {

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page    = await context.newPage();

  // Playwright's route() internally sends CDP command:
  // Network.setRequestInterception + Fetch.enable
  // This is IMPOSSIBLE in Selenium — it needs plugins
  await page.route('**/*.png', route => {
    console.log('Intercepted image:', route.request().url());
    route.abort();  // block all PNG images
    // internally: CDPSession.send('Fetch.fulfillRequest', {requestId, ...})
  });

  await page.goto('https://example.com');
  // all PNG images are blocked — direct CDP power

  await browser.close();
});


// ============================================================
// FULL CYCLE PROOF — listen to raw CDP events directly
// page.on() hooks into CDP events from Chrome
// ============================================================

test('listen to raw Chrome CDP events', async () => {

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page    = await context.newPage();

  // create a raw CDPSession — go beneath Playwright's abstraction
  const cdpSession = await context.newCDPSession(page);

  // enable Network domain — tells Chrome to start sending network events
  await cdpSession.send('Network.enable');

  // listen to raw CDP events as Chrome fires them
  cdpSession.on('Network.requestWillBeSent', event => {
    console.log('Request:', event.request.url);
    // this fires directly from Chrome over WebSocket
    // no HTTP, no chromedriver — pure CDP
  });

  cdpSession.on('Network.responseReceived', event => {
    console.log('Response:', event.response.status, event.response.url);
  });

  await page.goto('https://example.com');
  // you will see every network request Chrome makes — raw CDP events

  await browser.close();
});


// ============================================================
// FULL CYCLE PROOF — every page method = one CDP command
// ============================================================

test('show CDP command behind every page method', async () => {

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page    = await context.newPage();

  // page.goto()
  // CDPSession.send('Page.navigate', { url })
  await page.goto('https://example.com');

  // page.click()
  // CDPSession.send('DOM.querySelector') + 'Input.dispatchMouseEvent'
  // await page.click('h1');

  // page.fill()
  // CDPSession.send('DOM.querySelector') + 'Input.insertText'
  // await page.fill('#input', 'hello');

  // page.screenshot()
  // CDPSession.send('Page.captureScreenshot', { format:'png' })
  await page.screenshot({ path: 'screenshot.png' });

  // page.evaluate()
  // CDPSession.send('Runtime.callFunctionOn', { functionDeclaration })
  const title = await page.evaluate(() => document.title);
  console.log(title);   // 'Example Domain'

  // page.waitForSelector()
  // CDPSession.send('DOM.querySelector') repeatedly until found
  await page.waitForSelector('h1');

  // page.title()
  // CDPSession.send('Runtime.evaluate', { expression: 'document.title' })
  console.log(await page.title());

  await browser.close();
});


// ============================================================
// SELENIUM vs PLAYWRIGHT — same goal, different path
// ============================================================

test('conceptual: selenium vs playwright execution path', async () => {

  // ── SELENIUM PATH for driver.get("https://google.com") ──
  //
  //  Your code (Java)
  //    ↓ (method call)
  //  RemoteWebDriver.get()
  //    ↓ (packages command)
  //  execute(DriverCommand.GET, {url})
  //    ↓ (HTTP POST)
  //  http://localhost:9515/session/{id}/url   ← chromedriver.exe
  //    ↓ (chromedriver translates HTTP → CDP)
  //  CDP Page.navigate over WebSocket
  //    ↓
  //  Chrome loads page
  //    ↓ (response travels back same path)
  //  get() returns void
  //
  //  HOPS: script → HTTP → chromedriver.exe → CDP → Chrome  (3 hops)
  //  RETURN: void (no Response object)

  // ── PLAYWRIGHT PATH for page.goto("https://google.com") ──
  //
  //  Your code (JS)
  //    ↓ (async method call → returns Promise)
  //  Page.goto() → Frame.goto()
  //    ↓ (CDPSession.send)
  //  CDP Page.navigate JSON over WebSocket ws://9222
  //    ↓ (NO chromedriver — direct to Chrome)
  //  Chrome loads page
  //    ↓ (Page.loadEventFired CDP event back over WebSocket)
  //  CDPSession resolves Promise
  //    ↓ (await unwraps)
  //  goto() returns Response{status:200, url:...}
  //
  //  HOPS: script → CDP → Chrome  (1 hop — no middleman)
  //  RETURN: Response object with status, url, headers

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page    = await context.newPage();

  // Playwright returns Response — Selenium returns void
  const response = await page.goto('https://example.com');
  console.log(response.status());   // 200
  console.log(response.url());      // 'https://example.com/'
  console.log(response.ok());       // true

  await browser.close();
});


// ============================================================
// COMPLETE RUNNABLE TEST — full cycle from launch to close
// ============================================================

test('complete cycle: launch → context → page → goto → verify → close', async () => {

  // ── STEP 1: launch (Chrome process spawned, WebSocket opened) ──
  const browser = await chromium.launch({ headless: true });
  console.log('Chrome launched:', browser.isConnected());  // true

  // ── STEP 2: newContext (CDP Target.createBrowserContext) ──
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  console.log('Context created:', browser.contexts().length);  // 1

  // ── STEP 3: newPage (CDP Target.createTarget → new tab) ──
  const page = await context.newPage();
  console.log('Page created:', context.pages().length);   // 1
  console.log('Back-ref works:', page.context() === context);  // true

  // ── STEP 4: goto (CDP Page.navigate → Chrome loads URL) ──
  const response = await page.goto('https://example.com', {
    waitUntil: 'load'   // wait for full page load event
  });

  // ── STEP 5: verify Response (Promise resolved with Response) ──
  console.log('Status:',  response.status());   // 200
  console.log('URL:',     response.url());      // 'https://example.com/'
  console.log('OK:',      response.ok());       // true

  // ── STEP 6: interact (each = one CDP command to Chrome) ──
  const title = await page.title();             // CDP Runtime.evaluate
  console.log('Title:', title);                 // 'Example Domain'

  const heading = await page.locator('h1').textContent();
  console.log('Heading:', heading);             // 'Example Domain'

  // ── STEP 7: screenshot (CDP Page.captureScreenshot) ──
  await page.screenshot({ path: 'example.png' });

  // ── STEP 8: close in reverse order ──
  await page.close();     // CDP Target.closeTarget
  await context.close();  // CDP Target.disposeBrowserContext
  await browser.close();  // kills Chrome OS process

  console.log('Browser connected after close:', browser.isConnected()); // false
});
z