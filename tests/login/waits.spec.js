import { test, expect } from '@playwright/test';

test('All Playwright Waits Cheat Sheet', async ({ page }) => {

  // Navigate to sample site
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');


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