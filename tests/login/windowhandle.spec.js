const { test, expect } = require('@playwright/test');

test.describe('🔥 Complete Window Handling Scenarios', () => {

  // 🌐 Base URL
  const URL = 'https://the-internet.herokuapp.com/windows';


  // 🔹 1. New Tab using context
  test('Handle new tab (context)', async ({ page, context }) => {

    await page.goto(URL);

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Click Here')
    ]);

    await newPage.waitForLoadState();

    await expect(newPage).toHaveTitle(/New Window/);
  });


  // 🔹 2. Popup from same page
  test('Handle popup (page)', async ({ page }) => {

    await page.goto(URL);

    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('text=Click Here')
    ]);

    await popup.waitForLoadState();

    await expect(popup).toHaveURL(/new/);
  });


  // 🔹 3. Switch between multiple tabs
  test('Switch between tabs', async ({ page, context }) => {

    await page.goto(URL);

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Click Here')
    ]);

    const pages = context.pages();

    for (const p of pages) {
      console.log(await p.title());
    }

    await newPage.bringToFront();
  });


  // 🔹 4. Close specific tab
  test('Close new tab only', async ({ page, context }) => {

    await page.goto(URL);

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Click Here')
    ]);

    await newPage.close();

    console.log('Remaining tabs:', context.pages().length);
  });


  // 🔹 5. Handle multiple tabs dynamically
  test('Handle multiple tabs', async ({ page, context }) => {

    await page.goto(URL);

    for (let i = 0; i < 3; i++) {
      await Promise.all([
        context.waitForEvent('page'),
        page.click('text=Click Here')
      ]);
    }

    const pages = context.pages();

    console.log('Total tabs:', pages.length);

    for (const p of pages) {
      await p.waitForLoadState();
      console.log(await p.title());
    }
  });


  // 🔹 6. Wait for specific URL
  test('Wait for URL in new tab', async ({ page, context }) => {

    await page.goto(URL);

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Click Here')
    ]);

    await newPage.waitForURL('**/windows/new');

    expect(newPage.url()).toContain('new');
  });


  // 🔹 7. Wait for specific title
  test('Wait for title in new tab', async ({ page, context }) => {

    await page.goto(URL);

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Click Here')
    ]);

    await newPage.waitForLoadState();

    await expect(newPage).toHaveTitle('New Window');
  });


  // 🔹 8. Handle tab without Promise.all (NOT RECOMMENDED but for learning)
  test('Handle tab without Promise.all', async ({ page, context }) => {

    await page.goto(URL);

    page.click('text=Click Here');

    const newPage = await context.waitForEvent('page');

    await newPage.waitForLoadState();

    console.log(await newPage.title());
  });


  // 🔹 9. Identify new tab among existing tabs
  test('Identify newly opened tab', async ({ page, context }) => {

    await page.goto(URL);

    const existingPages = context.pages();

    await page.click('text=Click Here');

    const newPage = await context.waitForEvent('page');

    const allPages = context.pages();

    const latestPage = allPages.find(p => !existingPages.includes(p));

    console.log('New tab title:', await latestPage.title());
  });


  // 🔹 10. Bring parent page back to front
  test('Switch back to parent tab', async ({ page, context }) => {

    await page.goto(URL);

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Click Here')
    ]);

    await newPage.bringToFront();

    // switch back
    await page.bringToFront();

    console.log('Back to parent:', await page.title());
  });


  // 🔹 11. Close all child tabs
  test('Close all child tabs', async ({ page, context }) => {

    await page.goto(URL);

    for (let i = 0; i < 2; i++) {
      await Promise.all([
        context.waitForEvent('page'),
        page.click('text=Click Here')
      ]);
    }

    const pages = context.pages();

    for (let i = 1; i < pages.length; i++) {
      await pages[i].close();
    }

    console.log('Remaining tabs:', context.pages().length);
  });


  // 🔹 12. Handle tab with slow loading
  test('Handle slow loading tab', async ({ page, context }) => {

    await page.goto(URL);

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Click Here')
    ]);

    await newPage.waitForLoadState('domcontentloaded');

    console.log('Loaded:', await newPage.title());
  });


  // 🔹 13. Verify content inside new tab
  test('Verify content in new tab', async ({ page, context }) => {

    await page.goto(URL);

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Click Here')
    ]);

    await expect(newPage.locator('h3')).toHaveText('New Window');
  });


  // 🔹 14. Handle multiple users (multiple contexts)
  test('Multiple contexts (multi-user)', async ({ browser }) => {

    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    await page1.goto('https://example.com');
    await page2.goto('https://example.com');

    console.log('User1 URL:', page1.url());
    console.log('User2 URL:', page2.url());
  });


  // 🔹 15. Reusable utility approach
  test('Reusable window handler utility', async ({ page, context }) => {

    await page.goto(URL);

    async function openNewTabAndReturn() {
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('text=Click Here')
      ]);
      await newPage.waitForLoadState();
      return newPage;
    }

    const tab = await openNewTabAndReturn();

    console.log(await tab.title());
  });

});