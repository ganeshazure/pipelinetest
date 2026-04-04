// ====================================
// PLAYWRIGHT LOCATOR STRATEGIES GUIDE
// ====================================


// ------------------------------------
// 1️⃣ USER-FACING LOCATORS (RECOMMENDED)
// ------------------------------------

// Locate by role (BEST practice - uses accessibility)
await page.getByRole('button', { name: 'Login' });

// Locate by visible text
await page.getByText('Submit');

// Locate input using label text
await page.getByLabel('Email').fill('test@mail.com');

// Locate input using placeholder
await page.getByPlaceholder('Enter username').fill('Ganesh');

// Locate using test id (automation-friendly)
await page.getByTestId('login-btn');

// Locate by alt text (images)
await page.getByAltText('Company Logo');

// Locate by title attribute
await page.getByTitle('Save Changes');


// ------------------------------------
// 2️⃣ CSS LOCATORS (STRUCTURE-BASED)
// ------------------------------------

// By ID (fast but can be dynamic)
await page.locator('#username');

// By class (not stable in modern apps)
await page.locator('.login-btn');

// By attribute
await page.locator('input[name="email"]');

// Partial attribute match (starts with)
await page.locator('[id^="user_"]');

// Ends with
await page.locator('[id$="_btn"]');

// Contains
await page.locator('[class*="active"]');


// ------------------------------------
// 3️⃣ XPATH LOCATORS (NOT RECOMMENDED)
// ------------------------------------

// Basic XPath
await page.locator('//button[text()="Submit"]');

// Parent-child traversal
await page.locator('//div[@class="card"]//button');

// Sibling navigation
await page.locator('//label[text()="Email"]/following-sibling::input');

// ⚠️ Avoid XPath unless no other option


// ------------------------------------
// 4️⃣ CHAINING LOCATORS
// ------------------------------------

// Locate parent → then child
await page.locator('.card').getByRole('button', { name: 'Buy' });

// Multiple chaining
await page.locator('.card').locator('button').click();

// Deep chaining
await page.locator('div').locator('ul').locator('li').nth(0);


// ------------------------------------
// 5️⃣ FILTERING LOCATORS (VERY IMPORTANT)
// ------------------------------------

// Filter by text
await page.locator('.user', { hasText: 'Ganesh' });

// Filter using another locator
await page.locator('.card', {
  has: page.getByText('Product A')
});

// Filter list items
await page.locator('li').filter({ hasText: 'Banana' });


// ------------------------------------
// 6️⃣ HANDLING DUPLICATE ELEMENTS
// ------------------------------------

// Select first element
await page.locator('button').first();

// Select last element
await page.locator('button').last();

// Select nth element
await page.locator('button').nth(1);


// ------------------------------------
// 7️⃣ DYNAMIC ELEMENT HANDLING
// ------------------------------------

// Avoid dynamic IDs
// ❌ BAD
await page.locator('#btn_123456');

// ✅ GOOD (use text/role)
await page.getByRole('button', { name: 'Submit' });

// Use partial match
await page.locator('[id^="btn_"]');


// ------------------------------------
// 8️⃣ RELATIVE LOCATORS (CONTEXT-BASED)
// ------------------------------------

// Table row example
await page.locator('tr', { hasText: 'Ganesh' })
  .getByRole('button', { name: 'Edit' });

// Card example
await page.locator('.card', {
  has: page.getByText('Product A')
}).getByRole('button', { name: 'Add to Cart' });


// ------------------------------------
// 9️⃣ TEXT MATCHING OPTIONS
// ------------------------------------

// Exact match
await page.getByText('Submit', { exact: true });

// Partial match
await page.getByText('Sub');

// Case-insensitive (default behavior)
await page.getByText('submit');


// ------------------------------------
// 🔟 LOCATOR VS SELECTOR
// ------------------------------------

// Locator (Playwright recommended)
// - Lazy evaluation
// - Auto-wait
// - Retry support
const locator = page.locator('button');

// Selector ($)
// - Immediate execution
// - No auto-wait
// - Not retryable
const element = await page.$('button');

// ❌ Avoid
await page.$('button').click();

// ✅ Use
await page.locator('button').click();


// ------------------------------------
// 1️⃣1️⃣ LOCATOR ACTIONS
// ------------------------------------

// Click
await page.locator('button').click();

// Fill
await page.locator('#email').fill('test@mail.com');

// Check checkbox
await page.locator('#terms').check();

// Select dropdown
await page.locator('select').selectOption('India');

// Hover
await page.locator('button').hover();


// ------------------------------------
// 1️⃣2️⃣ ASSERTIONS WITH LOCATORS
// ------------------------------------

// Visible
await expect(page.locator('#success')).toBeVisible();

// Hidden
await expect(page.locator('.loader')).toBeHidden();

// Text
await expect(page.locator('h1')).toHaveText('Dashboard');

// Count
await expect(page.locator('tr')).toHaveCount(5);


// ------------------------------------
// 1️⃣3️⃣ ADVANCED (REAL-TIME SCENARIOS)
// ------------------------------------

// Click button inside specific card
await page.locator('.card', { hasText: 'iPhone' })
  .getByRole('button', { name: 'Buy' });

// Click delete for specific user
await page.locator('tr', { hasText: 'Ravi' })
  .getByRole('button', { name: 'Delete' });

// Multiple conditions
await page.locator('button.primary', {
  hasText: 'Save'
});


// ------------------------------------
// 1️⃣4️⃣ FRAME LOCATORS
// ------------------------------------

// Switch to iframe
const frame = page.frameLocator('#frame');

// Interact inside frame
await frame.getByRole('button', { name: 'Submit' }).click();


// ------------------------------------
// 1️⃣5️⃣ SHADOW DOM (AUTO HANDLED)
// ------------------------------------

// No special handling needed
await page.getByRole('button', { name: 'Click Me' }).click();


// ------------------------------------
// 1️⃣6️⃣ STRICT MODE (IMPORTANT)
// ------------------------------------

// Playwright throws error if multiple elements match

// ❌ Error
await page.getByText('Delete').click();

// ✅ Fix
await page.getByText('Delete').nth(0).click();


// ------------------------------------
// 1️⃣7️⃣ BEST PRACTICES (INTERVIEW GOLD)
// ------------------------------------

// Priority order:
// 1. getByRole()
// 2. getByLabel()
// 3. getByTestId()
// 4. CSS locator
// 5. XPath (last)

// Rule:
// "Use user-facing locators over DOM-based locators"


// ------------------------------------
// 1️⃣8️⃣ COMMON MISTAKES
// ------------------------------------

// ❌ Using hard XPath
// ❌ Using dynamic IDs
// ❌ Using waitForTimeout
// ❌ Not handling duplicate elements

// ✅ Always:
// - Use role/text
// - Use chaining
// - Use filters


// ====================================
// END OF DOCUMENT
// ====================================