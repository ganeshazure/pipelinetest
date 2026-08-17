/*
 * ============================================================
 * project_creation_types.js
 * ============================================================
 *
 * PURPOSE:
 * This file explains the different ways to create:
 *
 * 1. Basic Node.js project
 * 2. Node.js + JavaScript project
 * 3. Node.js + TypeScript project
 * 4. Node.js + Playwright API project
 * 5. Playwright Test project
 * 6. Existing/imported Node.js project
 * 7. Existing/imported Playwright project
 *
 * IMPORTANT:
 * Commands shown as comments below should be executed
 * in the TERMINAL, NOT inside JavaScript code.
 *
 */


/*
 * ============================================================
 * 1. WHAT IS NODE.JS?
 * ============================================================
 *
 * JavaScript
 *     ↓
 * Programming language
 *
 * Node.js
 *     ↓
 * Runtime that allows JavaScript to run outside the browser
 *
 * npm
 *     ↓
 * Package manager that comes with Node.js
 *
 * Playwright
 *     ↓
 * Browser automation library
 *
 *
 * IMPORTANT:
 *
 * JavaScript / TypeScript = Languages
 * Node.js                = Runtime
 * npm                    = Package Manager
 * Playwright             = Automation Library
 *
 */


/*
 * ============================================================
 * 2. CHECK NODE.JS AND NPM
 * ============================================================
 *
 * Before creating a Node.js project, Node.js should be installed.
 *
 * TERMINAL COMMAND:
 *
 * node -v
 *
 * PURPOSE:
 * Checks the installed Node.js version.
 *
 *
 * TERMINAL COMMAND:
 *
 * npm -v
 *
 * PURPOSE:
 * Checks the installed npm version.
 *
 */


/*
 * ============================================================
 * 3. WAY #1 - CREATE A BASIC NODE.JS PROJECT
 * ============================================================
 *
 * Suppose we want to create a new project from an empty folder.
 *
 *
 * STEP 1:
 *
 * TERMINAL:
 *
 * mkdir my-node-project
 *
 * PURPOSE:
 * Creates a new folder called my-node-project.
 *
 *
 * STEP 2:
 *
 * TERMINAL:
 *
 * cd my-node-project
 *
 * PURPOSE:
 * Moves into the project folder.
 *
 *
 * STEP 3:
 *
 * TERMINAL:
 *
 * npm init -y
 *
 * PURPOSE:
 * Creates package.json.
 *
 * -y means:
 * Accept all default values automatically.
 *
 *
 * Before:
 *
 * my-node-project/
 *
 *
 * After:
 *
 * my-node-project/
 *     |
 *     └── package.json
 *
 *
 * package.json is the main configuration file
 * for a Node.js/npm project.
 *
 */


/*
 * ============================================================
 * 4. npm init vs npm init -y
 * ============================================================
 *
 * COMMAND:
 *
 * npm init
 *
 * PURPOSE:
 * Creates package.json interactively.
 *
 * npm asks questions such as:
 *
 * package name?
 * version?
 * description?
 * entry point?
 * author?
 * license?
 *
 *
 * COMMAND:
 *
 * npm init -y
 *
 * PURPOSE:
 * Creates package.json automatically using default values.
 *
 *
 * Therefore:
 *
 * npm init
 *     =
 * Interactive project initialization
 *
 *
 * npm init -y
 *     =
 * Automatic/default project initialization
 *
 */


/*
 * ============================================================
 * 5. WHAT DOES npm init -y ACTUALLY DO?
 * ============================================================
 *
 * COMMAND:
 *
 * npm init -y
 *
 * It creates:
 *
 * package.json
 *
 *
 * It DOES NOT:
 *
 * - Install Playwright
 * - Install Selenium
 * - Install TypeScript
 * - Install Chromium
 * - Create test cases
 *
 *
 * It only initializes the npm project configuration.
 *
 */


/*
 * ============================================================
 * 6. BASIC NODE.JS PROJECT STRUCTURE
 * ============================================================
 *
 * After:
 *
 * npm init -y
 *
 *
 * We have:
 *
 * my-node-project/
 *     |
 *     └── package.json
 *
 *
 * Now create:
 *
 * app.js
 *
 *
 * app.js:
 *
 * console.log("Hello Node.js");
 *
 *
 * Run it using:
 *
 * node app.js
 *
 *
 * Node.js executes the JavaScript file.
 *
 */


/*
 * ============================================================
 * 7. WAY #2 - NODE.JS + PLAYWRIGHT API PROJECT
 * ============================================================
 *
 * Suppose we want to create a basic Playwright project
 * and directly work with the Playwright API.
 *
 *
 * STEP 1:
 *
 * TERMINAL:
 *
 * mkdir playwright-api-demo
 *
 * Creates the project folder.
 *
 *
 * STEP 2:
 *
 * TERMINAL:
 *
 * cd playwright-api-demo
 *
 * Moves into the project.
 *
 *
 * STEP 3:
 *
 * TERMINAL:
 *
 * npm init -y
 *
 * Creates package.json.
 *
 *
 * STEP 4:
 *
 * TERMINAL:
 *
 * npm install playwright
 *
 * PURPOSE:
 *
 * Installs Playwright into the existing Node.js project.
 *
 *
 * After installation:
 *
 * playwright-api-demo/
 *     |
 *     ├── node_modules/
 *     |
 *     ├── package-lock.json
 *     |
 *     └── package.json
 *
 *
 * package.json will contain Playwright as a dependency.
 *
 */


/*
 * ============================================================
 * 8. WHAT DOES npm install playwright DO?
 * ============================================================
 *
 * COMMAND:
 *
 * npm install playwright
 *
 *
 * It does TWO important things:
 *
 * 1. Downloads Playwright and its dependencies.
 *
 * 2. Adds Playwright to package.json.
 *
 *
 * Example:
 *
 * "dependencies": {
 *     "playwright": "^1.x.x"
 * }
 *
 *
 * node_modules/
 *     |
 *     └── playwright/
 *
 */


/*
 * ============================================================
 * 9. BASIC PLAYWRIGHT API PROGRAM
 * ============================================================
 *
 * After:
 *
 * npm install playwright
 *
 *
 * Create:
 *
 * browserlaunch.js
 *
 *
 * Code:
 */


const { chromium } = require("playwright");


/*
 * chromium
 *     ↓
 * Represents Playwright's Chromium BrowserType.
 *
 *
 * BrowserType
 *     ↓
 * Browser
 *     ↓
 * BrowserContext
 *     ↓
 * Page
 */


async function main() {

    /*
     * Launch Chromium.
     *
     * headless: false
     * means run with browser UI.
     */
    const browser = await chromium.launch({
        headless: false
    });


    /*
     * Create an isolated browser context.
     *
     * BrowserContext represents an isolated
     * browser session/profile.
     */
    const context = await browser.newContext();


    /*
     * Create a new browser tab/page.
     *
     * Page represents the browser tab
     * where automation happens.
     */
    const page = await context.newPage();


    /*
     * Navigate the page to a URL.
     */
    await page.goto("https://example.com");


    /*
     * Close the browser after execution.
     */
    await browser.close();
}


/*
 * Call the main function.
 */
main();


/*
 * ============================================================
 * 10. PLAYWRIGHT ARCHITECTURE
 * ============================================================
 *
 *
 * chromium
 *     ↓
 * BrowserType
 *     ↓
 * launch()
 *     ↓
 * Browser
 *     ↓
 * newContext()
 *     ↓
 * BrowserContext
 *     ↓
 * newPage()
 *     ↓
 * Page
 *     ↓
 * goto()
 *     ↓
 * Web Application
 *
 */


/*
 * ============================================================
 * 11. WHY DO WE USE await?
 * ============================================================
 *
 * Playwright APIs such as:
 *
 * chromium.launch()
 * browser.newContext()
 * context.newPage()
 * page.goto()
 *
 * are asynchronous operations.
 *
 *
 * Without await:
 *
 * const browser = chromium.launch();
 *
 * browser contains:
 *
 * Promise<Browser>
 *
 *
 * With await:
 *
 * const browser = await chromium.launch();
 *
 * browser contains:
 *
 * Browser
 *
 *
 * Therefore:
 *
 * Promise
 *     ↓
 * await
 *     ↓
 * Actual result/object
 *
 */


/*
 * ============================================================
 * 12. WAY #3 - CREATE PLAYWRIGHT TEST PROJECT
 * ============================================================
 *
 * If we want the complete Playwright Test framework,
 * we can use:
 *
 *
 * TERMINAL:
 *
 * npm init playwright@latest
 *
 *
 * PURPOSE:
 *
 * Creates/scaffolds a Playwright Test project.
 *
 *
 * It can create:
 *
 * tests/
 * playwright.config.ts
 * package.json
 * package-lock.json
 * etc.
 *
 *
 * It can also ask questions during setup.
 *
 *
 * For example:
 *
 * Where to put your end-to-end tests?
 *
 * Add a GitHub Actions workflow?
 *
 * Install Playwright browsers?
 *
 */


/*
 * ============================================================
 * 13. DIFFERENCE BETWEEN THE TWO
 * ============================================================
 *
 *
 * npm install playwright
 *
 * means:
 *
 * "Add the Playwright library to my existing project."
 *
 *
 *
 * npm init playwright@latest
 *
 * means:
 *
 * "Create/scaffold a complete Playwright Test project."
 *
 */


/*
 * ============================================================
 * 14. CORE PLAYWRIGHT API VS PLAYWRIGHT TEST
 * ============================================================
 *
 *
 * npm install playwright
 *
 * We can write:
 *
 * const { chromium } = require("playwright");
 *
 *
 * We directly control:
 *
 * Browser
 * BrowserContext
 * Page
 *
 *
 *
 * Playwright Test project:
 *
 * npm init playwright@latest
 *
 *
 * We normally write:
 *
 * import { test, expect } from "@playwright/test";
 *
 *
 * Example:
 *
 * test("Login test", async ({ page }) => {
 *
 *     await page.goto("https://example.com");
 *
 * });
 *
 *
 * Here Playwright Test provides:
 *
 * - test runner
 * - fixtures
 * - assertions
 * - configuration
 * - retries
 * - parallel execution
 * - projects
 * - reporting
 * - hooks
 *
 */


/*
 * ============================================================
 * 15. WAY #4 - EXISTING NODE.JS PROJECT
 * ============================================================
 *
 * Suppose you already have:
 *
 * existing-project/
 *     |
 *     └── package.json
 *
 *
 * You do NOT run:
 *
 * npm init -y
 *
 *
 * Why?
 *
 * Because package.json already exists.
 *
 *
 * If you want to add Playwright:
 *
 *
 * TERMINAL:
 *
 * npm install playwright
 *
 *
 * This adds Playwright to the existing project.
 *
 */


/*
 * ============================================================
 * 16. WAY #5 - IMPORT / CLONE EXISTING PROJECT
 * ============================================================
 *
 * Suppose another developer gives you a project.
 *
 *
 * Project:
 *
 * automation-project/
 *     |
 *     ├── package.json
 *     ├── package-lock.json
 *     ├── tests/
 *     ├── pages/
 *     └── playwright.config.ts
 *
 *
 * You clone it:
 *
 *
 * TERMINAL:
 *
 * git clone <repository-url>
 *
 *
 * Then:
 *
 *
 * TERMINAL:
 *
 * cd automation-project
 *
 *
 * Then:
 *
 *
 * TERMINAL:
 *
 * npm install
 *
 *
 * What does npm install do here?
 *
 * It reads package.json.
 *
 * It finds all required dependencies.
 *
 * It downloads those dependencies into:
 *
 * node_modules/
 *
 */


/*
 * ============================================================
 * 17. VERY IMPORTANT - EXISTING PROJECT
 * ============================================================
 *
 *
 * If package.json already contains:
 *
 * "playwright": "^1.x.x"
 *
 *
 * You normally DO NOT run:
 *
 * npm install playwright
 *
 *
 * Instead run:
 *
 * npm install
 *
 *
 * Because Playwright is already declared
 * as a project dependency.
 *
 */


/*
 * ============================================================
 * 18. WHEN DO WE RUN npm install playwright?
 * ============================================================
 *
 *
 * Situation:
 *
 * Existing Node.js project
 *
 * package.json does NOT contain Playwright.
 *
 *
 * Then:
 *
 * npm install playwright
 *
 *
 * This adds Playwright.
 *
 */


/*
 * ============================================================
 * 19. WHEN DO WE RUN npm install?
 * ============================================================
 *
 *
 * Situation:
 *
 * You cloned/imported an existing project.
 *
 * package.json already exists.
 *
 *
 * Then:
 *
 * npm install
 *
 *
 * It installs all dependencies defined
 * in package.json.
 *
 */


/*
 * ============================================================
 * 20. node_modules
 * ============================================================
 *
 * node_modules contains installed packages.
 *
 *
 * Example:
 *
 * node_modules/
 *     |
 *     ├── playwright/
 *     ├── @playwright/
 *     ├── other-package/
 *     └── dependencies/
 *
 *
 * IMPORTANT:
 *
 * node_modules is normally NOT committed to Git.
 *
 */


/*
 * ============================================================
 * 21. package.json
 * ============================================================
 *
 * package.json contains:
 *
 * - project name
 * - version
 * - scripts
 * - dependencies
 * - devDependencies
 * - other project configuration
 *
 *
 * Example:
 *
 * {
 *     "name": "playwright-demo",
 *     "version": "1.0.0",
 *     "scripts": {},
 *     "dependencies": {
 *         "playwright": "^1.x.x"
 *     }
 * }
 *
 */


/*
 * ============================================================
 * 22. package-lock.json
 * ============================================================
 *
 * package-lock.json records the dependency tree
 * and resolved package versions.
 *
 *
 * It helps developers install consistent dependencies.
 *
 *
 * Therefore normally commit:
 *
 * package.json
 * package-lock.json
 *
 *
 * But normally do NOT commit:
 *
 * node_modules/
 *
 */


/*
 * ============================================================
 * 23. WAY #6 - TYPESCRIPT NODE.JS PROJECT
 * ============================================================
 *
 * TypeScript can also be used in Node.js projects.
 *
 *
 * STEP 1:
 *
 * mkdir typescript-demo
 *
 *
 * STEP 2:
 *
 * cd typescript-demo
 *
 *
 * STEP 3:
 *
 * npm init -y
 *
 *
 * STEP 4:
 *
 * npm install -D typescript
 *
 *
 * -D means:
 *
 * Install as a development dependency.
 *
 *
 * STEP 5:
 *
 * npx tsc --init
 *
 *
 * Creates:
 *
 * tsconfig.json
 *
 *
 * tsconfig.json contains TypeScript compiler settings.
 *
 *
 * STEP 6:
 *
 * Create:
 *
 * app.ts
 *
 *
 * Example:
 *
 * const message: string = "Hello TypeScript";
 *
 * console.log(message);
 *
 *
 * STEP 7:
 *
 * Compile:
 *
 * npx tsc
 *
 *
 * TypeScript is transformed into JavaScript.
 *
 *
 * STEP 8:
 *
 * Run the generated JavaScript:
 *
 * node app.js
 *
 */


/*
 * ============================================================
 * 24. WAY #7 - TYPESCRIPT + PLAYWRIGHT
 * ============================================================
 *
 * Create project:
 *
 * mkdir playwright-ts-demo
 *
 *
 * Move into project:
 *
 * cd playwright-ts-demo
 *
 *
 * Create package.json:
 *
 * npm init -y
 *
 *
 * Install Playwright:
 *
 * npm install playwright
 *
 *
 * Install TypeScript:
 *
 * npm install -D typescript
 *
 *
 * Create TypeScript configuration:
 *
 * npx tsc --init
 *
 *
 * Now we can create:
 *
 * browserlaunch.ts
 *
 *
 * Example:
 *
 * import { chromium } from "playwright";
 *
 * async function main(): Promise<void> {
 *
 *     const browser = await chromium.launch({
 *         headless: false
 *     });
 *
 *     const context = await browser.newContext();
 *
 *     const page = await context.newPage();
 *
 *     await page.goto("https://example.com");
 *
 *     await browser.close();
 * }
 *
 * main();
 *
 */


/*
 * ============================================================
 * 25. WAY #8 - PLAYWRIGHT TEST + TYPESCRIPT
 * ============================================================
 *
 *
 * The easiest way to create this type of project:
 *
 *
 * npm init playwright@latest
 *
 *
 * During setup, choose TypeScript if prompted.
 *
 *
 * Typical structure:
 *
 * playwright-project/
 *     |
 *     ├── tests/
 *     |
 *     ├── playwright.config.ts
 *     |
 *     ├── package.json
 *     |
 *     └── package-lock.json
 *
 *
 * Test:
 *
 * import { test, expect } from "@playwright/test";
 *
 * test("Example test", async ({ page }) => {
 *
 *     await page.goto("https://example.com");
 *
 *     await expect(page).toHaveTitle(/Example/);
 *
 * });
 *
 */


/*
 * ============================================================
 * 26. WHAT IS npx?
 * ============================================================
 *
 * npx is commonly used to execute package commands.
 *
 *
 * Example:
 *
 * npx playwright test
 *
 *
 * It executes the Playwright CLI available
 * to the project.
 *
 *
 * Another example:
 *
 * npx tsc
 *
 *
 * It executes the TypeScript compiler
 * installed in the project.
 *
 */


/*
 * ============================================================
 * 27. node vs npm vs npx
 * ============================================================
 *
 *
 * node
 *     ↓
 * Executes JavaScript.
 *
 * Example:
 *
 * node app.js
 *
 *
 *
 * npm
 *     ↓
 * Manages packages/project dependencies.
 *
 * Example:
 *
 * npm install playwright
 *
 *
 *
 * npx
 *     ↓
 * Executes package CLI commands.
 *
 * Example:
 *
 * npx playwright test
 *
 */


/*
 * ============================================================
 * 28. PLAYWRIGHT BROWSER INSTALLATION
 * ============================================================
 *
 * Playwright needs browser binaries.
 *
 * Depending on how the project was created,
 * browser installation may already have happened.
 *
 *
 * To explicitly install Playwright browsers:
 *
 *
 * npx playwright install
 *
 *
 * This installs the browsers managed by Playwright,
 * such as Chromium, Firefox and WebKit.
 *
 */


/*
 * ============================================================
 * 29. COMPLETE NEW BASIC PLAYWRIGHT PROJECT
 * ============================================================
 *
 *
 * COMMAND 1:
 *
 * mkdir playwright-demo
 *
 * Creates the project folder.
 *
 *
 * COMMAND 2:
 *
 * cd playwright-demo
 *
 * Enters the project folder.
 *
 *
 * COMMAND 3:
 *
 * npm init -y
 *
 * Creates package.json.
 *
 *
 * COMMAND 4:
 *
 * npm install playwright
 *
 * Installs Playwright.
 *
 *
 * COMMAND 5:
 *
 * npx playwright install
 *
 * Installs Playwright browsers if required.
 *
 *
 * COMMAND 6:
 *
 * Create:
 *
 * browserlaunch.js
 *
 *
 * COMMAND 7:
 *
 * Run:
 *
 * node browserlaunch.js
 *
 */


/*
 * ============================================================
 * 30. COMPLETE NEW PLAYWRIGHT TEST PROJECT
 * ============================================================
 *
 *
 * COMMAND:
 *
 * npm init playwright@latest
 *
 *
 * This scaffolds the Playwright Test project.
 *
 *
 * Then:
 *
 * npm install
 *
 * Usually dependencies are already installed during setup,
 * but npm install can be used if needed later.
 *
 *
 * Then:
 *
 * npx playwright install
 *
 * If browsers are not already installed.
 *
 *
 * Then:
 *
 * npx playwright test
 *
 * Runs the tests.
 *
 */


/*
 * ============================================================
 * 31. EXISTING PROJECT - INDUSTRY WORKFLOW
 * ============================================================
 *
 *
 * STEP 1:
 *
 * git clone <repository-url>
 *
 *
 * STEP 2:
 *
 * cd project-name
 *
 *
 * STEP 3:
 *
 * npm install
 *
 *
 * STEP 4:
 *
 * npx playwright install
 *
 * Only if required by the project/environment.
 *
 *
 * STEP 5:
 *
 * Read package.json scripts.
 *
 *
 * STEP 6:
 *
 * Run the project using the project's documented command.
 *
 * Example:
 *
 * npm test
 *
 * or:
 *
 * npx playwright test
 *
 */


/*
 * ============================================================
 * 32. IMPORTANT DECISION TABLE
 * ============================================================
 *
 *
 * EMPTY FOLDER
 *
 * Basic Node.js project:
 *
 * npm init -y
 *
 *
 *
 * EMPTY FOLDER
 *
 * Node.js + Playwright API:
 *
 * npm init -y
 * npm install playwright
 *
 *
 *
 * EMPTY FOLDER
 *
 * Complete Playwright Test project:
 *
 * npm init playwright@latest
 *
 *
 *
 * EXISTING NODE.JS PROJECT
 *
 * Add Playwright:
 *
 * npm install playwright
 *
 *
 *
 * IMPORTED/CLONED EXISTING PROJECT
 *
 * Install dependencies:
 *
 * npm install
 *
 *
 *
 * EXISTING PLAYWRIGHT PROJECT
 *
 * Usually:
 *
 * npm install
 *
 *
 * Not:
 *
 * npm init -y
 *
 *
 * Because package.json already exists.
 *
 */


/*
 * ============================================================
 * 33. COMMON MISTAKE #1
 * ============================================================
 *
 * Student imports an existing project.
 *
 * They run:
 *
 * npm init -y
 *
 *
 * WRONG in most cases.
 *
 *
 * Why?
 *
 * package.json already exists.
 *
 *
 * Correct:
 *
 * npm install
 *
 */


/*
 * ============================================================
 * 34. COMMON MISTAKE #2
 * ============================================================
 *
 * Student clones a Playwright project.
 *
 * They run:
 *
 * npm install playwright
 *
 *
 * Usually unnecessary if Playwright is already
 * listed in package.json.
 *
 *
 * Correct:
 *
 * npm install
 *
 */


/*
 * ============================================================
 * 35. COMMON MISTAKE #3
 * ============================================================
 *
 * Student runs:
 *
 * npm init -y
 *
 * and expects Playwright to be installed.
 *
 *
 * WRONG.
 *
 *
 * npm init -y
 *     ↓
 * Only creates package.json.
 *
 *
 * Need:
 *
 * npm install playwright
 *
 * to add Playwright.
 *
 */


/*
 * ============================================================
 * 36. MOST IMPORTANT COMMANDS
 * ============================================================
 *
 *
 * npm init -y
 *
 * CREATE basic Node.js/npm project configuration.
 *
 *
 *
 * npm install playwright
 *
 * ADD Playwright to existing Node.js project.
 *
 *
 *
 * npm init playwright@latest
 *
 * CREATE/SCaffold Playwright Test project.
 *
 *
 *
 * npm install
 *
 * INSTALL dependencies already declared in package.json.
 *
 *
 *
 * npx playwright install
 *
 * INSTALL Playwright browser binaries.
 *
 *
 *
 * npx playwright test
 *
 * RUN Playwright tests.
 *
 *
 *
 * node filename.js
 *
 * RUN a JavaScript file with Node.js.
 *
 */


/*
 * ============================================================
 * 37. FINAL MEMORY TRICK
 * ============================================================
 *
 *
 * npm init -y
 *     ↓
 * CREATE package.json
 *
 *
 * npm install playwright
 *     ↓
 * ADD Playwright
 *
 *
 * npm install
 *     ↓
 * INSTALL EXISTING dependencies
 *
 *
 * npm init playwright@latest
 *     ↓
 * CREATE Playwright Test project
 *
 *
 * npx playwright install
 *     ↓
 * INSTALL Playwright browsers
 *
 *
 * npx playwright test
 *     ↓
 * RUN Playwright tests
 *
 *
 * node app.js
 *     ↓
 * RUN JavaScript
 *
 */


/*
 * ============================================================
 * 38. INDUSTRY FLOW
 * ============================================================
 *
 *
 * NEW PROJECT:
 *
 * Empty folder
 *     ↓
 * npm init -y
 *     ↓
 * package.json
 *     ↓
 * npm install playwright
 *     ↓
 * node_modules
 *     ↓
 * Write automation code
 *     ↓
 * node browserlaunch.js
 *
 *
 *
 * NEW PLAYWRIGHT TEST PROJECT:
 *
 * Empty folder
 *     ↓
 * npm init playwright@latest
 *     ↓
 * Project structure
 *     ↓
 * tests/
 * playwright.config.ts
 * package.json
 *     ↓
 * npx playwright test
 *
 *
 *
 * EXISTING PROJECT:
 *
 * Git repository
 *     ↓
 * git clone
 *     ↓
 * cd project
 *     ↓
 * npm install
 *     ↓
 * node_modules
 *     ↓
 * npx playwright install (if required)
 *     ↓
 * Run project
 *
 */


/*
 * ============================================================
 * FINAL RULE
 * ============================================================
 *
 *
 * npm init -y
 *     =
 * "CREATE the npm project configuration."
 *
 *
 * npm install playwright
 *     =
 * "ADD Playwright to this project."
 *
 *
 * npm install
 *     =
 * "INSTALL everything this existing project needs."
 *
 *
 * npm init playwright@latest
 *     =
 * "CREATE a complete Playwright Test project."
 *
 *
 * npx playwright install
 *     =
 * "INSTALL Playwright browser binaries."
 *
 */