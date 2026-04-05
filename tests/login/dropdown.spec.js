<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Playwright Dropdown Examples</title>
  <style>
    .dropdown-item { padding: 5px; cursor: pointer; }
    #scrollDropdown { max-height: 100px; overflow-y: scroll; border: 1px solid #ccc; width: 150px; }
  </style>
</head>
<body>

  <!-- 1. Static Dropdown -->
  <label for="country">Country:</label>
  <select id="country">
    <option value="india">India</option>
    <option value="usa">USA</option>
    <option value="uk">UK</option>
  </select>

  <br><br>

  <!-- 2. Custom Dropdown -->
  <div id="dropdown" style="border:1px solid #000; padding:5px; width:150px;">Select Country
    <div class="dropdown-item">India</div>
    <div class="dropdown-item">USA</div>
    <div class="dropdown-item">UK</div>
  </div>

  <br><br>

  <!-- 3. Searchable Dropdown -->
  <div id="searchDropdown" style="border:1px solid #000; width:150px; padding:5px;">Select Country
    <input type="text" id="searchInput" placeholder="Search...">
    <div class="suggestion-item">India</div>
    <div class="suggestion-item">USA</div>
    <div class="suggestion-item">UK</div>
  </div>

  <br><br>

  <!-- 4. Multi-select -->
  <label for="multiSelect">Multi-Select:</label>
  <select id="multiSelect" multiple>
    <option value="india">India</option>
    <option value="usa">USA</option>
    <option value="uk">UK</option>
  </select>

  <br><br>

  <!-- 5. Scrollable Dropdown -->
  <div id="scrollDropdown">
    <div class="dropdown-item">India</div>
    <div class="dropdown-item">USA</div>
    <div class="dropdown-item">UK</div>
    <div class="dropdown-item">China</div>
    <div class="dropdown-item">Japan</div>
    <div class="dropdown-item">Germany</div>
  </div>

</body>
</html>
import { test, expect } from '@playwright/test';

test('Dropdown Handling with HTML Examples', async ({ page }) => {
  // Load local HTML
  await page.goto('file://' + __dirname + '/dropdowns.html');

  // =========================
  // 1. Static Dropdown (<select>)
  // =========================
  const staticDropdown = page.locator('#country');
  await staticDropdown.selectOption('india'); // by value
  await expect(staticDropdown).toHaveValue('india');

  await staticDropdown.selectOption({ label: 'USA' }); // by label
  await expect(staticDropdown).toHaveValue('usa');

  await staticDropdown.selectOption({ index: 2 }); // by index
  await expect(staticDropdown).toHaveValue('uk');

  // =========================
  // 2. Custom Dropdown (div-based)
  // =========================
  const customDropdown = page.locator('#dropdown');
  await customDropdown.click();
  await page.locator('#dropdown .dropdown-item', { hasText: 'India' }).click();
  await expect(customDropdown).toContainText('India');

  // =========================
  // 3. Searchable Dropdown
  // =========================
  const searchDropdown = page.locator('#searchDropdown');
  await searchDropdown.click();
  await page.locator('#searchInput').fill('Us');
  await page.locator('.suggestion-item', { hasText: 'USA' }).click();
  await expect(searchDropdown).toContainText('USA');

  // =========================
  // 4. Multi-select Dropdown
  // =========================
  const multiDropdown = page.locator('#multiSelect');
  await multiDropdown.selectOption(['india', 'usa']); // multiple values
  const selectedValues = await multiDropdown.evaluate(el => Array.from(el.selectedOptions).map(opt => opt.value));
  expect(selectedValues).toContain('india');
  expect(selectedValues).toContain('usa');

  // =========================
  // 5. Scrollable Dropdown
  // =========================
  const scrollDropdown = page.locator('#scrollDropdown');
  await scrollDropdown.click();
  const option = page.locator('#scrollDropdown .dropdown-item', { hasText: 'Germany' });
  await option.scrollIntoViewIfNeeded();
  await option.click();
});
import { test, expect } from '@playwright/test';

test('Playwright Dropdown Handling Cheat Sheet', async ({ page }) => {

  await page.goto('https://example.com');


  // =========================
  // 🔽 1. STATIC DROPDOWN (SELECT TAG)
  // =========================

  const dropdown = page.locator('#country');

  await dropdown.selectOption('india');
  // Select using value attribute

  await dropdown.selectOption({ label: 'India' });
  // Select using visible text

  await dropdown.selectOption({ index: 1 });
  // Select using index (0-based)

  await dropdown.selectOption({ value: 'india', label: 'India' });
  // Select using multiple attributes

  // Validate selected value
  await expect(dropdown).toHaveValue('india');


  // =========================
  // 🔽 2. CUSTOM DROPDOWN (DIV BASED)
  // =========================

  const customDropdown = page.locator('#dropdown');

  await customDropdown.click();
  // Open dropdown

  await page.locator('text=India').click();
  // Select option by visible text

  // Validate selection
  await expect(customDropdown).toContainText('India');


  // =========================
  // 🔍 3. SEARCHABLE DROPDOWN
  // =========================

  const searchDropdown = page.locator('#searchDropdown');

  await searchDropdown.click();
  // Open dropdown

  await page.locator('#searchInput').fill('Ind');
  // Type to filter options

  await page.locator('text=India').click();
  // Select filtered result

  await expect(searchDropdown).toContainText('India');


  // =========================
  // ⌨️ 4. DROPDOWN USING KEYBOARD
  // =========================

  await searchDropdown.click();

  await page.keyboard.press('ArrowDown');
  // Move to next option

  await page.keyboard.press('Enter');
  // Select highlighted option


  // =========================
  // 📜 5. MULTI-SELECT DROPDOWN
  // =========================

  const multiDropdown = page.locator('#multiSelect');

  await multiDropdown.selectOption(['india', 'usa']);
  // Select multiple values

  // Validate multiple selection
  const values = await multiDropdown.evaluate(el =>
    Array.from(el.selectedOptions).map(opt => opt.value)
  );

  expect(values).toContain('india');
  expect(values).toContain('usa');


  // =========================
  // 📦 6. AUTO-SUGGEST DROPDOWN
  // =========================

  const autoInput = page.locator('#autoSuggest');

  await autoInput.fill('Ind');
  // Type partial text

  await page.locator('.suggestion-item >> text=India').click();
  // Select suggestion

  await expect(autoInput).toHaveValue('India');


  // =========================
  // 📊 7. DYNAMIC DROPDOWN (API BASED)
  // =========================

  await page.locator('#dynamicDropdown').click();

  await page.waitForSelector('.dropdown-item');
  // Wait for options loaded from API

  await page.locator('.dropdown-item >> text=India').click();

  await expect(page.locator('#dynamicDropdown')).toContainText('India');


  // =========================
  // 📜 8. SCROLLABLE DROPDOWN
  // =========================

  const scrollDropdown = page.locator('#scrollDropdown');

  await scrollDropdown.click();

  const option = page.locator('text=India');

  await option.scrollIntoViewIfNeeded();
  // Scroll until visible

  await option.click();


  // =========================
  // 🎯 9. SELECT FIRST / LAST OPTION
  // =========================

  const options = page.locator('.dropdown-item');

  await options.first().click();
  // Select first option

  await options.last().click();
  // Select last option


  // =========================
  // 🔢 10. SELECT BY INDEX (CUSTOM)
  // =========================

  await options.nth(2).click();
  // Select 3rd option


  // =========================
  // 🧠 11. VALIDATE DROPDOWN OPTIONS COUNT
  // =========================

  await expect(options).toHaveCount(5);
  // Validate number of options


  // =========================
  // 🔁 12. LOOP THROUGH OPTIONS
  // =========================

  const count = await options.count();

  for (let i = 0; i < count; i++) {
    const text = await options.nth(i).textContent();
    console.log(text);
  }


  // =========================
  // ❌ 13. NEGATIVE VALIDATION
  // =========================

  await expect(options).not.toContainText('InvalidOption');
  // Ensure option not present


  // =========================
  // ⚠️ 14. FORCE CLICK (EDGE CASE)
  // =========================

  await page.locator('text=India').click({ force: true });
  // Use when element is hidden/overlapping (avoid if possible)


  // =========================
  // 🧠 BEST PRACTICES
  // =========================

  // ✔ Use selectOption() ONLY for <select> tag
  // ✔ Use click() for custom dropdowns
  // ✔ Always validate selected value
  // ✔ Avoid hard waits
  // ✔ Use locator strategies instead of XPath when possible

});