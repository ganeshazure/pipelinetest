const { test, expect } = require('@playwright/test');

/**
 * ============================================================
 * 🔥 1. GLOBAL HANDLING USING beforeEach (Framework Level)
 * ============================================================
 *
 * beforeEach runs BEFORE every test
 * → attaches dialog listener to page
 * → works for ALL tests (no need to repeat)
 */

test.beforeEach(async ({ page }) => {

  page.on('dialog', async (dialog) => {
    console.log("🌐 Global Handler → Dialog Message:", dialog.message());

    // Accept all dialogs by default
    await dialog.accept();
  });

});


/**
 * ============================================================
 * 🔥 2. HANDLE UNEXPECTED ALERT (EVENT LISTENER)
 * ============================================================
 *
 * page.on('dialog') → registers listener
 * It does NOT execute immediately
 * It waits for event to occur
 *
 * Flow:
 * 1. Listener registered
 * 2. Click action
 * 3. Dialog appears
 * 4. Playwright triggers handler automatically
 */

test('Handle unexpected alert using page.on()', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // Click triggers alert
  await page.click('button[onclick="jsAlert()"]');

  // No explicit handling here → handled by beforeEach
});


/**
 * ============================================================
 * 🔥 3. ONE-TIME HANDLING USING waitForEvent
 * ============================================================
 *
 * waitForEvent('dialog') → waits for one dialog only
 * It BLOCKS execution until dialog appears
 */

test('Handle dialog using waitForEvent()', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  const dialog = await page.waitForEvent('dialog');

  console.log("⏳ waitForEvent → Message:", dialog.message());

  await dialog.accept();

  await page.click('button[onclick="jsAlert()"]');
});


/**
 * ============================================================
 * 🔥 4. BEST PRACTICE → Promise.all (AVOID RACE CONDITION)
 * ============================================================
 *
 * Problem:
 * If click happens before wait → event missed ❌
 *
 * Solution:
 * Promise.all → run BOTH together
 *
 * waitForEvent → returns Promise<Dialog>
 * click → returns Promise<void>
 *
 * Promise.all → [DialogObject, undefined]
 * const [dialog] → destructuring first value
 */

test('Handle dialog using Promise.all()', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  const [dialog] = await Promise.all([
    page.waitForEvent('dialog'),  // start listening
    page.click('button[onclick="jsAlert()"]') // trigger
  ]);

  console.log("⚡ Promise.all → Message:", dialog.message());

  await dialog.accept();
});


/**
 * ============================================================
 * 🔥 5. HANDLE DIFFERENT TYPES OF DIALOGS
 * ============================================================
 *
 * dialog.type():
 * - alert
 * - confirm
 * - prompt
 */

test('Handle confirm and prompt dialogs', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async (dialog) => {

    console.log("Dialog Type:", dialog.type());

    if (dialog.type() === 'confirm') {
      await dialog.dismiss(); // click Cancel
    }

    else if (dialog.type() === 'prompt') {
      await dialog.accept('Ganesh'); // enter text + OK
    }

    else {
      await dialog.accept(); // default alert
    }
  });

  // Trigger confirm
  await page.click('button[onclick="jsConfirm()"]');

  // Trigger prompt
  await page.click('button[onclick="jsPrompt()"]');
});


/**
 * ============================================================
 * 🔥 6. PURE JAVASCRIPT UNDERSTANDING (DESTRUCTURING)
 * ============================================================
 *
 * Promise.all returns array:
 * [result1, result2]
 *
 * const [value] → picks first element
 */

test('Understand destructuring with Promise.all()', async () => {

  function getUser() {
    return Promise.resolve("Ganesh");
  }

  function doNothing() {
    return Promise.resolve(undefined);
  }

  const [name] = await Promise.all([
    getUser(),
    doNothing()
  ]);

  console.log("Extracted Name:", name);

  expect(name).toBe("Ganesh");
});


/**
 * ============================================================
 * 🧠 FINAL SUMMARY
 * ============================================================
 *
 * page.on('dialog')
 * → Listener (runs in background)
 *
 * waitForEvent('dialog')
 * → Waits for one event (blocking)
 *
 * Promise.all
 * → Run wait + action together (avoid race condition)
 *
 * [dialog]
 * → Destructuring → take first resolved value
 *
 * dialog.accept()
 * → Click OK
 *
 * dialog.dismiss()
 * → Click Cancel
 *
 * beforeEach
 * → Global setup for all tests
 *
 */