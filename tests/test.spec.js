const { test, expect } = require('@playwright/test');

test('login test', async ({ page }) => {

  await page.goto('https://demoqa.com/select-menu');

//  await page.locator('#username').fill('Ganesh');
//  await page.locator('#password').fill('12345');
//  await page.locator('#loginBtn').click();
// Select by value
//await page.selectOption('#oldSelectMenu', '1');
// Select by label
await page.selectOption('#oldSelectMenu', { label: 'Green' });

// Select by index
//await page.selectOption('#oldSelectMenu', { index: 2 });

await page.goto('https://demoqa.com/select-menu');

// Multi-select
await page.selectOption('#cars', ['volvo', 'saab']);
await page.pause();
});