/****************************************************************************************
 *
 * PLAYWRIGHT + JAVASCRIPT + TYPESCRIPT + NODE.JS
 * COMPLETE DEEP DIVE GUIDE
 *
 * Author: Ganesh Learning Notes
 *
 ****************************************************************************************/

/****************************************************************************************
 *
 * CHAPTER 1 - BIG PICTURE
 *
 ****************************************************************************************/

/*

Many beginners learn Playwright but get confused:

Why do we need:

1. JavaScript
2. TypeScript
3. Node.js
4. npm
5. Playwright

Aren't they all the same?

NO.

Each has a different responsibility.

Architecture:

Automation Engineer
        ↓
JavaScript / TypeScript
        ↓
Node.js Runtime
        ↓
Playwright Framework
        ↓
Browser
        ↓
Application

*/


/****************************************************************************************
 *
 * CHAPTER 2 - WHAT IS JAVASCRIPT?
 *
 ****************************************************************************************/

/*

JavaScript is a Programming Language.

Just like:

English = Human Language

JavaScript = Programming Language

Example:

*/

console.log("Hello World");

/*

JavaScript provides:

Variables
Functions
Loops
Conditions
Objects
Arrays
Promises
Async/Await

Example:

*/

let username = "Ganesh";

function login(user) {
    console.log("Login:", user);
}

login(username);

/*

Think of JavaScript as:

Recipe Book

The recipe knows:

Step 1
Step 2
Step 3

But recipe itself cannot cook.

Similarly:

JavaScript knows instructions
but cannot execute itself.

Need a runtime.

*/


/****************************************************************************************
 *
 * CHAPTER 3 - WHY NODE.JS?
 *
 ****************************************************************************************/

/*

Question:

Who executes JavaScript?

Answer:

Node.js

Node.js is Runtime Environment.

Without Node.js:

JavaScript runs only inside browser.

Examples:

Chrome
Firefox
Edge

With Node.js:

JavaScript runs:

Terminal
Servers
CI/CD
Docker
Automation Frameworks

*/


/****************************************************************************************
 *
 * CHAPTER 4 - HOW NODE.JS WORKS
 *
 ****************************************************************************************/

/*

Example:

test.js

*/

console.log("Running through Node");

/*

Command:

node test.js

Flow:

test.js
   ↓
Node.js
   ↓
V8 Engine
   ↓
Machine Code
   ↓
CPU

*/


/****************************************************************************************
 *
 * CHAPTER 5 - WHAT IS V8 ENGINE?
 *
 ****************************************************************************************/

/*

V8 Engine is Google's JavaScript Engine.

Created by Google.

Responsibility:

Convert JavaScript

Into

Machine Instructions

Example:

*/

let x = 10;

/*

V8 converts this into instructions
understood by CPU.

Without V8:

Computer cannot understand JavaScript.

*/


/****************************************************************************************
 *
 * CHAPTER 6 - WHY PLAYWRIGHT NEEDS NODE.JS?
 *
 ****************************************************************************************/

/*

Playwright code is JavaScript.

Example:

*/

await page.goto("https://google.com");

await page.fill("#username", "admin");

await page.click("#login");

/*

Question:

Who executes this?

Node.js

Question:

Who performs browser actions?

Playwright

Question:

Who opens webpage?

Browser

Flow:

Your Script
      ↓
Node.js
      ↓
Playwright
      ↓
Browser
      ↓
Application

*/


/****************************************************************************************
 *
 * CHAPTER 7 - WHAT IS PLAYWRIGHT?
 *
 ****************************************************************************************/

/*

Playwright is NOT:

❌ Programming Language

❌ Runtime

❌ Browser

Playwright IS:

Browser Automation Framework

Responsibilities:

Open Browser
Click Elements
Fill Textboxes
Read DOM
Take Screenshots
Handle APIs

Example:

*/

await page.click("#submit");

/*

Playwright converts this command into
browser protocol commands.

*/


/****************************************************************************************
 *
 * CHAPTER 8 - PLAYWRIGHT INTERNAL FLOW
 *
 ****************************************************************************************/

/*

Code:

*/

await page.click("#login");

/*

Internally:

Step 1

Node.js executes script

Step 2

Playwright receives click command

Step 3

Playwright sends browser protocol command

Step 4

Browser finds element

Step 5

Browser performs click

Step 6

Result returned

Flow:

page.click()
      ↓
Playwright
      ↓
Browser Protocol
      ↓
Chromium
      ↓
DOM
      ↓
Click

*/


/****************************************************************************************
 *
 * CHAPTER 9 - WHAT IS NPM?
 *
 ****************************************************************************************/

/*

npm = Node Package Manager

Installed automatically with Node.js.

Check versions:

node -v

npm -v

Responsibilities:

Install Packages
Update Packages
Remove Packages
Manage Dependencies

*/


/****************************************************************************************
 *
 * CHAPTER 10 - WHY NPM IS REQUIRED
 *
 ****************************************************************************************/

/*

Question:

How do we install Playwright?

Answer:

npm

Command:

*/

npm install -D @playwright/test;

/*

npm downloads:

Playwright
Dependencies
Libraries

Stores inside:

node_modules/

*/


/****************************************************************************************
 *
 * CHAPTER 11 - WHAT IS PACKAGE.JSON?
 *
 ****************************************************************************************/

/*

Think of package.json as:

Project Identity Card

Contains:

Project Name
Version
Dependencies
Scripts

Example:

*/

{
  "name": "playwright-framework",
  "version": "1.0.0"
}

/*

When npm install runs:

It reads package.json

Downloads required packages.

*/


/****************************************************************************************
 *
 * CHAPTER 12 - WHAT IS NODE_MODULES?
 *
 ****************************************************************************************/

/*

node_modules contains:

Playwright
Axios
Allure
Dependencies

Example:

project
|
|-- node_modules
|-- package.json
|-- tests

Without node_modules:

Project won't run.

*/


/****************************************************************************************
 *
 * CHAPTER 13 - WHAT IS TYPESCRIPT?
 *
 ****************************************************************************************/

/*

TypeScript = Superset of JavaScript

Created by Microsoft.

Adds:

Type Safety
Compile Validation
IntelliSense
Refactoring Support

*/


/****************************************************************************************
 *
 * CHAPTER 14 - JAVASCRIPT VS TYPESCRIPT
 *
 ****************************************************************************************/

/*

JavaScript:

*/

let age = "25";

/*

No error.

*/

/*

TypeScript:

*/

let ageTS /* : number */ = 25;

/*

Wrong:

let ageTS:number = "25"

Compiler Error

*/


/****************************************************************************************
 *
 * CHAPTER 15 - WHY TYPESCRIPT IN AUTOMATION?
 *
 ****************************************************************************************/

/*

Enterprise frameworks contain:

500+
Tests

100+
Pages

Utilities

Fixtures

APIs

TypeScript helps:

Catch errors early
Improve maintainability
Better IntelliSense

*/


/****************************************************************************************
 *
 * CHAPTER 16 - ASYNC AWAIT
 *
 ****************************************************************************************/

/*

Browser actions take time.

Example:

*/

await page.goto("https://google.com");

/*

Browser must:

Open Page
Download HTML
Download CSS
Download JS
Render DOM

Therefore:

await required.

Without await:

*/

page.goto("https://google.com");

page.click("#login");

/*

Possible Failure:

Page not loaded
Element not found

*/


/****************************************************************************************
 *
 * CHAPTER 17 - WHY PLAYWRIGHT IS FAST?
 *
 ****************************************************************************************/

/*

Node.js uses:

Event Loop

Instead of blocking.

Allows:

Parallel Tasks
Async Operations
Fast Execution

*/


/****************************************************************************************
 *
 * CHAPTER 18 - PLAYWRIGHT EXECUTION FLOW
 *
 ****************************************************************************************/

/*

Command:

npx playwright test

Internally:

1. npx finds Playwright

2. Node.js starts process

3. Config loads

4. Tests discovered

5. Browser launches

6. Tests execute

7. Assertions validate

8. Reports generated

*/


/****************************************************************************************
 *
 * CHAPTER 19 - INSTALLATION FLOW
 *
 ****************************************************************************************/

/*

Step 1

Install Node.js

Verify:

node -v

npm -v

--------------------------------------------------

Step 2

Create Project

npm init -y

--------------------------------------------------

Step 3

Install Playwright

npm install -D @playwright/test

--------------------------------------------------

Step 4

Install Browsers

npx playwright install

--------------------------------------------------

Step 5

Run Tests

npx playwright test

*/


/****************************************************************************************
 *
 * CHAPTER 20 - NEW PROJECT VS EXISTING PROJECT
 *
 ****************************************************************************************/

/*

NEW PROJECT

npm init playwright@latest

Creates:

package.json
playwright.config.js
tests/
node_modules/

--------------------------------------------------

EXISTING PROJECT

git clone repository

npm install

npx playwright install

*/


/****************************************************************************************
 *
 * CHAPTER 21 - INTERVIEW QUESTION
 *
 ****************************************************************************************/

/*

Q: Why Node.js is required for Playwright?

Answer:

Playwright is a JavaScript/TypeScript automation framework.
Node.js provides the runtime environment required to execute Playwright
scripts outside the browser. Node.js executes the test code, Playwright
communicates with browser engines, and browsers perform the actions.

*/


/****************************************************************************************
 *
 * FINAL SUMMARY
 *
 ****************************************************************************************/

/*

JavaScript
    ↓
Programming Language

TypeScript
    ↓
Safer JavaScript

Node.js
    ↓
Runtime Environment

npm
    ↓
Package Manager

Playwright
    ↓
Automation Framework

Browser
    ↓
Executes Actions

Application
    ↓
System Under Test

Complete Flow:

Automation Engineer
        ↓
JavaScript / TypeScript
        ↓
Node.js Runtime
        ↓
Playwright Framework
        ↓
Browser Engine
        ↓
Application

*/
