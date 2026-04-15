const { test, expect } = require('@playwright/test');

test.describe('🔥 Complete Frames Handling Scenarios', () => {

  const URL = 'https://the-internet.herokuapp.com/iframe';


  // 🔹 1. Basic iframe handling (recommended)
  test('Handle iframe using frameLocator', async ({ page }) => {

    await page.goto(URL);

    const frame = page.frameLocator('#mce_0_ifr');

    await frame.locator('#tinymce').fill('Hello from Playwright');

    await expect(frame.locator('#tinymce')).toHaveText('Hello from Playwright');
  });


  // 🔹 2. Using page.frame() (less recommended)
  test('Handle iframe using page.frame()', async ({ page }) => {

    await page.goto(URL);

    const frame = page.frame({ name: 'mce_0_ifr' });

    await frame.fill('#tinymce', 'Using frame() method');

    await expect(frame.locator('#tinymce')).toHaveText('Using frame() method');
  });


  // 🔹 3. Locate iframe by index
  test('Handle iframe by index', async ({ page }) => {

    await page.goto(URL);

    const frame = page.frames()[1]; // index

    await frame.fill('#tinymce', 'Frame by index');

    console.log(await frame.title());
  });


  // 🔹 4. Multiple frames handling
  test('Handle multiple frames', async ({ page }) => {

    await page.goto('https://www.w3schools.com/html/tryit.asp?filename=tryhtml_iframe');

    const outerFrame = page.frameLocator('#iframeResult');
    const innerFrame = outerFrame.frameLocator('iframe');

    await expect(innerFrame.locator('h1')).toHaveText('This page is displayed in an iframe');
  });


  // 🔹 5. Nested iframe (iframe inside iframe)
  test('Handle nested iframe', async ({ page }) => {

    await page.goto('https://www.w3schools.com/html/tryit.asp?filename=tryhtml_iframe');

    const frame1 = page.frameLocator('#iframeResult');
    const frame2 = frame1.frameLocator('iframe');

    await expect(frame2.locator('h1')).toBeVisible();
  });


  // 🔹 6. Switch back to main page
  test('Switch back to main page', async ({ page }) => {

    await page.goto(URL);

    const frame = page.frameLocator('#mce_0_ifr');

    await frame.locator('#tinymce').fill('Inside Frame');

    // Back to main page
    await page.locator('h3').click();

    console.log('Back to main page');
  });


  // 🔹 7. Verify element inside iframe
  test('Validate element inside frame', async ({ page }) => {

    await page.goto(URL);

    const frame = page.frameLocator('#mce_0_ifr');

    await expect(frame.locator('#tinymce')).toBeVisible();
  });


  // 🔹 8. Wait for iframe to load
  test('Wait for iframe load', async ({ page }) => {

    await page.goto(URL);

    const frame = page.frameLocator('#mce_0_ifr');

    await frame.locator('#tinymce').waitFor();

    console.log('Frame loaded');
  });


  // 🔹 9. Handle dynamic iframe
  test('Handle dynamic iframe', async ({ page }) => {

    await page.goto(URL);

    const frame = page.frameLocator('iframe'); // generic selector

    await frame.locator('#tinymce').fill('Dynamic iframe handled');
  });


  // 🔹 10. Count total frames
  test('Count frames', async ({ page }) => {

    await page.goto(URL);

    const frames = page.frames();

    console.log('Total frames:', frames.length);
  });


  // 🔹 11. Loop through frames
  test('Loop through frames', async ({ page }) => {

    await page.goto(URL);

    const frames = page.frames();

    for (const f of frames) {
      console.log('Frame URL:', f.url());
    }
  });


  // 🔹 12. Frame with slow loading
  test('Handle slow iframe', async ({ page }) => {

    await page.goto(URL);

    const frame = page.frameLocator('#mce_0_ifr');

    await frame.locator('#tinymce').waitFor({ state: 'visible' });

    console.log('Frame is ready');
  });


  // 🔹 13. Frame inside popup (advanced)
  test('Frame inside popup', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Click Here')
    ]);

    await popup.waitForLoadState();

    // Example: if popup had iframe
    console.log('Popup handled (frame can be handled similarly)');
  });


  // 🔹 14. Reusable utility for frame
  test('Reusable frame utility', async ({ page }) => {

    await page.goto(URL);

    function getEditorFrame() {
      return page.frameLocator('#mce_0_ifr');
    }

    const frame = getEditorFrame();

    await frame.locator('#tinymce').fill('Reusable method');
  });


  // 🔹 15. Error handling if frame not found
  test('Handle frame not found', async ({ page }) => {

    await page.goto(URL);

    try {
      const frame = page.frameLocator('#wrong_iframe');

      await frame.locator('#tinymce').fill('Test');
    } catch (e) {
      console.log('Frame not found handled');
    }
  });

});