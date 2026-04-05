import { test, expect } from '@playwright/test';

test('Playwright Expect Cheat Sheet', async ({ page }) => {

  // Navigate to application
  await page.goto('https://example.com');

  const locator = page.locator('#sample'); // sample locator

  // =========================
  // 🌐 PAGE ASSERTIONS
  // =========================

  await expect(page).toHaveURL('https://example.com');
  // Checks exact URL

  await expect(page).toHaveURL(/example/);
  // Checks URL using regex (partial match)

  await expect(page).toHaveTitle('Example Domain');
  // Checks exact page title

  await expect(page).toHaveTitle(/Example/);
  // Checks partial title using regex


  // =========================
  // 👁️ VISIBILITY & STATE
  // =========================

  await expect(locator).toBeVisible();
  // Element is visible on UI

  await expect(locator).not.toBeVisible();
  // Element should NOT be visible

  await expect(locator).toBeHidden();
  // Element exists but hidden

  await expect(locator).toBeAttached();
  // Element present in DOM

  await expect(locator).toBeEnabled();
  // Element is enabled

  await expect(locator).toBeDisabled();
  // Element is disabled

  await expect(locator).toBeEditable();
  // Input field is editable

  await expect(locator).toBeFocused();
  // Element has focus


  // =========================
  // ☑️ CHECKBOX / RADIO
  // =========================

  await expect(locator).toBeChecked();
  // Checkbox or radio is selected

  await expect(locator).not.toBeChecked();
  // Checkbox is NOT selected


  // =========================
  // 🔤 TEXT ASSERTIONS
  // =========================

  await expect(locator).toHaveText('Hello World');
  // Exact text match

  await expect(locator).toContainText('Hello');
  // Partial text match

  await expect(locator).toHaveText(/Hello/);
  // Regex text match

  await expect(locator).toHaveText(['Item1', 'Item2']);
  // Validate multiple elements text


  // =========================
  // 🔢 COUNT
  // =========================

  await expect(page.locator('.list-item')).toHaveCount(3);
  // Validates number of elements


  // =========================
  // 🧾 ATTRIBUTE
  // =========================

  await expect(locator).toHaveAttribute('type', 'text');
  // Check attribute exact value

  await expect(locator).toHaveAttribute('class', /active/);
  // Check attribute using regex


  // =========================
  // 🎨 CSS
  // =========================

  await expect(locator).toHaveCSS('color', 'rgb(255, 0, 0)');
  // Validate CSS property


  // =========================
  // 📥 INPUT VALUE
  // =========================

  await expect(locator).toHaveValue('admin');
  // Validate input field value


  // =========================
  // ⚙️ JS PROPERTY
  // =========================

  await expect(locator).toHaveJSProperty('value', 'admin');
  // Validate JS property


  // =========================
  // 📸 SCREENSHOT (VISUAL TEST)
  // =========================

  await expect(page).toHaveScreenshot();
  // Compare full page screenshot

  await expect(locator).toHaveScreenshot();
  // Compare element screenshot


  // =========================
  // 🔁 NEGATIVE ASSERTIONS
  // =========================

  await expect(locator).not.toHaveText('Error');
  // Ensure text is NOT present


  // =========================
  // ⏱️ TIMEOUT
  // =========================

  await expect(locator).toBeVisible({ timeout: 10000 });
  // Custom wait time (10 seconds)


  // =========================
  // 🧪 SOFT ASSERTIONS
  // =========================

  await expect.soft(locator).toBeVisible();
  // Even if fails, test continues


  // =========================
  // 🔄 POLLING (ADVANCED)
  // =========================

  await expect.poll(async () => {
    return await page.title();
  }).toBe('Example Domain');
  // Retry until condition matches


  // =========================
  // 🌐 API ASSERTIONS
  // =========================

  const response = await page.request.get('https://reqres.in/api/users');

  expect(response.status()).toBe(200);
  // Validate API status

  const body = await response.json();

  expect(body).toHaveProperty('data');
  // Check key exists

  expect(Array.isArray(body.data)).toBeTruthy();
  // Validate array

  expect(body.data.length).toBeGreaterThan(0);
  // Validate data not empty


  // =========================
  // ⚖️ GENERIC JS ASSERTIONS
  // =========================

  expect(10).toBe(10);
  // Exact match

  expect({ a: 1 }).toEqual({ a: 1 });
  // Deep equality

  expect([1, 2]).toContain(1);
  // Array contains value

  expect('hello world').toMatch(/world/);
  // Regex match

  expect(5).toBeGreaterThan(3);
  // Greater than

  expect(5).toBeLessThan(10);
  // Less than

  expect(true).toBeTruthy();
  // Truthy value

  expect(false).toBeFalsy();
  // Falsy value

});