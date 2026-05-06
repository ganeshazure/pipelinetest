const { test, expect } = require('@playwright/test');

/**
 * ============================================================
 * 🧠 WHAT IS A FLAKY TEST?
 * ============================================================
 *
 * A flaky test:
 * → Passes sometimes
 * → Fails sometimes (no code change)
 *
 * Detect using:
 * npx playwright test --repeat-each=10
 *
 */


/**
 * ============================================================
 * 🔥 DEBUGGING FLAKY TESTS (VERY IMPORTANT 🔥)
 * ============================================================
 *
 * Step 1: Reproduce
 *   npx playwright test --repeat-each=10
 *
 * Step 2: Run in debug mode
 *   npx playwright test --debug
 *
 * Step 3: Use Trace Viewer
 *   npx playwright test --trace on
 *   npx playwright show-trace trace.zip
 *
 * Step 4: Add logs
 *   console.log(await page.url());
 *
 * Step 5: Screenshot on failure
 *   await page.screenshot({ path: 'error.png' });
 *
 */


/**
 * ============================================================
 * 🔥 DEBUG EXAMPLE (REAL SCENARIO)
 * ============================================================
 */

test('Debug flaky test example', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

  await page.click('#start button');

  // Debugging logs
  console.log("Current URL:", await page.url());

  // Screenshot for debugging
  await page.screenshot({ path: 'debug.png' });

  // ❌ Flaky
  // await page.waitForTimeout(2000);

  // ✅ Fix
  await expect(page.locator('#finish')).toBeVisible();

});


/**
 * ============================================================
 * 🔥 SCENARIO 1: ELEMENT LOAD DELAY
 * ============================================================
 */

test('Flaky: element loads slowly', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

  await page.click('#start button');

  // ❌ Flaky
  // await page.waitForTimeout(3000);

  // ✅ Fix
  await expect(page.locator('#finish')).toBeVisible();

});


/**
 * ============================================================
 * 🔥 SCENARIO 2: NAVIGATION ISSUE
 * ============================================================
 */

test('Flaky: navigation after click', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com');

  await page.click('text=Form Authentication');

  // Debug log
  console.log("After click URL:", await page.url());

  // ✅ Fix
  await expect(page).toHaveURL(/login/);

});


/**
 * ============================================================
 * 🔥 SCENARIO 3: RACE CONDITION (DIALOG)
 * ============================================================
 */

test('Flaky: dialog handling', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  const [dialog] = await Promise.all([
    page.waitForEvent('dialog'),
    page.click('button[onclick="jsAlert()"]')
  ]);

  console.log("Dialog message:", dialog.message());

  await dialog.accept();

});


/**
 * ============================================================
 * 🔥 SCENARIO 4: NEW TAB ISSUE
 * ============================================================
 */

test('Flaky: new tab handling', async ({ context, page }) => {

  await page.goto('https://the-internet.herokuapp.com/windows');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('a[href="/windows/new"]')
  ]);

  console.log("New Page URL:", await newPage.url());

});


/**
 * ============================================================
 * 🔥 SCENARIO 5: API DELAY
 * ============================================================
 */

test('Flaky: API delay', async ({ page }) => {

  await page.goto('https://reqres.in');

  const response = await page.waitForResponse(resp =>
    resp.url().includes('/api/users')
  );

  console.log("API Response:", response.status());

});


/**
 * ============================================================
 * 🔥 SCENARIO 6: DYNAMIC TEXT (USE expect.poll)
 * ============================================================
 */

test('Flaky: dynamic status', async ({ page }) => {

  await page.goto('https://example.com');

  await expect.poll(async () => {
    const status = await page.textContent('#status');
    console.log("Current status:", status);
    return status;
  }).toBe('Completed');

});


/**
 * ============================================================
 * 🔥 SCENARIO 7: ANIMATION ISSUE
 * ============================================================
 */

test('Flaky: animation', async ({ page }) => {

  await page.goto('https://example.com');

  await page.click('#menu');

  // Debug
  console.log("Menu clicked");

  await expect(page.locator('#submenu')).toBeVisible();

  await page.click('#submenu');

});


/**
 * ============================================================
 * 🔥 SCENARIO 8: BAD LOCATOR
 * ============================================================
 */

test('Flaky: bad locator', async ({ page }) => {

  await page.goto('https://example.com');

  // ❌ Avoid
  // page.locator('div:nth-child(3)')

  // ✅ Better
  // page.getByRole('button', { name: 'Submit' })

});


/**
 * ============================================================
 * 🔥 SCENARIO 9: PARALLEL ISSUE
 * ============================================================
 */

test('Flaky: parallel execution', async ({ page }) => {

  await page.goto('https://example.com');

  console.log("Running in parallel-safe mode");

});


/**
 * ============================================================
 * 🔥 SCENARIO 10: BACKEND PROCESSING DELAY
 * ============================================================
 */

test('Flaky: backend processing', async ({ page }) => {

  await page.goto('https://example.com');

  await expect.poll(async () => {
    return await page.textContent('#orderStatus');
  }, { timeout: 15000 }).toBe('Shipped');

});


/**
 * ============================================================
 * 🏆 FINAL DEBUG + FIX STRATEGY
 * ============================================================
 *
 * 1. Detect:
 *    npx playwright test --repeat-each=10
 *
 * 2. Debug:
 *    --debug
 *    --trace on
 *
 * 3. Identify issue:
 *    timing / API / locator / race condition
 *
 * 4. Fix:
 *    ✔ expect()
 *    ✔ expect.poll()
 *    ✔ Promise.all()
 *    ✔ waitForResponse()
 *
 */