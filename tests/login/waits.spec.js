const { test, expect } = require('@playwright/test');

/**
 * ============================================================
 * 🧠 COMPLETE PLAYWRIGHT WAITS - ALL IN ONE FILE
 * ============================================================
 *
 * Covers:
 * ✔ Element waits
 * ✔ Assertion waits (BEST)
 * ✔ Navigation waits
 * ✔ Event waits
 * ✔ Network waits
 * ✔ Custom waits
 * ✔ Download / file chooser
 * ✔ Advanced polling
 *
 */


/**
 * ============================================================
 * 🔥 1. waitForSelector()
 * ============================================================
 */
test('waitForSelector', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
  await page.click('#start button');

  await page.waitForSelector('#finish', { state: 'visible' });

});


/**
 * ============================================================
 * 🔥 2. locator.waitFor()
 * ============================================================
 */
test('locator.waitFor', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
  await page.click('#start button');

  const el = page.locator('#finish');
  await el.waitFor({ state: 'visible' });

});


/**
 * ============================================================
 * 🔥 3. EXPECT (AUTO WAIT - BEST PRACTICE)
 * ============================================================
 */
test('expect auto wait', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
  await page.click('#start button');

  await expect(page.locator('#finish')).toBeVisible();

});


/**
 * ============================================================
 * 🔥 4. waitForTimeout() (❌ Avoid)
 * ============================================================
 */
test('waitForTimeout', async ({ page }) => {

  await page.goto('https://example.com');
  await page.waitForTimeout(2000);

});


/**
 * ============================================================
 * 🔥 5. waitForLoadState()
 * ============================================================
 */
test('waitForLoadState', async ({ page }) => {

  await page.goto('https://example.com');

  await page.waitForLoadState('load');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');

});


/**
 * ============================================================
 * 🔥 6. waitForURL()
 * ============================================================
 */
test('waitForURL', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com');

  await page.click('text=Form Authentication');

  await page.waitForURL('**/login');

});


/**
 * ============================================================
 * 🔥 7. waitForNavigation() (Legacy)
 * ============================================================
 */
test('waitForNavigation', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com');

  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Form Authentication')
  ]);

});


/**
 * ============================================================
 * 🔥 8. waitForEvent() (Dialog example)
 * ============================================================
 */
test('waitForEvent - dialog', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  const [dialog] = await Promise.all([
    page.waitForEvent('dialog'),
    page.click('button[onclick="jsAlert()"]')
  ]);

  await dialog.accept();

});


/**
 * ============================================================
 * 🔥 9. waitForEvent() (New tab example)
 * ============================================================
 */
test('waitForEvent - new tab', async ({ context, page }) => {

  await page.goto('https://the-internet.herokuapp.com/windows');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('a[href="/windows/new"]')
  ]);

  await newPage.waitForLoadState();

});


/**
 * ============================================================
 * 🔥 10. waitForResponse()
 * ============================================================
 */
test('waitForResponse', async ({ page }) => {

  await page.goto('https://reqres.in');

  await page.waitForResponse(resp =>
    resp.url().includes('/api/users') && resp.status() === 200
  );

});


/**
 * ============================================================
 * 🔥 11. waitForRequest()
 * ============================================================
 */
test('waitForRequest', async ({ page }) => {

  await page.goto('https://reqres.in');

  await page.waitForRequest(req =>
    req.url().includes('/api/users')
  );

});


/**
 * ============================================================
 * 🔥 12. waitForFunction()
 * ============================================================
 */
test('waitForFunction', async ({ page }) => {

  await page.goto('https://example.com');

  await page.waitForFunction(() =>
    document.title.includes('Example')
  );

});


/**
 * ============================================================
 * 🔥 13. DOWNLOAD WAIT
 * ============================================================
 */
test('waitForDownload', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/download');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('a[href="download/some-file.txt"]')
  ]);

});


/**
 * ============================================================
 * 🔥 14. FILE CHOOSER WAIT
 * ============================================================
 */
test('waitForFileChooser', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/upload');

  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.click('#file-upload')
  ]);

});


/**
 * ============================================================
 * 🔥 15. EXPECT.POLL (ADVANCED WAIT)
 * ============================================================
 */
test('expect.poll', async ({ page }) => {

  await page.goto('https://example.com');

  await expect.poll(async () => {
    return await page.title();
  }).toContain('Example');

});


/**
 * ============================================================
 * 🔥 16. FRAME WAIT (INDIRECT)
 * ============================================================
 */
test('frame wait', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/iframe');

  const frameLocator = page.frameLocator('#mce_0_ifr');

  await frameLocator.locator('body').waitFor();

});


/**
 * ============================================================
 * 🏆 FINAL SUMMARY
 * ============================================================
 *
 * ✔ expect() → BEST (auto wait)
 * ✔ locator.waitFor() → modern
 * ✔ waitForResponse() → API
 * ✔ waitForEvent() → dialog/tab
 * ✔ waitForURL() → navigation
 *
 * ⚠️ Rare:
 * waitForFunction, waitForRequest
 *
 * ❌ Avoid:
 * waitForTimeout
 *
 */


  // =========================
  // 1. EXPLICIT WAIT (HARDCODED - NOT RECOMMENDED)
  // =========================
  await page.waitForTimeout(3000);
  // Waits 3 seconds (avoid in real tests)


  // =========================
  // 2. WAIT FOR SELECTOR
  // =========================
  await page.waitForSelector('#start');
  // Wait until element appears in DOM

  await page.click('#start button');


  // =========================
  // 3. WAIT FOR ELEMENT STATE
  // =========================
  await page.waitForSelector('#finish', { state: 'visible' });
  // Wait until element is visible

  await page.waitForSelector('#finish', { state: 'hidden' });
  // Wait until element disappears


  // =========================
  // 4. WAIT FOR LOAD STATE
  // =========================
  await page.waitForLoadState('load');
  // Page fully loaded

  await page.waitForLoadState('domcontentloaded');
  // DOM ready

  await page.waitForLoadState('networkidle');
  // No network calls for 500ms


  // =========================
  // 5. WAIT FOR NAVIGATION
  // =========================
  await Promise.all([
    page.waitForNavigation(),
    page.click('a') // triggers navigation
  ]);


  // =========================
  // 6. WAIT FOR EVENT
  // =========================

  // Download
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('a')
  ]);

  // Dialog (alert/confirm/prompt)
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  // Popup (new tab)
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('a[target="_blank"]')
  ]);

  // File chooser
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.click('#uploadBtn')
  ]);

  await fileChooser.setFiles('file.txt');


  // =========================
  // 7. WAIT FOR RESPONSE (API)
  // =========================
  await page.waitForResponse(response =>
    response.url().includes('/api') && response.status() === 200
  );


  // =========================
  // 8. WAIT FOR REQUEST
  // =========================
  await page.waitForRequest(request =>
    request.url().includes('/api')
  );


  // =========================
  // 9. WAIT FOR FUNCTION (CUSTOM CONDITION)
  // =========================
  await page.waitForFunction(() => {
    return document.title.includes('Example');
  });


  // =========================
  // 10. LOCATOR AUTO-WAIT (MOST IMPORTANT ⭐)
  // =========================
  const btn = page.locator('#start button');

  await btn.click();
  // Auto waits:
  // - element visible
  // - element enabled
  // - stable


  // =========================
  // 11. EXPECT AUTO-WAIT
  // =========================
  await expect(page.locator('#finish')).toBeVisible();
  // Automatically waits until visible


  // =========================
  // 12. CUSTOM TIMEOUT
  // =========================
  await page.waitForSelector('#finish', { timeout: 10000 });
  // Wait max 10 seconds


  // =========================
  // 13. WAIT FOR URL
  // =========================
  await page.waitForURL('**/dynamic_loading/**');
  // Wait for specific URL


  // =========================
  // 14. WAIT FOR FRAME
  // =========================
  const frame = page.frameLocator('iframe');

  await frame.locator('body').waitFor();
  // Wait inside iframe


});