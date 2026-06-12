// =====================================================
// PROMISES, CALLBACKS, ASYNC/AWAIT FOR PLAYWRIGHT
// Trainer Notes
// =====================================================

const { test } = require('@playwright/test');


// =====================================================
// 1. WHAT IS console.log() ?
// =====================================================

// console --> Built-in object provided by Node.js/Browser
// log()    --> Method inside console object

// Similar to:
//
// const employee = {
//     display: function() {
//         console.log("Display Employee");
//     }
// };
//
// employee.display();

console.log("Hello World");

// Output:
// Hello World

// No import required.
// Similar built-in objects:
// Math
// Date
// JSON
// console



// =====================================================
// 2. FUNCTIONS
// =====================================================

function greet() {
    console.log("Hello");
}

greet();


// Function with parameter

function greetUser(name) {
    console.log("Hello " + name);
}

greetUser("Ravi");




// =====================================================
// 3. CALLBACKS
// =====================================================

// Definition:
// A function passed as an argument to another function.

function process(callback) {

    console.log("Step 1");

    callback();

    console.log("Step 3");
}

function myTask() {
    console.log("Step 2");
}

process(myTask);

// Output:
//
// Step 1
// Step 2
// Step 3



// =====================================================
// 4. CALLBACK WITH ARROW FUNCTION
// =====================================================

process(() => {

    console.log("Callback Executed");

});



// =====================================================
// 5. setTimeout()
// =====================================================

// setTimeout accepts a callback function.

console.log("Start");

setTimeout(() => {

    console.log("Executed After 3 Seconds");

}, 3000);

console.log("End");

// Output:
//
// Start
// End
// Executed After 3 Seconds

// JavaScript does NOT wait.
// It continues execution.




// =====================================================
// 6. CALLBACK HELL
// =====================================================

// Before promises developers used nested callbacks.

function getUser(callback) {

    callback({
        id: 1,
        name: "Ravi"
    });
}

function getOrders(userId, callback) {

    callback([
        "Laptop",
        "Mouse"
    ]);
}

function getPayment(orders, callback) {

    callback("Payment Successful");
}


// Callback Hell

getUser(function(user) {

    getOrders(user.id, function(orders) {

        getPayment(orders, function(payment) {

            console.log(payment);

        });

    });

});

// Problem:
// Too many nested callbacks.
// Difficult to maintain.




// =====================================================
// 7. INTRODUCTION TO PROMISE
// =====================================================

// Promise States:
//
// Pending
// Fulfilled (resolve)
// Rejected (reject)

const loginPromise = new Promise((resolve, reject) => {

    let success = true;

    if (success) {

        resolve("Login Successful");

    } else {

        reject("Login Failed");

    }

});




// =====================================================
// 8. then() and catch()
// =====================================================

loginPromise
    .then(result => {

        console.log(result);

    })
    .catch(error => {

        console.log(error);

    });


// Trainer Explanation:
//
// resolve("Login Successful")
//
// result = "Login Successful"
//
// then(result => {})
//
// result receives whatever resolve sends.




// =====================================================
// 9. resolve() WITH DIFFERENT DATA TYPES
// =====================================================

Promise.resolve("Ravi")
    .then(result => console.log(result));

Promise.resolve(100)
    .then(result => console.log(result));

Promise.resolve(true)
    .then(result => console.log(result));

Promise.resolve({
    id: 1,
    name: "Ravi"
})
.then(result => console.log(result));




// =====================================================
// 10. PROMISE RETURNING USER DATA
// =====================================================

function getUserPromise() {

    return new Promise((resolve, reject) => {

        const user = {
            id: 1,
            name: "Ravi"
        };

        resolve(user);

    });

}

getUserPromise()
    .then(user => {

        console.log(user);

    });




// =====================================================
// 11. PROMISE CHAINING
// =====================================================

function getUserData() {

    return Promise.resolve({
        id: 1,
        name: "Ravi"
    });

}

function getOrdersData(userId) {

    return Promise.resolve([
        "Laptop",
        "Mouse"
    ]);

}

function getPaymentData(orders) {

    return Promise.resolve(
        "Payment Successful"
    );

}


// NOT Callback Hell

getUserData()
    .then(user => {

        return getOrdersData(user.id);

    })
    .then(orders => {

        return getPaymentData(orders);

    })
    .then(payment => {

        console.log(payment);

    });


// Flow:
//
// getUserData()
//      ↓
// user
//      ↓
// getOrdersData()
//      ↓
// orders
//      ↓
// getPaymentData()
//      ↓
// payment




// =====================================================
// 12. ASYNC/AWAIT
// =====================================================

// Async/Await is built on top of Promises.

async function executeFlow() {

    const user = await getUserData();

    const orders = await getOrdersData(user.id);

    const payment = await getPaymentData(orders);

    console.log(payment);

}

executeFlow();


// Cleaner than Promise chaining.




// =====================================================
// 13. PLAYWRIGHT CONNECTION
// =====================================================

test('Promise Concept In Playwright', async ({ page }) => {

    // page.goto() returns Promise

    await page.goto('https://example.com');

    console.log("Page Opened");


    // page.title() returns Promise

    const title = await page.title();

    console.log(title);


    // Internally similar to:

    // page.title()
    //      .then(title => {
    //          console.log(title);
    //      });

});




// =====================================================
// 14. WHAT DOES PLAYWRIGHT RESOLVE?
// =====================================================

test('Resolve Values', async ({ page }) => {

    await page.goto('https://example.com');


    // Returns String

    const title = await page.title();

    console.log(title);


    // Returns String

    const url = page.url();

    console.log(url);


    // Usually returns undefined

    const result = await page.click('body');

    console.log(result);

});


// Why undefined?
//
// Because click action does not need to return data.
//
// Internally:
//
// resolve();
//
// same as
//
// resolve(undefined);




// =====================================================
// 15. HOW PLAYWRIGHT USES PROMISES INTERNALLY
// =====================================================

// Conceptual Example
//
// function click(selector) {
//
//     return new Promise((resolve,reject)=>{
//
//         try{
//
//             browser.click(selector);
//
//             resolve();
//
//         }
//         catch(error){
//
//             reject(error);
//         }
//
//     });
//
// }
//
// await page.click('#login');




// =====================================================
// TRAINER INTERVIEW QUESTIONS
// =====================================================

// Q1. What is callback?
//
// Function passed to another function.


// Q2. What is Promise?
//
// Object representing future success/failure.


// Q3. Promise States?
//
// Pending
// Fulfilled
// Rejected


// Q4. What does resolve() do?
//
// Marks Promise as successful.


// Q5. What does reject() do?
//
// Marks Promise as failed.


// Q6. What does then() do?
//
// Executes when Promise resolves.


// Q7. What does catch() do?
//
// Executes when Promise rejects.


// Q8. Is Promise replacement for setTimeout?
//
// No.
//
// setTimeout -> creates delay
// Promise    -> handles async result


// Q9. Is Promise chaining callback hell?
//
// No.
//
// Nested callbacks = callback hell
//
// Flat .then().then().then()
// = Promise chaining


// Q10. Why await in Playwright?
//
// Because Playwright APIs return Promises.