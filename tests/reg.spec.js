const { test, expect } = require('@playwright/test');
test('login test', async ({ page }) => {

await page.goto("https://tutorialsninja.com/demo/index.php?route=account/login");
//await page.locator("#input-email").fill("ganesh@gmail.com");
await page.fill('#input-email', 'Ganesh');
//await page.pause();

});