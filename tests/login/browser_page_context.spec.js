```javascript
// browser_page_context.spec.js

/**
 * ============================================
 * 🧠 PLAYWRIGHT INTERNAL DESIGN EXPLANATION
 * ============================================
 *
 * In Selenium (Java):
 * -------------------
 * WebDriver driver = new ChromeDriver();
 * → One main class (driver) handles everything
 *
 * In Playwright:
 * -------------------
 * There is NO single driver class.
 * Instead it uses:
 *
 * Browser → BrowserContext → Page → Locator
 *
 * Objects are NOT created using `new` directly.
 * Instead, objects are created using methods (Factory Pattern).
 *
 * Example:
 * const page = await context.newPage();
 *
 * Meaning:
 * → calling method
 * → method creates object internally
 * → returns it
 * → stored in variable
 */


/**
 * ============================================
 * 🧱 SIMPLIFIED INTERNAL CLASS DESIGN
 * (How Playwright is structured internally)
 * ============================================
 */

// 🔵 Browser class
class Browser {
  newContext() {
    return new BrowserContext(this); // creates context
  }

  close() {
    console.log("Browser closed");
  }
}

// 🟢 BrowserContext class
class BrowserContext {
  constructor(browser) {
    this.browser = browser;
  }

  newPage() {
    return new Page(this); // creates page
  }

  clearCookies() {
    console.log("Cookies cleared");
  }
}

// 🟡 Page class (Main class like Selenium driver)
class Page {
  constructor(context) {
    this.context = context;
  }

  goto(url) {
    console.log("Navigating to:", url);
  }

  fill(selector, value) {
    console.log(`Filling ${selector} with ${value}`);
  }

  click(selector) {
    console.log(`Clicking ${selector}`);
  }

  locator(selector) {
    return new Locator(this, selector); // creates Locator object
  }
}

// 🔴 Locator class (handles element actions)
class Locator {
  constructor(page, selector) {
    this.page = page;
    this.selector = selector;
  }

  click() {
    console.log(`Locator clicking ${this.selector}`);
  }

  fill(value) {
    console.log(`Locator filling ${this.selector} with ${value}`);
  }

  isVisible() {
    return true;
  }
}


/**
 * ============================================
 * 🧪 USAGE (Playwright-like flow)
 * ============================================
 */

const browser = new Browser();              // create Browser object

const context = browser.newContext();       // method call → returns BrowserContext

const page = context.newPage();             // method call → returns Page

page.goto("https://example.com");           // Page method

page.fill("#username", "Ganesh");           // Page method

// Locator creation
const input = page.locator("#username");    // returns Locator object

input.fill("Ganesh");                       // Locator method

input.click();

browser.close();                            // Browser method


/**
 * ============================================
 * 🧠 KEY UNDERSTANDING
 * ============================================
 *
 * ❌ Not like Java:
 *    Page p = new Page();
 *
 * ✅ Playwright style:
 *    const page = context.newPage();
 *
 * Meaning:
 * → calling method
 * → method internally does: new Page()
 * → returns object
 *
 */


/**
 * ============================================
 * 🔗 METHOD CHAINING EXPLANATION
 * ============================================
 */

// This:
page.locator("#login").click();

/**
 * Means:
 *
 * Step 1:
 * page.locator("#login")
 * → returns Locator object
 *
 * Step 2:
 * .click()
 * → method of Locator class
 */


/**
 * ============================================
 * 🧮 SIMPLE CALCULATOR EXAMPLE (to understand pattern)
 * ============================================
 */

class App {
  getCalculator() {
    return new Calculator(); // factory method
  }
}

class Calculator {
  add(a, b) {
    return a + b;
  }

  getAdvanced() {
    return new AdvancedCalculator(); // returns another object
  }
}

class AdvancedCalculator {
  power(a, b) {
    return a ** b;
  }
}

// Usage
const app = new App();

const calc = app.getCalculator();          // similar to context.newPage()

console.log(calc.add(2, 3));               // 5

const adv = calc.getAdvanced();            // similar to page.locator()

console.log(adv.power(2, 3));              // 8


/**
 * ============================================
 * 🆚 REAL PLAYWRIGHT TEST (what you write)
 * ============================================
 */

const { test, expect } = require('@playwright/test');

test('login test', async ({ page }) => {

  // page is already created internally like:
  // browser → context → page

  await page.goto("https://example.com");

  await page.fill('#username', 'Ganesh');      // Page method

  await page.locator('#login').click();        // Locator method

});


/**
 * ============================================
 * 🔥 FINAL TAKEAWAYS
 * ============================================
 *
 * ✔ Page, Locator, Browser, BrowserContext are classes
 *
 * ✔ Objects are created via methods (NOT using new directly)
 *
 * ✔ const page = context.newPage()
 *    → method call
 *    → creates Page internally
 *    → returns it
 *
 * ✔ page.locator()
 *    → returns Locator object
 *
 * ✔ Locator handles element-level actions
 *
 * ✔ Playwright = chain of objects
 *    Browser → Context → Page → Locator
 *
 */
```
