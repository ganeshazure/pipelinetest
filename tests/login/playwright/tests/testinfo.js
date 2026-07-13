/********************************************************************************************
 * File Name  : testInfo.js
 * Description: Complete Basic Guide for Playwright testInfo
 * Author     : Ganesh Training Notes
 ********************************************************************************************/

/********************************************************************************************
 * WHAT IS testInfo?
 *
 * testInfo is a built-in Playwright object.
 *
 * Playwright automatically creates one testInfo object for every test execution.
 *
 * It contains runtime information about the currently executing test.
 *
 * It is mainly used for:
 *
 * ✔ Reporting
 * ✔ Screenshot on failure
 * ✔ Retry information
 * ✔ Execution time
 * ✔ Attachments
 * ✔ Output directories
 * ✔ Logging
 *
 ********************************************************************************************/


/********************************************************************************************
 * BASIC SYNTAX
 ********************************************************************************************/

const { test, expect } = require('@playwright/test');

test('Login Test', async ({ page }, testInfo) => {

    console.log(testInfo.title);

});


/********************************************************************************************
 * HOW PLAYWRIGHT EXECUTES
 ********************************************************************************************

npx playwright test

        │

        ▼

Creates Browser

        │

        ▼

Creates Test

        │

        ▼

Creates testInfo Object

        │

        ▼

Passes testInfo into Test

        │

        ▼

Runs Test

        │

        ▼

Updates Status

        │

        ▼

Generates Report

********************************************************************************************/


/********************************************************************************************
 * IMPORTANT PROPERTIES
 ********************************************************************************************/


// Test Name

console.log(testInfo.title);


// Test File

console.log(testInfo.file);


// Current Test Status

console.log(testInfo.status);


// Expected Status

console.log(testInfo.expectedStatus);


// Retry Number

console.log(testInfo.retry);


// Execution Time

console.log(testInfo.duration);


// Timeout

console.log(testInfo.timeout);


// Output Folder

console.log(testInfo.outputDir);


// Snapshot Folder

console.log(testInfo.snapshotDir);


// Current Project

console.log(testInfo.project.name);


// Worker Number

console.log(testInfo.workerIndex);


/********************************************************************************************
 * SAMPLE OUTPUT
 ********************************************************************************************

Title            : Login Test

File             : tests/login.spec.js

Status           : passed

Retry            : 0

Duration         : 2450

Project          : chromium

Worker           : 0

********************************************************************************************/


/********************************************************************************************
 * BEFORE EACH
 ********************************************************************************************/

test.beforeEach(async ({ page }, testInfo) => {

    console.log("Running Test : " + testInfo.title);

});


/********************************************************************************************
 * AFTER EACH
 ********************************************************************************************/

test.afterEach(async ({ page }, testInfo) => {

    console.log("Completed : " + testInfo.title);

    console.log("Status : " + testInfo.status);

});


/********************************************************************************************
 * SCREENSHOT ON FAILURE
 ********************************************************************************************/

test.afterEach(async ({ page }, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {

        await page.screenshot({

            path: `reports/${testInfo.title}.png`

        });

    }

});


/********************************************************************************************
 * ATTACH SCREENSHOT TO HTML REPORT
 ********************************************************************************************/

test.afterEach(async ({ page }, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {

        const file = `reports/${testInfo.title}.png`;

        await page.screenshot({

            path: file

        });

        await testInfo.attach(

            "Failure Screenshot",

            {

                path: file,

                contentType: "image/png"

            }

        );

    }

});


/********************************************************************************************
 * ATTACH JSON
 ********************************************************************************************/

await testInfo.attach(

    "API Response",

    {

        body: JSON.stringify({

            status: 200,

            message: "Success"

        }),

        contentType: "application/json"

    }

);


/********************************************************************************************
 * ATTACH LOG FILE
 ********************************************************************************************/

await testInfo.attach(

    "Execution Log",

    {

        body: "Expense Created Successfully",

        contentType: "text/plain"

    }

);


/********************************************************************************************
 * ATTACH HTML
 ********************************************************************************************/

await testInfo.attach(

    "HTML",

    {

        body: "<h1>Execution Completed</h1>",

        contentType: "text/html"

    }

);


/********************************************************************************************
 * RETRY EXAMPLE
 ********************************************************************************************/

if(testInfo.retry > 0){

    console.log("Retry Number : " + testInfo.retry);

}


/********************************************************************************************
 * DURATION
 ********************************************************************************************/

console.log(

    "Execution Time : " +

    testInfo.duration +

    " ms"

);


/********************************************************************************************
 * PROJECT NAME
 ********************************************************************************************/

console.log(

    "Browser : " +

    testInfo.project.name

);


/********************************************************************************************
 * OUTPUT DIRECTORY
 ********************************************************************************************/

console.log(

    testInfo.outputDir

);


/********************************************************************************************
 * SNAPSHOT DIRECTORY
 ********************************************************************************************/

console.log(

    testInfo.snapshotDir

);


/********************************************************************************************
 * INTERVIEW QUESTIONS
 ********************************************************************************************

Q1. What is testInfo?

Answer:

testInfo is a Playwright object that contains runtime information about the
currently executing test.


------------------------------------------------------------

Q2. Who creates testInfo?

Playwright automatically creates it for every test.


------------------------------------------------------------

Q3. Where is testInfo mostly used?

• afterEach()

• beforeEach()

• Reporting

• Screenshot

• Attachments

• Retry Handling


------------------------------------------------------------

Q4. Can we modify testInfo?

No.

It is provided by Playwright.

We can only read its properties and use helper methods like attach().


------------------------------------------------------------

Q5. Why use testInfo?

✔ Better Reporting

✔ Debugging

✔ Screenshots

✔ Retry Tracking

✔ Execution Logs

✔ CI/CD Reports


********************************************************************************************/


/********************************************************************************************
 * MOST IMPORTANT PROPERTIES
 ********************************************************************************************

title

file

status

expectedStatus

retry

duration

project

workerIndex

outputDir

snapshotDir

attachments

errors


********************************************************************************************/


/********************************************************************************************
 * BEST PRACTICES
 ********************************************************************************************

✔ Use testInfo in afterEach()

✔ Capture Screenshot on Failure

✔ Attach API Responses

✔ Attach Logs

✔ Attach Videos

✔ Use Retry Information

✔ Use Dynamic File Names

✔ Never modify testInfo


********************************************************************************************/


/********************************************************************************************
 * EXECUTION FLOW
 ********************************************************************************************

Test Starts

        │

        ▼

Playwright Creates testInfo

        │

        ▼

Test Executes

        │

        ▼

Status Updated

        │

        ▼

afterEach()

        │

        ▼

Screenshot

        │

        ▼

Attachments

        │

        ▼

HTML Report


********************************************************************************************/