import { test, expect } from '@playwright/test';

/**
 * =========================================================
 * 1. BASIC JAVASCRIPT EXCEPTION HANDLING
 * =========================================================
 */

test('JS Basic try-catch-finally', async () => {
  try {
    let x = undefined;
    x.click(); // ❌ TypeError
  } catch (err) {
    console.log('Caught JS Error:', err.message);
  } finally {
    console.log('Finally block always executes');
  }
});
try {
  let x = undefined;
  x.click();
} catch (err) {
  console.log(err.name);    // TypeError
  console.log(err.message); // Cannot read...
  console.log(err.stack);   // full trace
}
try {
  throw new Error('Login failed');
} catch (err) {
  console.log(err.message); // Login failed
}

/**
 * =========================================================
 * 2. CUSTOM ERROR THROWING
 * =========================================================
 */

test('JS Custom Error', async () => {
  function validateAge(age) {
    if (age < 18) {
      throw new Error('Age must be >= 18');
    }
    return true;
  }

  try {
    validateAge(15);
  } catch (err) {
    console.log('Custom Error:', err.message);
  }
});


/**
 * =========================================================
 * 3. ASYNC / AWAIT ERROR HANDLING
 * =========================================================
 */

test('Async Await Error Handling', async () => {
  async function fetchData() {
    throw new Error('API Failed');
  }

  try {
    await fetchData();
  } catch (err) {
    console.log('Async Error:', err.message);
  }
});


/**
 * =========================================================
 * 4. PLAYWRIGHT - OPTIONAL POPUP HANDLING
 * =========================================================
 */

test('Handle optional popup', async ({ page }) => {
  await page.goto('https://example.com');

  try {
    await page.locator('#popup-close').click({ timeout: 3000 });
    console.log('Popup closed');
  } catch (err) {
    console.log('Popup not present, continuing...');
  }
});


/**
 * =========================================================
 * 5. PLAYWRIGHT - SCREENSHOT ON FAILURE
 * =========================================================
 */

test('Screenshot on failure', async ({ page }) => {
  await page.goto('https://example.com');

  try {
    await page.click('#non-existing-button');
  } catch (err) {
    console.log('Click failed, taking screenshot...');
    await page.screenshot({ path: 'error.png' });
    throw err; // important
  }
});


/**
 * =========================================================
 * 6. PLAYWRIGHT - RETRY LOGIC
 * =========================================================
 */

test('Retry logic example', async ({ page }) => {
  await page.goto('https://example.com');

  let success = false;

  for (let i = 0; i < 3; i++) {
    try {
      await page.click('#unstable-button');
      success = true;
      break;
    } catch (err) {
      console.log(`Retry attempt ${i + 1}`);
    }
  }

  if (!success) {
    throw new Error('Failed after retries');
  }
});


/**
 * =========================================================
 * 7. PLAYWRIGHT - ASSERTION HANDLING
 * =========================================================
 */

test('Assertion handling', async ({ page }) => {
  await page.goto('https://example.com');

  try {
    await expect(page.locator('h1')).toHaveText('Wrong Text');
  } catch (err) {
    console.log('Assertion failed');
    throw err; // do not hide failure
  }
});


/**
 * =========================================================
 * 8. PLAYWRIGHT - NAVIGATION ERROR
 * =========================================================
 */

test('Navigation error handling', async ({ page }) => {
  try {
    await page.goto('https://invalid-url-test-123.com');
  } catch (err) {
    console.log('Navigation failed:', err.message);
  }
});


/**
 * =========================================================
 * 9. PLAYWRIGHT - API ERROR HANDLING
 * =========================================================
 */

test('API error handling', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/invalid');

  if (!response.ok()) {
    console.log('API failed with status:', response.status());
    throw new Error('API validation failed');
  }
});


/**
 * =========================================================
 * 10. PLAYWRIGHT - MULTIPLE ELEMENT (STRICT MODE ISSUE)
 * =========================================================
 */

test('Strict mode violation handling', async ({ page }) => {
  await page.goto('https://example.com');

  try {
    await page.locator('a').click(); // multiple elements
  } catch (err) {
    console.log('Multiple elements found. Refine locator.');
    throw err;
  }
});


/**
 * =========================================================
 * 11. PLAYWRIGHT - TRY FINALLY FOR CLEANUP
 * =========================================================
 */

test('Try-finally cleanup', async ({ page }) => {
  await page.goto('https://example.com');

  try {
    await page.click('#some-action');
  } catch (err) {
    console.log('Error occurred:', err.message);
  } finally {
    console.log('Closing page...');
    await page.close();
  }
});