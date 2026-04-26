import { test, expect } from '@playwright/test';

const URL = 'https://example.com/login';

test.describe('Playwright Waits - Complete Concept Guide', () => {

  // ============================================================
  // 1. SIMPLE ACTIONS (NO SPECIAL WAIT NEEDED)
  // ============================================================
  test('simple actions - no Promise.all needed', async ({ page }) => {
    await page.goto(URL);

    // ❗ These actions do NOT trigger fast one-time events
    // So there is nothing to "catch"
    await page.fill('#username', 'user');
    await page.fill('#password', 'pass');

    await page.click('#login');

    // ✅ expect() waits for UI state automatically
    await expect(page.locator('#dashboard')).toBeVisible();

    // 🔥 WHY THIS WORKS:
    // - element exists in same page
    // - Playwright auto-retries locator
  });


  // ============================================================
  // 2. NAVIGATION (PAGE RELOAD / REDIRECT)
  // ============================================================
  test('navigation handling (correct pattern)', async ({ page }) => {
    await page.goto(URL);

    await page.fill('#username', 'user');
    await page.fill('#password', 'pass');

    // ❗ click triggers navigation immediately
    // If we don't listen early → we may MISS navigation event

    await Promise.all([
      page.waitForNavigation(), // 👂 start listening FIRST
      page.click('#login')      // 🎯 trigger navigation
    ]);

    // OR better modern approach:
    // await page.click('#login');
    // await expect(page).toHaveURL('**/dashboard');

    await expect(page.locator('#dashboard')).toBeVisible();

    // 🔥 WHY WAIT NAVIGATION?
    // - page is being replaced
    // - DOM is unstable during transition
    // - ensures next step runs on fully loaded page
  });


  // ============================================================
  // 3. WRONG NAVIGATION (FLAKY TEST EXAMPLE)
  // ============================================================
  test('wrong navigation - flaky test example', async ({ page }) => {
    await page.goto(URL);

    await page.click('#login');

    // ❌ PROBLEM:
    // navigation might already be finished BEFORE this line runs

    await page.waitForNavigation();

    // 🔴 RESULT:
    // - sometimes passes
    // - sometimes times out (flaky)

    await expect(page.locator('#dashboard')).toBeVisible();
  });


  // ============================================================
  // 4. NEW TAB / POPUP HANDLING
  // ============================================================
  test('new tab handling (window handling)', async ({ page, context }) => {
    await page.goto(URL);

    // ❗ clicking opens a NEW page (different object)
    // If we don't listen early → event is LOST

    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // 👂 listen for new tab
      page.click('text=Click Here') // 🎯 trigger tab open
    ]);

    await newPage.waitForLoadState();

    await expect(newPage).toHaveTitle(/New Window/);

    // 🔥 WHY WE MUST CAPTURE NEW PAGE:
    // - it's a completely new page object
    // - expect(page) cannot see it
    // - without capture → no control over tab
  });


  // ============================================================
  // 5. DOWNLOAD HANDLING
  // ============================================================
  test('download handling (file download)', async ({ page }) => {
    await page.goto(URL);

    // ❗ downloads are FAST events
    // If we wait AFTER click → we MISS the event

    const [download] = await Promise.all([
      page.waitForEvent('download'), // 👂 listen FIRST
      page.click('#downloadBtn')     // 🎯 trigger download
    ]);

    // We now have access to file
    const fileName = download.suggestedFilename();

    expect(fileName).toContain('file');

    // 🔥 WHY WAIT DOWNLOAD?
    // - download event is one-time
    // - no DOM element represents it
    // - must capture immediately
  });


  // ============================================================
  // 6. API / NETWORK RESPONSE WAIT
  // ============================================================
  test('API response handling', async ({ page }) => {
    await page.goto(URL);

    const [response] = await Promise.all([
      page.waitForResponse('**/login'), // 👂 listen for API
      page.click('#login')              // 🎯 trigger request
    ]);

    expect(response.ok()).toBeTruthy();

    // 🔥 WHY WAIT RESPONSE?
    // - ensures backend request completed
    // - useful for validation of API calls
  });


  // ============================================================
  // 7. EXPECT vs EVENT WAIT (IMPORTANT DIFFERENCE)
  // ============================================================
  test('expect vs event waiting difference', async ({ page }) => {
    await page.goto(URL);

    await page.click('#login');

    // ✅ THIS WORKS:
    // because locator exists in same page and Playwright retries
    await expect(page.locator('#dashboard')).toBeVisible();

    // ❌ BUT THIS WOULD NOT WORK FOR NEW PAGE:
    // expect cannot "create" or "discover" newPage
  });


  // ============================================================
  // 8. CORE CONCEPT SUMMARY (IN COMMENTS FORM)
  // ============================================================
  test('concept summary (no actions)', async () => {

    // 🔥 PLAYWRIGHT WAIT RULES:

    // 1. UI STATE (use expect)
    // - element appears/disappears
    // - text changes
    // - URL changes

    // 2. EVENT-BASED (use Promise.all)
    // - navigation
    // - popup/new tab
    // - download
    // - API response

    // 3. SIMPLE ACTIONS (no extra wait)
    // - fill()
    // - click() (if no event dependency)

    // 🔥 GOLDEN RULE:
    // If something is created instantly → you must listen BEFORE triggering it

  });

});