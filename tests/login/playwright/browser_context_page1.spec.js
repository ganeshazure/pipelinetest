// browser_context_page.spec.js

/**
 * ============================================
 * 🧠 PLAYWRIGHT: BROWSER → CONTEXT → PAGE
 * ============================================
 *
 * KEY QUESTION:
 * When is TAB created?
 *
 * ANSWER:
 * 👉 Only when we call:
 *    const page = await context.newPage();
 *
 */


/**
 * ============================================
 * 🧪 REAL PLAYWRIGHT CODE
 * ============================================
 */

const { chromium } = require('playwright');

(async () => {

  // 🔥 Step 1: Launch browser
  const browser = await chromium.launch({ headless: false });

  /**
   * Behind the scenes:
   * ✔ Starts Chromium process
   * ✔ Opens browser instance
   * ❌ No tabs yet
   */
  console.log("Browser launched (no tabs yet)");



  // 🔥 Step 2: Create context
  const context = await browser.newContext();

  /**
   * Behind the scenes:
   * ✔ Creates isolated session (like incognito)
   * ✔ Allocates cookies, storage
   * ❌ Still NO tab
   */
  console.log("Context created (still no tab)");



  // 🔥 Step 3: Create page (TAB CREATED HERE)
  const page = await context.newPage();

  /**
   * 🔥 IMPORTANT:
   * ✔ THIS is where tab is created
   * ✔ Page = browser tab
   * ✔ Connected to context
   */
  console.log("New TAB (Page) created");



  // 🔥 Step 4: Load URL
  await page.goto("https://example.com");

  /**
   * ✔ Now tab loads website
   */
  console.log("Website loaded in tab");



  // 🔥 Step 5: Create another tab
  const page2 = await context.newPage();

  /**
   * ✔ Second tab created in SAME context
   * ✔ Shares same session/cookies
   */
  console.log("Second TAB created in same context");



  // 🔥 Step 6: New context (new session)
  const context2 = await browser.newContext();
  const page3 = await context2.newPage();

  /**
   * ✔ New context = new session
   * ✔ New tab = isolated user
   */
  console.log("New context + new tab (isolated session)");



  // 🔥 Close browser
  await browser.close();

})();