import { test, expect } from '@playwright/test';

/**
 * =========================================================
 * 1. BASIC PROMISE
 * =========================================================
 */

test('Basic Promise example', async () => {
  const promise = new Promise((resolve, reject) => {
    let success = true;

    if (success) {
      resolve("Success");
    } else {
      reject("Failed");
    }
  });

  promise
    .then(res => console.log("Resolved:", res))
    .catch(err => console.log("Rejected:", err));
});


/**
 * =========================================================
 * 2. PROMISE.RESOLVE (SHORTCUT)
 * =========================================================
 */

test('Promise.resolve example', async () => {
  function testFn() {
    return Promise.resolve("Hello");
  }

  const result = testFn();
  console.log("Direct call:", result); // Promise

  const value = await testFn();
  console.log("Using await:", value); // Hello
});


/**
 * =========================================================
 * 3. PROMISE.REJECT
 * =========================================================
 */

test('Promise.reject example', async () => {
  function testFn() {
    return Promise.reject("Something went wrong");
  }

  try {
    await testFn();
  } catch (err) {
    console.log("Caught Error:", err);
  }
});


/**
 * =========================================================
 * 4. USING .then() (PROMISE HANDLING)
 * =========================================================
 */

test('Using .then()', async () => {
  function getData() {
    return Promise.resolve("Data received");
  }

  getData().then(data => {
    console.log("Using then:", data);
  });
});


/**
 * =========================================================
 * 5. PROMISE CHAINING
 * =========================================================
 */

test('Promise chaining', async () => {
  function getData() {
    return Promise.resolve("Step1");
  }

  getData()
    .then(data => data + " -> Step2")
    .then(result => console.log("Chained result:", result));
});


/**
 * =========================================================
 * 6. ASYNC FUNCTION (RETURNS PROMISE)
 * =========================================================
 */

test('Async function behavior', async () => {
  async function testFn() {
    return "Hello Async";
  }

  const result = testFn();
  console.log("Async returns:", result); // Promise

  const value = await testFn();
  console.log("Await value:", value); // Hello Async
});


/**
 * =========================================================
 * 7. AWAIT (WAIT FOR PROMISE)
 * =========================================================
 */

test('Await usage', async () => {
  function getData() {
    return new Promise(resolve => {
      setTimeout(() => resolve("Delayed Data"), 1000);
    });
  }

  const data = await getData();
  console.log("Awaited:", data);
});


/**
 * =========================================================
 * 8. ASYNC + TRY-CATCH (ERROR HANDLING)
 * =========================================================
 */

test('Async error handling', async () => {
  function getError() {
    return Promise.reject("API Failed");
  }

  try {
    await getError();
  } catch (err) {
    console.log("Handled Error:", err);
  }
});


/**
 * =========================================================
 * 9. PROMISE.ALL (PARALLEL EXECUTION)
 * =========================================================
 */

test('Promise.all example', async () => {
  const p1 = Promise.resolve("A");
  const p2 = Promise.resolve("B");

  const [res1, res2] = await Promise.all([p1, p2]);

  console.log(res1, res2); // A B
});


/**
 * =========================================================
 * 10. PLAYWRIGHT WITHOUT AWAIT (WRONG WAY)
 * =========================================================
 */

test('Playwright without await (wrong)', async ({ page }) => {
  page.goto('https://example.com'); // ❌
  page.click('a'); // ❌

  console.log("This may run before actions complete");
});


/**
 * =========================================================
 * 11. PLAYWRIGHT WITH AWAIT (CORRECT WAY)
 * =========================================================
 */

test('Playwright with await (correct)', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('a');

  console.log("Actions completed in order");
});


/**
 * =========================================================
 * 12. PLAYWRIGHT USING .then() (NOT RECOMMENDED)
 * =========================================================
 */

test('Playwright using then (not recommended)', async ({ page }) => {
  await page.goto('https://example.com');

  page.click('a')
    .then(() => console.log("Clicked"))
    .catch(err => console.log(err));
});


/**
 * =========================================================
 * 13. COMMON MISTAKE - MIXING THEN + AWAIT
 * =========================================================
 */

test('Mixing then and await (avoid)', async () => {
  function getData() {
    return Promise.resolve("Data");
  }

  const result = await getData().then(res => res); // ❌ not needed
  console.log(result);
});


/**
 * =========================================================
 * 14. REAL PLAYWRIGHT EXAMPLE WITH ERROR HANDLING
 * =========================================================
 */

test('Real Playwright async flow', async ({ page }) => {
  await page.goto('https://example.com');

  try {
    await page.click('#non-existing');
  } catch (err) {
    console.log("Click failed:", err.message);
    throw err;
  }
});


/**
 * =========================================================
 * 15. SUMMARY (IMPORTANT CONCEPT)
 * =========================================================
 */

// Promise → handles async operation
// .then() → handles resolved value
// async → makes function return promise
// await → waits for promise to resolve
// Playwright → uses async/await everywhere