# multiuser.spec.js

```js
// ============================================================
// PLAYWRIGHT MULTI-USER ARCHITECTURE
// ============================================================
//
// This file explains:
//
// 1. Default Playwright isolation
// 2. Single user vs multi-user testing
// 3. Why browser contexts are important
// 4. Why industry creates multiple contexts manually
// 5. Difference between:
//      - page
//      - context
//      - browser
//      - storageState
//      - fixtures
// 6. Race conditions
// 7. Promise.all
// 8. Popup handling
// 9. Download handling
// 10. Toast messages
//
// ============================================================
// PLAYWRIGHT INTERNAL ARCHITECTURE
// ============================================================
//
// BrowserType (chromium/firefox/webkit)
//        ↓
// Browser
//        ↓
// BrowserContext
//        ↓
// Page
//
// Real Browser Mapping:
//
// Browser        = Chrome Application
// Context        = Incognito Window / Profile
// Page           = Browser Tab
//
// ============================================================
// IMPORTANT UNDERSTANDING
// ============================================================
//
// Playwright by default creates:
//
//    One NEW context per test
//
// Meaning:
//
//    test1 -> Context1
//    test2 -> Context2
//
// This gives TEST LEVEL isolation.
//
// But industry scenarios sometimes need:
//
//    MULTIPLE USERS inside SAME test
//
// Example:
//
// Customer places order
// Admin approves order
//
// For that we manually create:
//
//    Multiple contexts
//
// ============================================================


const { test, expect } = require('@playwright/test');


// ============================================================
// EXAMPLE 1:
// DEFAULT PLAYWRIGHT PAGE FIXTURE
// ============================================================
//
// Playwright automatically creates:
//
// const context = await browser.newContext();
// const page = await context.newPage();
//
// internally when we use:
//
// async ({ page })
//
// ============================================================


test('Default Playwright page fixture example', async ({ page }) => {

   // Only ONE user/session available here

   await page.goto('https://example.com');

   console.log('Single user session');
});


// ============================================================
// EXAMPLE 2:
// WRONG APPROACH WITHOUT MULTIPLE CONTEXTS
// ============================================================
//
// Problem:
//
// Same page/context used for:
//    Customer
//    Admin
//
// So login session gets overwritten.
//
// ============================================================


test('WITHOUT multiple contexts - WRONG APPROACH', async ({ page }) => {

   // --------------------------------------------------------
   // CUSTOMER LOGIN
   // --------------------------------------------------------

   await page.goto('https://app.com/login');

   await page.fill('#username', 'customer');

   await page.fill('#password', 'cust123');

   await page.click('#login');

   console.log('Customer Logged In');


   // --------------------------------------------------------
   // CUSTOMER ACTION
   // --------------------------------------------------------

   await page.click('#placeOrder');

   console.log('Customer placed order');


   // --------------------------------------------------------
   // ADMIN LOGIN ON SAME PAGE/CONTEXT
   // --------------------------------------------------------
   //
   // PROBLEM:
   //
   // Customer session will be replaced.
   //
   // Same cookies/localStorage reused.
   // --------------------------------------------------------

   await page.goto('https://app.com/login');

   await page.fill('#username', 'admin');

   await page.fill('#password', 'admin123');

   await page.click('#login');

   console.log('Admin Logged In');


   // --------------------------------------------------------
   // ADMIN ACTION
   // --------------------------------------------------------

   await page.click('#approveOrder');

   console.log('Admin approved order');


   // --------------------------------------------------------
   // NOW CUSTOMER SESSION NO LONGER EXISTS
   // --------------------------------------------------------

   // This may fail because current user is admin now

   // await page.click('#trackOrder');
});


// ============================================================
// EXAMPLE 3:
// CORRECT INDUSTRY APPROACH USING MULTIPLE CONTEXTS
// ============================================================
//
// Here we create:
//
// Browser
//    ├── CustomerContext
//    │       └── CustomerPage
//    │
//    └── AdminContext
//            └── AdminPage
//
// Each context has:
//
// - separate cookies
// - separate localStorage
// - separate session
// - separate authentication
//
// Exactly like:
//
// Chrome
//    ├── Incognito Window 1
//    └── Incognito Window 2
//
// ============================================================


test('WITH multiple contexts - CORRECT INDUSTRY APPROACH', async ({ browser }) => {

   // --------------------------------------------------------
   // CUSTOMER CONTEXT
   // --------------------------------------------------------
   //
   // Creates isolated browser session
   // --------------------------------------------------------

   const customerContext = await browser.newContext();


   // --------------------------------------------------------
   // CUSTOMER PAGE/TAB
   // --------------------------------------------------------

   const customerPage = await customerContext.newPage();


   // --------------------------------------------------------
   // ADMIN CONTEXT
   // --------------------------------------------------------

   const adminContext = await browser.newContext();


   // --------------------------------------------------------
   // ADMIN PAGE/TAB
   // --------------------------------------------------------

   const adminPage = await adminContext.newPage();


   // --------------------------------------------------------
   // CUSTOMER LOGIN
   // --------------------------------------------------------

   await customerPage.goto('https://app.com/login');

   await customerPage.fill('#username', 'customer');

   await customerPage.fill('#password', 'cust123');

   await customerPage.click('#login');

   console.log('Customer Logged In');


   // --------------------------------------------------------
   // CUSTOMER ACTION
   // --------------------------------------------------------

   await customerPage.click('#placeOrder');

   console.log('Customer placed order');


   // --------------------------------------------------------
   // ADMIN LOGIN
   // --------------------------------------------------------
   //
   // Completely separate session.
   // Customer remains logged in.
   // --------------------------------------------------------

   await adminPage.goto('https://app.com/login');

   await adminPage.fill('#username', 'admin');

   await adminPage.fill('#password', 'admin123');

   await adminPage.click('#login');

   console.log('Admin Logged In');


   // --------------------------------------------------------
   // ADMIN ACTION
   // --------------------------------------------------------

   await adminPage.click('#approveOrder');

   console.log('Admin approved order');


   // --------------------------------------------------------
   // CUSTOMER SESSION STILL EXISTS
   // --------------------------------------------------------

   await customerPage.click('#trackOrder');

   console.log('Customer tracking order');
});


// ============================================================
// EXAMPLE 4:
// STORAGE STATE
// ============================================================
//
// storageState is used to:
//
// Save authentication session.
//
// auth.json contains:
//
// - cookies
// - localStorage
// - session info
//
// storageState DOES NOT create:
//
// - contexts
// - pages
// - multiple users
//
// It only restores login state.
//
// ============================================================


test('Using storageState with contexts', async ({ browser }) => {

   // --------------------------------------------------------
   // ADMIN CONTEXT WITH SAVED LOGIN
   // --------------------------------------------------------

   const adminContext = await browser.newContext({

      storageState: 'adminAuth.json'
   });

   const adminPage = await adminContext.newPage();


   // --------------------------------------------------------
   // CUSTOMER CONTEXT WITH SAVED LOGIN
   // --------------------------------------------------------

   const customerContext = await browser.newContext({

      storageState: 'customerAuth.json'
   });

   const customerPage = await customerContext.newPage();


   // Already logged in users

   await adminPage.goto('https://app.com/admin');

   await customerPage.goto('https://app.com/customer');
});


// ============================================================
// PROMISE.ALL
// ============================================================
//
// Promise.all runs multiple async operations together.
//
// Purpose in Playwright:
//
// Avoid race conditions.
//
// ============================================================


// ============================================================
// WHAT IS RACE CONDITION?
// ============================================================
//
// Interview Definition:
//
// "A race condition occurs when multiple async
// operations depend on timing and execute in
// unpredictable order causing flaky behavior."
//
// Simple Understanding:
//
// Action happens before listener starts.
//
// ============================================================


// ============================================================
// WRONG WAY - RACE CONDITION
// ============================================================


test('Wrong download handling - race condition', async ({ page }) => {

   // --------------------------------------------------------
   // Problem:
   //
   // Download may already start before
   // waitForEvent begins.
   // --------------------------------------------------------

   await page.click('#download');

   await page.waitForEvent('download');
});


// ============================================================
// CORRECT WAY USING Promise.all
// ============================================================
//
// Promise.all does:
//
// 1. Register listener FIRST
// 2. Trigger action
// 3. Capture event safely
//
// ============================================================


test('Correct download handling', async ({ page }) => {

   // --------------------------------------------------------
   // Array Destructuring
   // --------------------------------------------------------
   //
   // Promise.all returns ARRAY.
   //
   // Example:
   //
   // const [download]
   //
   // means:
   //
   // const result = [downloadObject];
   // const download = result[0];
   // --------------------------------------------------------

   const [download] = await Promise.all([

      // -----------------------------------------------------
      // Start listening for download event
      // -----------------------------------------------------

      page.waitForEvent('download'),


      // -----------------------------------------------------
      // Trigger download
      // -----------------------------------------------------

      page.click('#download')
   ]);


   // --------------------------------------------------------
   // download is actual Download object
   // --------------------------------------------------------

   console.log(download);
});


// ============================================================
// POPUP / NEW TAB HANDLING
// ============================================================
//
// New tab belongs to BrowserContext.
//
// One context can contain multiple tabs/pages.
//
// Context
//    ├── Page1
//    ├── Page2
//    └── Page3
//
// ============================================================


test('Popup handling using Promise.all', async ({ context, page }) => {

   // --------------------------------------------------------
   // context.waitForEvent('page')
   // --------------------------------------------------------
   //
   // Wait until NEW TAB/PAGE gets created.
   // --------------------------------------------------------

   const [popup] = await Promise.all([

      // -----------------------------------------------------
      // Start listening for new page/tab
      // -----------------------------------------------------

      context.waitForEvent('page'),


      // -----------------------------------------------------
      // Trigger popup/tab opening
      // -----------------------------------------------------

      page.click('#openTab')
   ]);


   // popup is new tab page object

   await popup.goto('https://example.com');
});


// ============================================================
// waitForSelector vs waitForEvent
// ============================================================
//
// waitForSelector
//    -> waits for ELEMENT
//
// waitForEvent
//    -> waits for BROWSER EVENT
//
// ============================================================


test('waitForSelector example', async ({ page }) => {

   await page.click('#search');


   // --------------------------------------------------------
   // Wait until search result element appears
   // --------------------------------------------------------

   await page.waitForSelector('.result');


   await page.click('.result');
});


// ============================================================
// TOAST MESSAGE
// ============================================================
//
// Toast message means:
//
// Small temporary popup notification.
//
// Examples:
//
// "Saved Successfully"
// "Order Placed"
// "Payment Completed"
//
// ============================================================


test('Toast message validation', async ({ page }) => {

   await page.click('#save');


   // --------------------------------------------------------
   // Toast appears dynamically.
   // --------------------------------------------------------

   const toast = page.locator('.toast');


   // --------------------------------------------------------
   // Wait until visible
   // --------------------------------------------------------

   await expect(toast).toBeVisible();


   // --------------------------------------------------------
   // Validate text
   // --------------------------------------------------------

   await expect(toast)
      .toHaveText('Saved Successfully');
});


// ============================================================
// DESTRUCTURING SUMMARY
// ============================================================
//
// [] -> Array Destructuring
//
// Example:
//
// const [download] = array
//
// ------------------------------------------------------------
//
// {} -> Object Destructuring
//
// Example:
//
// const { test, expect } = require('@playwright/test')
//
// because require() returns OBJECT.
//
// ============================================================


// ============================================================
// Promise CLASS UNDERSTANDING
// ============================================================
//
// Promise is built-in JavaScript class.
//
// Promise.all() is STATIC METHOD.
//
// Similar to:
//
// Math.max()
//
// ============================================================


// ============================================================
// FINAL MEMORY TRICKS
// ============================================================
//
// Browser        = Chrome App
// Context        = Incognito Window
// Page           = Browser Tab
//
// storageState   = Saved Login Session
// Fixture        = Reusable Resource Provider
// Promise.all    = Parallel Async Execution
// Race Condition = Timing Issue
//
// waitForSelector -> element
// waitForEvent    -> browser event
//
// [] -> Array
// {} -> Object
//
// ============================================================
```
