/**
 * callback_then_promise.js
 *
 * COMPLETE LEARNING FILE
 * ----------------------
 * Topics:
 * 1. Why normal sequential calls fail for async operations
 * 2. Callbacks
 * 3. Callback Hell
 * 4. Promises
 * 5. .then() chaining
 * 6. Async/Await
 * 7. Playwright Mapping
 *
 * Run:
 * node callback_then_promise.js
 */

/* ============================================================
   PART 1 - NORMAL SYNCHRONOUS FUNCTIONS
   ============================================================

   These functions finish immediately.

   JavaScript executes line by line.

   Since everything is immediate, execution order is guaranteed.
*/

function syncLogin() {
    console.log("SYNC: Login Done");
}

function syncSearch() {
    console.log("SYNC: Product Found");
}

console.log("\n========== PART 1 ==========");

syncLogin();
syncSearch();

/*
Output:

SYNC: Login Done
SYNC: Product Found
*/

/* ============================================================
   PART 2 - THE REAL PROBLEM (ASYNC OPERATIONS)
   ============================================================

   Imagine login requires 3 seconds.

   Examples:
   - API Calls
   - Database Calls
   - Browser Actions
   - File Reads

   JavaScript DOES NOT automatically wait.
*/

function asyncLoginWrong() {

    setTimeout(() => {

        console.log("ASYNC: Login Done");

    }, 3000);

}

function asyncSearchWrong() {

    console.log("ASYNC: Product Found");

}

console.log("\n========== PART 2 ==========");

asyncLoginWrong();
asyncSearchWrong();

/*

Developer expects:

Login Done
Product Found

Actual Output:

Product Found

(wait 3 seconds)

Login Done

Why?

JS starts timer.

Moves immediately to next line.

It doesn't wait.
*/


/* ============================================================
   PART 3 - CALLBACKS
   ============================================================

   Solution:

   Execute Search only AFTER Login completes.

   Callback = Function passed into another function.
*/

function loginWithCallback(callback) {

    setTimeout(() => {

        console.log("CALLBACK: Login Done");

        callback();

    }, 2000);

}

function searchAfterLogin() {

    console.log("CALLBACK: Search Product");

}

console.log("\n========== PART 3 ==========");

loginWithCallback(searchAfterLogin);

/*

Execution Flow:

loginWithCallback(searchAfterLogin)

↓

wait 2 seconds

↓

Login Done

↓

callback()

↓

searchAfterLogin()

↓

Search Product
*/


/* ============================================================
   PART 4 - CALLBACK HELL
   ============================================================

   Real E-Commerce Flow:

   Login
   ↓
   Search Product
   ↓
   Add To Cart
   ↓
   Checkout
   ↓
   Payment

   Each step depends on previous step.
*/

function login(cb) {

    setTimeout(() => {

        console.log("Login");

        cb();

    }, 500);

}

function search(cb) {

    setTimeout(() => {

        console.log("Search Product");

        cb();

    }, 500);

}

function addToCart(cb) {

    setTimeout(() => {

        console.log("Add To Cart");

        cb();

    }, 500);

}

function checkout(cb) {

    setTimeout(() => {

        console.log("Checkout");

        cb();

    }, 500);

}

function payment(cb) {

    setTimeout(() => {

        console.log("Payment");

        cb();

    }, 500);

}

console.log("\n========== PART 4 ==========");

login(function () {

    search(function () {

        addToCart(function () {

            checkout(function () {

                payment(function () {

                    console.log("ORDER SUCCESS");

                });

            });

        });

    });

});

/*

Visual Structure

login()
   |
   search()
      |
      addToCart()
         |
         checkout()
            |
            payment()

Problems:

1. Too many brackets
2. Hard to debug
3. Hard to maintain
4. Error handling becomes ugly

This is called:

CALLBACK HELL
or
PYRAMID OF DOOM
*/


/* ============================================================
   PART 5 - PROMISES
   ============================================================

   Promise = Future Result

   States:

   Pending
   Fulfilled
   Rejected

   Instead of passing callbacks everywhere,
   return a Promise.
*/

function loginPromise() {

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("PROMISE: Login");

            resolve();

        }, 500);

    });

}

function searchPromise() {

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("PROMISE: Search Product");

            resolve();

        }, 500);

    });

}

function cartPromise() {

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("PROMISE: Add To Cart");

            resolve();

        }, 500);

    });

}

console.log("\n========== PART 5 ==========");

loginPromise()

    .then(() => searchPromise())

    .then(() => cartPromise())

    .then(() => {

        console.log("PROMISE: ORDER SUCCESS");

    });

/*

What does .then mean?

.then()

means

"When this promise finishes,
 execute this callback"

Flow:

loginPromise()
      ↓
    .then()
      ↓
searchPromise()
      ↓
    .then()
      ↓
cartPromise()
      ↓
    .then()
      ↓
Success

Notice:

NO NESTING

Everything is flat.
*/


/* ============================================================
   PART 6 - .then() INTERNAL THINKING
   ============================================================

   Promise is NOT magic.

   It still uses callbacks internally.
*/

Promise.resolve("Hello")

    .then((value) => {

        console.log("\n.then received:", value);

    });

/*

Think:

Promise completes

↓

.then callback executes

Callbacks still exist.

Promises organize them better.
*/


/* ============================================================
   PART 7 - ASYNC / AWAIT
   ============================================================

   Developers wanted cleaner code.

   Promise Chain:

   loginPromise()
      .then(...)
      .then(...)
      .then(...)

   became:

   await loginPromise()
   await searchPromise()
*/

async function placeOrder() {

    console.log("\n========== PART 7 ==========");

    await loginPromise();

    await searchPromise();

    await cartPromise();

    console.log("ASYNC/AWAIT: ORDER SUCCESS");

}

placeOrder();

/*

Looks synchronous.

Read top to bottom.

Easy to understand.

Easy to debug.
*/


/* ============================================================
   PART 8 - PLAYWRIGHT MAPPING
   ============================================================

   OLD CALLBACK STYLE
   ------------------
*/

/*

page.goto(url, function() {

    page.fill('#user', 'admin', function() {

        page.fill('#pass', 'admin123', function() {

            page.click('#login', function() {

                console.log("Success");

            });

        });

    });

});

*/

/*

Very ugly.

Deep nesting.

Hard to maintain.
*/


/* ============================================================
   PROMISE STYLE
   ============================================================

page.goto(url)

    .then(() => page.fill('#user', 'admin'))

    .then(() => page.fill('#pass', 'admin123'))

    .then(() => page.click('#login'));

*/


/* ============================================================
   MODERN PLAYWRIGHT STYLE
   ============================================================

await page.goto(url);

await page.fill('#user', 'admin');

await page.fill('#pass', 'admin123');

await page.click('#login');

*/

/*

Why?

Every Playwright action returns a Promise.

Examples:

page.goto()
page.click()
page.fill()
page.check()
page.uncheck()
page.screenshot()

All return Promises.

await waits for Promise completion.
*/


/* ============================================================
   INTERVIEW SUMMARY
   ============================================================

   CALLBACK
   --------
   Function passed as argument.

   CALLBACK HELL
   -------------
   Deep nesting of callbacks.

   PROMISE
   -------
   Object representing future result.

   .then()
   -------
   Executes after Promise success.

   ASYNC FUNCTION
   --------------
   Always returns Promise.

   AWAIT
   -----
   Waits for Promise completion.

   EVOLUTION
   ---------

   Callback
      ↓
   Promise
      ↓
   Async/Await

   Playwright uses Async/Await
   because it is the cleanest form.
*/