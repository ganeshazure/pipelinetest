const { test, expect } = require('@playwright/test');

test('Handle new window (tab) using Promise.all', async ({ browser }) => {

  // Create browser context (like incognito session)
  const context = await browser.newContext();

  // Open main page
  const page = await context.newPage();

  await page.goto('https://the-internet.herokuapp.com/windows');

  /**
   * 🔥 IMPORTANT CONCEPT
   *
   * context.waitForEvent('page')
   * → returns Promise<Page> (new tab)
   *
   * page.click()
   * → returns Promise<void>
   *
   * Promise.all resolves both:
   * → [PageObject, undefined]
   *
   * const [newPage] → picks first value
   */

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),   // waits for new tab
    page.click('a[href="/windows/new"]') // click triggers new tab
  ]);

  // Wait for new page to load
  await newPage.waitForLoadState();

  // Get title of new tab
  const title = await newPage.title();

  console.log("New Tab Title:", title);

  await expect(newPage).toHaveTitle('New Window');

});


test('Handle dialog (alert/popup)', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  /**
   * 🔥 IMPORTANT CONCEPT
   *
   * page.on('dialog', handler)
   *
   * on → listen for event
   * dialog → alert/confirm/prompt popup
   *
   * dialog.accept() → click OK
   * dialog.dismiss() → click Cancel
   */

  page.on('dialog', async (dialog) => {

    console.log("Dialog Message:", dialog.message());

    await dialog.accept(); // automatically click OK
  });

  // Trigger alert
  await page.click('button[onclick="jsAlert()"]');

});


test('Explain Promise.all + destructuring (JS concept)', async () => {

  /**
   * 🔥 Pure JavaScript Example (to understand Playwright concept)
   */

  function getUser() {
    return Promise.resolve("Ganesh"); // returns value
  }

  function doSomething() {
    return Promise.resolve(undefined); // returns nothing
  }

  const [name] = await Promise.all([
    getUser(),
    doSomething()
  ]);

  console.log("Extracted Value:", name);

  expect(name).toBe("Ganesh");
});