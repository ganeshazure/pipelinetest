// ============================================================================
// MASTER PLAYWRIGHT LOCATOR GUIDE
// File: masterlocator.spec.js
// Purpose: Complete Playwright Locator Training / Reference
// ============================================================================
//
// IMPORTANT:
// This file is mainly a TRAINING / REFERENCE file.
//
// The locators below assume an application containing elements such as:
// - Login button
// - Username / Password fields
// - Create button
// - Delete button
// - Product cards
// - Tables
// - Checkboxes
// - Radio buttons
// - Dropdowns
// - Dialogs
// - Calendars
// - Search results
//
// Some examples are intentionally commented out because they depend on
// specific HTML existing in the application.
//
// ============================================================================

const { test, expect } = require("@playwright/test");


// ============================================================================
// 1. BASIC TEST STRUCTURE
// ============================================================================

test("Master Locator Training", async ({ page }) => {

    await page.goto("https://example.com");

    // All locator examples can be written inside a Playwright test.
    // Replace example.com with your application URL when practicing.


    // ========================================================================
    // 2. getByRole()
    // ========================================================================
    //
    // RECOMMENDED
    //
    // getByRole() identifies an element based on its accessible role.
    //
    // Examples of roles:
    //
    // button
    // link
    // textbox
    // checkbox
    // radio
    // heading
    // combobox
    // option
    // list
    // listitem
    // table
    // row
    // cell
    // dialog
    // tab
    // menu
    // menuitem
    // switch
    // slider
    // spinbutton
    // grid
    // gridcell
    //
    // ========================================================================

    // Button
    const loginButton =
        page.getByRole("button", { name: "Login" });

    // Click
    // await loginButton.click();


    // Exact accessible name
    const createButton =
        page.getByRole("button", {
            name: "Create",
            exact: true
        });

    // await createButton.click();


    // Regular expression
    const submitButton =
        page.getByRole("button", {
            name: /submit/i
        });

    // await submitButton.click();


    // Heading
    const heading =
        page.getByRole("heading", {
            name: "Dashboard"
        });

    // await expect(heading).toBeVisible();


    // Checkbox
    const rememberMe =
        page.getByRole("checkbox", {
            name: "Remember me"
        });

    // await rememberMe.check();


    // Radio button
    const maleRadio =
        page.getByRole("radio", {
            name: "Male"
        });

    // await maleRadio.check();


    // Combobox
    const countryDropdown =
        page.getByRole("combobox");

    // await countryDropdown.click();


    // Link
    const homeLink =
        page.getByRole("link", {
            name: "Home"
        });

    // await homeLink.click();



    // ========================================================================
    // 3. getByText()
    // ========================================================================
    //
    // Finds an element using visible text.
    //
    // Example HTML:
    //
    // <div>Create Account</div>
    //
    // ========================================================================

    const createText =
        page.getByText("Create");

    // await createText.click();


    // Exact text
    const exactCreateText =
        page.getByText("Create", {
            exact: true
        });

    // await exactCreateText.click();


    // Regular expression
    const loginText =
        page.getByText(/login/i);

    // await loginText.click();


    // IMPORTANT:
    //
    // getByText("Create")
    //
    // means:
    // "Find an element containing this text."
    //
    // If the element is specifically a button, this is usually more semantic:
    //
    // getByRole("button", { name: "Create" })



    // ========================================================================
    // 4. getByLabel()
    // ========================================================================
    //
    // Recommended for form controls.
    //
    // Example:
    //
    // <label for="username">Username</label>
    // <input id="username">
    //
    // ========================================================================

    const username =
        page.getByLabel("Username");

    // await username.fill("Ganesh");


    const password =
        page.getByLabel("Password");

    // await password.fill("password");


    // Regex
    const email =
        page.getByLabel(/email/i);

    // await email.fill("ganesh@gmail.com");



    // ========================================================================
    // 5. getByPlaceholder()
    // ========================================================================
    //
    // Example:
    //
    // <input placeholder="Enter username">
    //
    // ========================================================================

    const usernamePlaceholder =
        page.getByPlaceholder("Enter username");

    // await usernamePlaceholder.fill("Ganesh");


    // Regex
    const emailPlaceholder =
        page.getByPlaceholder(/email/i);

    // await emailPlaceholder.fill("ganesh@gmail.com");



    // ========================================================================
    // 6. getByAltText()
    // ========================================================================
    //
    // Used mainly for images.
    //
    // Example:
    //
    // <img alt="Profile photo">
    //
    // ========================================================================

    const profileImage =
        page.getByAltText("Profile photo");

    // await profileImage.click();



    // ========================================================================
    // 7. getByTitle()
    // ========================================================================
    //
    // VERY IMPORTANT:
    //
    // getByTitle() DOES NOT mean browser/page title.
    //
    // It means HTML ELEMENT'S title attribute.
    //
    // Example:
    //
    // <button title="Delete">X</button>
    //
    // ========================================================================

    const deleteByTitle =
        page.getByTitle("Delete");

    // await deleteByTitle.click();


    // DO NOT confuse:
    //
    // page.title()
    //
    // with:
    //
    // page.getByTitle()
    //
    //
    // page.title()
    //     -> Browser/page title
    //
    // getByTitle()
    //     -> HTML element title attribute



    // ========================================================================
    // 8. getByTestId()
    // ========================================================================
    //
    // Example:
    //
    // <button data-testid="login-button">
    //     Login
    // </button>
    //
    // ========================================================================

    const loginByTestId =
        page.getByTestId("login-button");

    // await loginByTestId.click();


    // If your project config uses:
    //
    // testIdAttribute: "data-pw"
    //
    // then:
    //
    // getByTestId("login-button")
    //
    // searches:
    //
    // data-pw="login-button"



    // ========================================================================
    // 9. locator()
    // ========================================================================
    //
    // Generic locator API.
    //
    // Commonly used with CSS selectors and XPath.
    //
    // ========================================================================

    const usernameById =
        page.locator("#username");

    // await usernameById.fill("Ganesh");


    const loginByClass =
        page.locator(".login-button");

    // await loginByClass.click();


    const buttons =
        page.locator("button");



    // ========================================================================
    // 10. CSS LOCATORS
    // ========================================================================

    // ID
    const cssId =
        page.locator("#username");


    // Class
    const cssClass =
        page.locator(".login-button");


    // Multiple classes
    const multipleClasses =
        page.locator(".btn.primary.login");


    // Tag
    const allButtons =
        page.locator("button");


    // Attribute
    const nameAttribute =
        page.locator('[name="username"]');


    // Multiple attributes
    const multipleAttributes =
        page.locator(
            'input[type="text"][name="username"]'
        );


    // Attribute contains
    const containsAttribute =
        page.locator('[id*="user"]');


    // Attribute starts with
    const startsWithAttribute =
        page.locator('[id^="user"]');


    // Attribute ends with
    const endsWithAttribute =
        page.locator('[id$="name"]');


    // Descendant
    const formInput =
        page.locator("form input");


    // Direct child
    const directChild =
        page.locator("form > input");


    // Adjacent sibling
    const adjacentSibling =
        page.locator("label + input");


    // General sibling
    const generalSibling =
        page.locator("label ~ input");



    // ========================================================================
    // 11. ADVANCED CSS LOCATORS
    // ========================================================================

    // Element containing text
    const loginCssText =
        page.locator('button:has-text("Login")');


    // Element containing another element
    const cardContainingButton =
        page.locator("div:has(button)");


    // Visible buttons
    const visibleButtons =
        page.locator("button:visible");


    // Playwright nth-match
    const secondBuyButton =
        page.locator(
            'button:has-text("Buy"):nth-match(:text("Buy"), 2)'
        );



    // ========================================================================
    // 12. XPATH LOCATORS
    // ========================================================================
    //
    // XPath is supported.
    //
    // Prefer role/label/text/test-id/CSS when they provide a stable locator.
    // Use XPath when DOM relationships or complex XPath expressions are needed.
    //
    // ========================================================================

    // All buttons
    const xpathButtons =
        page.locator("//button");


    // ID
    const xpathUsername =
        page.locator(
            '//input[@id="username"]'
        );


    // Attribute
    const xpathName =
        page.locator(
            '//input[@name="username"]'
        );


    // Exact text
    const xpathLogin =
        page.locator(
            '//button[text()="Login"]'
        );


    // Contains text
    const xpathContainsText =
        page.locator(
            '//button[contains(text(),"Login")]'
        );


    // Parent
    const xpathParent =
        page.locator(
            '//input[@id="username"]/..'
        );


    // Following sibling
    const xpathFollowingSibling =
        page.locator(
            '//label[text()="Username"]/following-sibling::input'
        );


    // Ancestor
    const xpathAncestor =
        page.locator(
            '//input[@id="username"]/ancestor::form'
        );


    // AND
    const xpathAnd =
        page.locator(
            '//input[@type="text" and @name="username"]'
        );


    // OR / union
    const xpathOr =
        page.locator(
            '//button[@id="login"] | //a[@id="login"]'
        );



    // ========================================================================
    // 13. LOCATOR CHAINING
    // ========================================================================
    //
    // Narrow the search step-by-step.
    //
    // Page
    //   ↓
    // Form
    //   ↓
    // Button
    //
    // ========================================================================

    const loginForm =
        page.locator(".login-form");

    const loginFormButton =
        loginForm.getByRole("button", {
            name: "Login"
        });

    // await loginFormButton.click();


    // Another example:
    const formUsername =
        page
            .locator(".login-form")
            .getByLabel("Username");

    // await formUsername.fill("Ganesh");



    // ========================================================================
    // 14. filter({ hasText })
    // ========================================================================
    //
    // VERY IMPORTANT FOR REAL PROJECTS.
    //
    // Example:
    //
    // Product 1 -> iPhone -> Add to cart
    // Product 2 -> Samsung -> Add to cart
    //
    // ========================================================================

    const samsungProduct =
        page
            .getByRole("listitem")
            .filter({
                hasText: "Samsung"
            });

    const samsungAddToCart =
        samsungProduct.getByRole("button", {
            name: "Add to cart"
        });

    // await samsungAddToCart.click();


    // Regex
    const samsungRegex =
        page
            .getByRole("listitem")
            .filter({
                hasText: /Samsung/i
            });



    // ========================================================================
    // 15. filter({ has })
    // ========================================================================
    //
    // Find a parent/container that contains a particular element.
    //
    // ========================================================================

    const samsungCard =
        page
            .getByRole("listitem")
            .filter({
                has: page.getByRole("heading", {
                    name: "Samsung"
                })
            });


    // Then locate something inside that card
    const samsungCardButton =
        samsungCard.getByRole("button", {
            name: "Add to cart"
        });

    // await samsungCardButton.click();



    // ========================================================================
    // 16. filter({ hasNot })
    // ========================================================================

    const availableProducts =
        page
            .getByRole("listitem")
            .filter({
                hasNot: page.getByText("Out of stock")
            });



    // ========================================================================
    // 17. filter({ hasNotText })
    // ========================================================================

    const availableProducts2 =
        page
            .getByRole("listitem")
            .filter({
                hasNotText: "Out of stock"
            });



    // ========================================================================
    // 18. first()
    // ========================================================================
    //
    // Selects the first matching element.
    //
    // IMPORTANT:
    //
    // Do NOT use first() simply because your locator is not unique.
    //
    // Use it when "first" is actually part of the requirement.
    //
    // Example:
    //
    // Select the first search result.
    //
    // ========================================================================

    const firstButton =
        page.getByRole("button").first();

    // await firstButton.click();


    // GOOD USE:
    //
    // Requirement:
    // "Click the first search result."
    //
    // first() makes sense.



    // ========================================================================
    // 19. last()
    // ========================================================================

    const lastButton =
        page.getByRole("button").last();

    // await lastButton.click();


    // GOOD USE:
    //
    // Requirement:
    // "Click the last item."



    // ========================================================================
    // 20. nth()
    // ========================================================================
    //
    // ZERO BASED:
    //
    // nth(0) -> first
    // nth(1) -> second
    // nth(2) -> third
    //
    // ========================================================================

    const thirdButton =
        page.getByRole("button").nth(2);

    // await thirdButton.click();


    // IMPORTANT:
    //
    // nth() is position-based.
    //
    // It can become fragile if the page order changes.
    //
    // Prefer:
    //
    // getByRole("button", { name: "Delete" })
    //
    // instead of:
    //
    // getByRole("button").nth(2)
    //
    // unless position is actually part of the requirement.



    // ========================================================================
    // 21. count()
    // ========================================================================
    //
    // Find how many matching elements exist.
    //
    // ========================================================================

    const buttonCount =
        await page.getByRole("button").count();

    console.log("Button count:", buttonCount);


    // Example:
    if (buttonCount > 0) {
        console.log("At least one button exists.");
    }



    // ========================================================================
    // 22. and()
    // ========================================================================
    //
    // INTERSECTION
    //
    // Find an element that satisfies BOTH locators.
    //
    // Example HTML:
    //
    // <button title="Delete">X</button>
    //
    // ========================================================================

    const deleteButton =
        page
            .getByRole("button")
            .and(page.getByTitle("Delete"));

    // await deleteButton.click();


    // Concept:
    //
    // button
    //    AND
    // title="Delete"
    //    ↓
    // same element



    // ========================================================================
    // 23. or()
    // ========================================================================
    //
    // Find an element matching either locator.
    //
    // ========================================================================

    const createOrNew =
        page
            .getByRole("button", {
                name: "Create"
            })
            .or(
                page.getByRole("button", {
                    name: "New"
                })
            );

    // IMPORTANT:
    //
    // If BOTH elements exist, the resulting locator can match
    // multiple elements.
    //
    // Then you may need to handle that situation explicitly.



    // ========================================================================
    // 24. STRICTNESS
    // ========================================================================
    //
    // Playwright actions normally expect a locator to resolve to
    // exactly one element.
    //
    // Example:
    //
    // <button>Login</button>
    // <button>Login</button>
    //
    // This may produce a strict mode violation:
    //
    // page.getByRole("button", { name: "Login" }).click()
    //
    // because two buttons match.
    //
    // ========================================================================

    const loginButtons =
        page.getByRole("button", {
            name: "Login"
        });

    console.log(
        "Login button count:",
        await loginButtons.count()
    );


    // Better solution:
    //
    // Make the locator unique using:
    //
    // filter()
    // hasText
    // has
    // chaining
    // section/dialog/row/card
    //
    // Avoid immediately using nth() just to silence strictness.



    // ========================================================================
    // 25. TABLE LOCATORS
    // ========================================================================
    //
    // Example:
    //
    // Product | Price | Status | Action
    // ----------------------------------
    // iPhone  | 1000  | Active | Edit
    // Samsung | 800   | Active | Edit
    //
    // ========================================================================

    const samsungRow =
        page
            .getByRole("row")
            .filter({
                hasText: "Samsung"
            });

    const samsungEditButton =
        samsungRow.getByRole("button", {
            name: "Edit"
        });

    // await samsungEditButton.click();



    // ========================================================================
    // 26. PRODUCT CARD LOCATORS
    // ========================================================================

    const iphoneCard =
        page
            .getByRole("article")
            .filter({
                has: page.getByRole("heading", {
                    name: "iPhone"
                })
            });

    const iphoneAddToCart =
        iphoneCard.getByRole("button", {
            name: "Add to Cart"
        });

    // await iphoneAddToCart.click();



    // ========================================================================
    // 27. FORM LOCATORS
    // ========================================================================

    // Textbox
    const textBox =
        page.getByRole("textbox");


    // Checkbox
    const checkbox =
        page.getByRole("checkbox");


    // Radio
    const radio =
        page.getByRole("radio");


    // Combobox
    const comboBox =
        page.getByRole("combobox");


    // Spinbutton
    const numberInput =
        page.getByRole("spinbutton");


    // Textarea
    const textarea =
        page.locator("textarea");



    // ========================================================================
    // 28. NATIVE SELECT DROPDOWN
    // ========================================================================

    const countrySelect =
        page.locator("#country");

    // await countrySelect.selectOption("India");



    // ========================================================================
    // 29. CUSTOM DROPDOWN
    // ========================================================================

    const customDropdown =
        page.getByRole("combobox");

    // await customDropdown.click();

    const indiaOption =
        page.getByRole("option", {
            name: "India"
        });

    // await indiaOption.click();



    // ========================================================================
    // 30. SEARCHABLE / AUTOCOMPLETE DROPDOWN
    // ========================================================================

    const fromField =
        page.getByPlaceholder("From");

    // await fromField.fill("New");

    const newYork =
        page.getByText("New York", {
            exact: true
        });

    // await newYork.click();



    // ========================================================================
    // 31. DIALOG / MODAL
    // ========================================================================
    //
    // Scope your locator inside the dialog.
    //
    // ========================================================================

    const dialog =
        page.getByRole("dialog");

    const dialogSaveButton =
        dialog.getByRole("button", {
            name: "Save"
        });

    // await dialogSaveButton.click();


    // This is better than globally doing:
    //
    // page.getByRole("button", { name: "Save" })
    //
    // if multiple Save buttons exist.



    // ========================================================================
    // 32. TOAST / ALERT
    // ========================================================================

    const alert =
        page.getByRole("alert");

    // await expect(alert).toBeVisible();

    // await expect(alert).toHaveText(
    //     "Successfully saved"
    // );



    // ========================================================================
    // 33. PAGINATION
    // ========================================================================

    const nextButton =
        page.getByRole("button", {
            name: "Next"
        });

    // await nextButton.click();


    const pageTwo =
        page.getByText("Page 2", {
            exact: true
        });

    // await expect(pageTwo).toBeVisible();



    // ========================================================================
    // 34. CALENDAR LOCATORS
    // ========================================================================
    //
    // Typical custom calendar:
    //
    // <div role="gridcell"
    //      aria-label="Thu Oct 15 2026">
    //
    // ========================================================================

    const calendarDate =
        page.getByRole("gridcell", {
            name: "Thu Oct 15 2026"
        });

    // await calendarDate.click();


    // Month
    const october =
        page.getByText("October 2026", {
            exact: true
        });

    // await expect(october).toBeVisible();


    // Disabled dates
    const disabledDates =
        page.locator(
            '[role="gridcell"][aria-disabled="true"]'
        );


    // Selected date
    const selectedDate =
        page.locator(
            '[role="gridcell"][aria-selected="true"]'
        );



    // ========================================================================
    // 35. REGEX LOCATORS
    // ========================================================================

    const loginRegex =
        page.getByText(/login/i);


    const submitRegex =
        page.getByRole("button", {
            name: /submit/i
        });


    const usernameRegex =
        page.getByLabel(/user\s*name/i);



    // ========================================================================
    // 36. EXACT MATCH
    // ========================================================================

    const exactText =
        page.getByText("Create", {
            exact: true
        });


    const exactButton =
        page.getByRole("button", {
            name: "Create",
            exact: true
        });



    // ========================================================================
    // 37. STATE-BASED LOCATORS
    // ========================================================================
    //
    // Useful states:
    //
    // checked
    // disabled
    // expanded
    // pressed
    // selected
    //
    // ========================================================================

    const checkedRememberMe =
        page.getByRole("checkbox", {
            name: "Remember me",
            checked: true
        });


    const disabledButton =
        page.getByRole("button", {
            name: "Submit",
            disabled: true
        });


    const expandedMenu =
        page.getByRole("button", {
            name: "Menu",
            expanded: true
        });



    // ========================================================================
    // 38. HIDDEN / VISIBLE
    // ========================================================================

    const visibleButton =
        page.locator("button:visible");


    const hiddenButton =
        page.locator("button").filter({
            visible: false
        });



    // ========================================================================
    // 39. IFRAME
    // ========================================================================
    //
    // Use frameLocator() when the element is inside an iframe.
    //
    // ========================================================================

    const paymentFrame =
        page.frameLocator("#payment-frame");

    const cardNumber =
        paymentFrame.getByLabel("Card number");

    // await cardNumber.fill("4111111111111111");



    // ========================================================================
    // 40. NESTED IFRAMES
    // ========================================================================

    const nestedFrame =
        page
            .frameLocator("#outer-frame")
            .frameLocator("#inner-frame");

    const nestedButton =
        nestedFrame.getByRole("button", {
            name: "Submit"
        });

    // await nestedButton.click();



    // ========================================================================
    // 41. SHADOW DOM
    // ========================================================================
    //
    // Playwright locators can pierce open Shadow DOM.
    //
    // Example:
    //
    // <my-component>
    //     #shadow-root
    //         <button>Details</button>
    //
    // ========================================================================

    const shadowButton =
        page.getByRole("button", {
            name: "Details"
        });

    // await shadowButton.click();
    //
    // This can work for open Shadow DOM.
    //
    // XPath does not pierce Shadow DOM.
    // Closed Shadow DOM cannot be accessed this way.



    // ========================================================================
    // 42. SVG
    // ========================================================================

    const svg =
        page.locator("svg");

    const path =
        page.locator("svg path");

    const circle =
        page.locator("svg circle");



    // ========================================================================
    // 43. DYNAMIC ID
    // ========================================================================
    //
    // BAD:
    //
    // #user_847362
    //
    // if the ID changes every execution.
    //
    // ========================================================================

    const stableName =
        page.locator('[name="username"]');

    const stableTestId =
        page.getByTestId("username");

    const stableLabel =
        page.getByLabel("Username");



    // ========================================================================
    // 44. DYNAMIC CLASS
    // ========================================================================
    //
    // BAD:
    //
    // .button_8h73k
    //
    // if the class is generated dynamically.
    //
    // Prefer:
    //
    // role
    // label
    // text
    // testid
    // stable attribute
    //
    // ========================================================================



    // ========================================================================
    // 45. textContent()
    // ========================================================================
    //
    // IMPORTANT:
    //
    // textContent() is NOT a locator.
    //
    // locator() / getByText()
    //     -> finds an element
    //
    // textContent()
    //     -> reads text from the element
    //
    // ========================================================================

    const message =
        page.locator("#message");

    const text =
        await message.textContent();

    console.log("Text:", text);



    // ========================================================================
    // 46. innerText()
    // ========================================================================
    //
    // Reads rendered text.
    //
    // ========================================================================

    const visibleText =
        await message.innerText();

    console.log(
        "Visible text:",
        visibleText
    );



    // ========================================================================
    // 47. textContent() vs innerText()
    // ========================================================================
    //
    // textContent()
    //     -> DOM text content
    //
    // innerText()
    //     -> rendered/visible text behavior
    //
    // For test verification, prefer web-first assertions where appropriate:
    //
    // await expect(locator).toHaveText("Success");
    //
    // ========================================================================



    // ========================================================================
    // 48. toHaveText() - WEB-FIRST ASSERTION
    // ========================================================================
    //
    // This is different from textContent().
    //
    // toHaveText() retries until the expected text appears
    // or the assertion timeout is reached.
    //
    // ========================================================================

    // await expect(message)
    //     .toHaveText("Login successful");



    // ========================================================================
    // 49. toBeVisible()
    // ========================================================================

    // await expect(username)
    //     .toBeVisible();



    // ========================================================================
    // 50. toBeEnabled()
    // ========================================================================

    // await expect(loginButton)
    //     .toBeEnabled();



    // ========================================================================
    // 51. toBeDisabled()
    // ========================================================================

    // await expect(loginButton)
    //     .toBeDisabled();



    // ========================================================================
    // 52. toBeChecked()
    // ========================================================================

    // await expect(rememberMe)
    //     .toBeChecked();



    // ========================================================================
    // 53. toHaveValue()
    // ========================================================================

    // await expect(username)
    //     .toHaveValue("Ganesh");



    // ========================================================================
    // 54. toHaveURL()
    // ========================================================================
    //
    // Page/browser URL.
    //
    // ========================================================================

    // await expect(page)
    //     .toHaveURL(/dashboard/);



    // ========================================================================
    // 55. PAGE TITLE vs getByTitle()
    // ========================================================================
    //
    // Browser/page title:
    //
    // <title>My Application</title>
    //
    // Use:
    //
    // await page.title();
    //
    // OR:
    //
    // await expect(page).toHaveTitle("My Application");
    //
    //
    // Element title:
    //
    // <button title="Delete">X</button>
    //
    // Use:
    //
    // page.getByTitle("Delete");
    //
    // ========================================================================



    // ========================================================================
    // 56. FIRST vs NTH
    // ========================================================================
    //
    // first()
    //     -> first matching element
    //
    // last()
    //     -> last matching element
    //
    // nth(0)
    //     -> first
    //
    // nth(1)
    //     -> second
    //
    // nth(2)
    //     -> third
    //
    //
    // IMPORTANT:
    //
    // They are position-based.
    //
    // They can become fragile if DOM order changes.
    //
    // Use them when position is part of the requirement.
    //
    // Example:
    //
    // "Click the first search result."
    //
    //     results.first().click();
    //
    // Example:
    //
    // "Select the third column."
    //
    //     cells.nth(2)
    //
    // ========================================================================



    // ========================================================================
    // 57. POSITION vs UNIQUE LOCATOR
    // ========================================================================
    //
    // LESS STABLE:
    //
    // page.getByRole("button").nth(2)
    //
    //
    // MORE DESCRIPTIVE:
    //
    // page.getByRole("button", {
    //     name: "Delete"
    // });
    //
    //
    // EVEN BETTER WHEN THERE ARE MULTIPLE DELETE BUTTONS:
    //
    // page
    //     .getByRole("row")
    //     .filter({ hasText: "Ganesh" })
    //     .getByRole("button", { name: "Delete" });
    //
    // ========================================================================



    // ========================================================================
    // 58. LOCATOR DECISION TREE
    // ========================================================================
    //
    // When you need an element:
    //
    // 1. Can I identify it by role?
    //
    //      getByRole()
    //
    // 2. Can I identify it by label?
    //
    //      getByLabel()
    //
    // 3. Can I identify it by meaningful text?
    //
    //      getByText()
    //
    // 4. Can I identify it by placeholder?
    //
    //      getByPlaceholder()
    //
    // 5. Is there a stable test ID?
    //
    //      getByTestId()
    //
    // 6. Is there a useful title / alt text?
    //
    //      getByTitle()
    //      getByAltText()
    //
    // 7. Can CSS identify it reliably?
    //
    //      locator("...")
    //
    // 8. Do I need complex DOM relationships?
    //
    //      XPath / chaining / filter()
    //
    // 9. Are there multiple matches?
    //
    //      First try to make the locator unique:
    //
    //      filter()
    //      has()
    //      hasText()
    //      chaining
    //      and()
    //
    // 10. Is position genuinely part of the requirement?
    //
    //      first()
    //      last()
    //      nth()
    //
    // ========================================================================



    // ========================================================================
    // 59. EXPERT LOCATOR PATTERN
    // ========================================================================
    //
    // Real-world example:
    //
    // Find Samsung product card
    //     ↓
    // Confirm it is In Stock
    //     ↓
    // Click Add to Cart
    //
    // ========================================================================

    const samsung =
        page
            .getByRole("article")
            .filter({
                has: page.getByRole("heading", {
                    name: "Samsung"
                })
            })
            .filter({
                hasText: "In Stock"
            });

    const samsungCart =
        samsung.getByRole("button", {
            name: "Add to Cart"
        });

    // await samsungCart.click();



    // ========================================================================
    // 60. EXPERT LOCATOR DEBUGGING
    // ========================================================================
    //
    // When a locator fails, don't immediately increase timeout.
    //
    // Ask:
    //
    // 1. Does the locator find anything?
    //
    //      await locator.count();
    //
    // 2. Does it find multiple elements?
    //
    // 3. Is the locator unique?
    //
    // 4. Is the element visible?
    //
    // 5. Is it enabled?
    //
    // 6. Is another element covering it?
    //
    // 7. Is it inside an iframe?
    //
    // 8. Is it inside Shadow DOM?
    //
    // 9. Did React/Angular/Vue re-render it?
    //
    // 10. Is the text actually different?
    //
    // 11. Is there a popup/overlay?
    //
    // 12. Is the locator scoped to the correct row/card/dialog?
    //
    // ========================================================================



    // ========================================================================
    // 61. COUNT + DEBUG
    // ========================================================================

    const deleteButtons =
        page.getByRole("button", {
            name: "Delete"
        });

    console.log(
        "Delete button count:",
        await deleteButtons.count()
    );



    // ========================================================================
    // 62. CODEGEN
    // ========================================================================
    //
    // Playwright can generate locators:
    //
    // npx playwright codegen https://example.com
    //
    // IMPORTANT:
    //
    // Do not blindly copy generated locators.
    //
    // Use Codegen to discover possible locators.
    // Then understand whether the locator is stable and meaningful.
    //
    // ========================================================================



    // ========================================================================
    // 63. LOCATOR STABILITY
    // ========================================================================
    //
    // GENERALLY PREFER:
    //
    // getByRole()
    // getByLabel()
    // getByText()
    // getByPlaceholder()
    // getByTestId()
    // getByAltText()
    // getByTitle()
    //
    // THEN:
    //
    // locator() with stable CSS
    //
    // THEN:
    //
    // XPath when genuinely useful
    //
    //
    // IMPORTANT:
    //
    // There is no universal rule that one locator is ALWAYS best.
    //
    // Choose the locator that is:
    //
    // 1. Unique
    // 2. Stable
    // 3. Meaningful
    // 4. Closely related to the application's UI contract
    //
    // ========================================================================



    // ========================================================================
    // 64. BAD vs GOOD
    // ========================================================================

    // BAD:
    //
    // await page.getByRole("button").nth(3).click();
    //
    // Why?
    // Depends on position.


    // GOOD:
    //
    // await page.getByRole("button", {
    //     name: "Delete"
    // }).click();


    // BETTER WHEN MULTIPLE DELETE BUTTONS EXIST:
    //
    // await page
    //     .getByRole("row")
    //     .filter({ hasText: "Ganesh" })
    //     .getByRole("button", { name: "Delete" })
    //     .click();



    // ========================================================================
    // 65. BAD vs GOOD - WAITING
    // ========================================================================

    // BAD:
    //
    // await page.waitForTimeout(5000);
    // await page.locator("#username").fill("Ganesh");


    // Usually unnecessary:
    //
    // await page.waitForSelector("#username");


    // Better:
    //
    // await page.locator("#username").fill("Ganesh");
    //
    // Playwright automatically waits for the action to become actionable.


    // If you explicitly need to wait for visibility:
    //
    // await page.locator("#username").waitFor({
    //     state: "visible",
    //     timeout: 10000
    // });


    // Or for a test assertion:
    //
    // await expect(page.locator("#username"))
    //     .toBeVisible();



    // ========================================================================
    // 66. FINAL LOCATOR MINDSET
    // ========================================================================
    //
    // DON'T THINK:
    //
    // "Which XPath should I memorize?"
    //
    //
    // THINK:
    //
    // "What is this element?"
    //
    //      ↓
    //
    // "What does the user see?"
    //
    //      ↓
    //
    // "What makes this element unique?"
    //
    //      ↓
    //
    // "Can I scope it to its row/card/dialog/section?"
    //
    //      ↓
    //
    // "Can I use role/label/text/test-id?"
    //
    //      ↓
    //
    // "If not, can CSS solve it?"
    //
    //      ↓
    //
    // "If necessary, can XPath express the relationship?"
    //
    // ========================================================================

});


// ============================================================================
// MASTER LOCATOR SUMMARY
// ============================================================================
//
// BASIC PLAYWRIGHT LOCATORS
//
// getByRole()
// getByText()
// getByLabel()
// getByPlaceholder()
// getByAltText()
// getByTitle()
// getByTestId()
//
//
// GENERIC LOCATOR
//
// locator()
//
//
// LOCATOR FILTERING
//
// filter({ hasText })
// filter({ has })
// filter({ hasNot })
// filter({ hasNotText })
//
//
// LOCATOR COLLECTIONS
//
// count()
// first()
// last()
// nth()
//
//
// LOCATOR COMPOSITION
//
// and()
// or()
//
//
// CSS
//
// #id
// .class
// tag
// [attribute=value]
// [attribute*=value]
// [attribute^=value]
// [attribute$=value]
// >
// +
// ~
// :has()
// :has-text()
// :visible()
// :nth-match()
//
//
// XPATH
//
// attributes
// text()
// contains()
// parent
// ancestor
// child
// descendant
// sibling
// and
// or
// union
//
//
// REAL APPLICATIONS
//
// Forms
// Tables
// Product cards
// Dropdowns
// Autocomplete
// Calendar
// Date range
// Modal/Dialog
// Toast
// Pagination
// Iframe
// Nested iframe
// Shadow DOM
// SVG
// Dynamic IDs
// Dynamic classes
// React/Angular/Vue re-rendering
//
//
// ASSERTIONS
//
// toBeVisible()
// toBeHidden()
// toBeEnabled()
// toBeDisabled()
// toBeChecked()
// toHaveText()
// toHaveValue()
// toHaveURL()
// toHaveTitle()
//
//
// TEXT EXTRACTION
//
// textContent()
// innerText()
//
//
// IMPORTANT RULES
//
// 1. Prefer meaningful/user-facing locators.
// 2. Make locators unique.
// 3. Scope locators to the correct container.
// 4. Use filter(), has(), hasText() heavily.
// 5. Use first()/last()/nth() when position is intentional.
// 6. Don't use nth() just to hide a duplicate locator.
// 7. Don't confuse getByTitle() with page.title().
// 8. getByText() finds; textContent() reads.
// 9. toHaveText() verifies and retries.
// 10. Don't use waitForTimeout() as normal synchronization.
// 11. Don't increase timeout to fix a bad locator.
// 12. Use XPath when it provides a real advantage, not by default.
//
// ============================================================================
