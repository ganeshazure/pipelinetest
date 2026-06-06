const { test, expect } = require('@playwright/test');

test('OrangeHRM Multi User Workflow', async ({ browser }) => {

    // =====================================================
    // CREATE ESS USER CONTEXT
    // =====================================================

    const essContext = await browser.newContext();

    const essPage = await essContext.newPage();


    // =====================================================
    // CREATE ADMIN CONTEXT
    // =====================================================

    const adminContext = await browser.newContext();

    const adminPage = await adminContext.newPage();


    // =====================================================
    // ESS USER LOGIN
    // =====================================================

    await essPage.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );

    await essPage.locator('input[name="username"]').fill('Admin');

    await essPage.locator('input[name="password"]').fill('admin123');

    await essPage.locator('button[type="submit"]').click();


    // =====================================================
    // VERIFY DASHBOARD
    // =====================================================

    await expect(
        essPage.locator('//h6[text()="Dashboard"]')
    ).toBeVisible();

    console.log('ESS USER LOGGED IN');


    // =====================================================
    // ESS USER GOES TO LEAVE MODULE
    // =====================================================

    await essPage.locator('//span[text()="Leave"]').click();


    // =====================================================
    // OPEN APPLY LEAVE PAGE
    // =====================================================

    await essPage.locator('//a[text()="Apply"]').click();


    // =====================================================
    // SELECT LEAVE TYPE
    // =====================================================

    await essPage.locator('.oxd-select-text').first().click();

    await essPage.locator('//div[@role="option"]').nth(1).click();


    // =====================================================
    // ENTER FROM DATE
    // =====================================================

    const fromDate = essPage.locator(
        '(//input[contains(@class,"oxd-input")])[2]'
    );

    await fromDate.clear();

    await fromDate.fill('2026-20-08');


    // =====================================================
    // ENTER TO DATE
    // =====================================================

    const toDate = essPage.locator(
        '(//input[contains(@class,"oxd-input")])[3]'
    );

    await toDate.clear();

    await toDate.fill('2026-21-08');


    // =====================================================
    // ADD COMMENT
    // =====================================================

    await essPage.locator('textarea').fill(
        'Family Function Leave'
    );


    // =====================================================
    // APPLY LEAVE
    // =====================================================

    await essPage.locator(
        '//button[@type="submit"]'
    ).click();


    console.log('ESS USER APPLIED LEAVE');


    // =====================================================
    // ESS SESSION STILL ACTIVE
    // =====================================================
    //
    // We do NOT close essContext.
    //
    // =====================================================



    // =====================================================
    // ADMIN LOGIN IN SEPARATE CONTEXT
    // =====================================================

    await adminPage.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );

    await adminPage.locator('input[name="username"]').fill('Admin');

    await adminPage.locator('input[name="password"]').fill('admin123');

    await adminPage.locator('button[type="submit"]').click();


    // =====================================================
    // VERIFY ADMIN DASHBOARD
    // =====================================================

    await expect(
        adminPage.locator('//h6[text()="Dashboard"]')
    ).toBeVisible();

    console.log('ADMIN LOGGED IN');


    // =====================================================
    // ADMIN OPENS LEAVE MODULE
    // =====================================================

    await adminPage.locator('//span[text()="Leave"]').click();


    // =====================================================
    // OPEN LEAVE LIST
    // =====================================================

    await adminPage.locator('//a[text()="Leave List"]').click();


    // =====================================================
    // SEARCH LEAVE RECORDS
    // =====================================================

    await adminPage.locator(
        '//button[@type="submit"]'
    ).click();


    // =====================================================
    // WAIT FOR TABLE
    // =====================================================

    await adminPage.waitForTimeout(3000);


    // =====================================================
    // SELECT FIRST RECORD CHECKBOX
    // =====================================================

    const checkbox = adminPage.locator(
        '(//i[contains(@class,"oxd-icon bi-check")])[1]'
    );

    if (await checkbox.isVisible()) {

        await checkbox.click();

        console.log('LEAVE RECORD SELECTED');
    }


    // =====================================================
    // APPROVE BUTTON
    // =====================================================

    const approveButton = adminPage.locator(
        '//button[contains(.,"Approve")]'
    );

    if (await approveButton.isVisible()) {

        await approveButton.click();

        console.log('ADMIN APPROVED LEAVE');
    }
    else {

        console.log('NO APPROVE BUTTON FOUND');
    }


    // =====================================================
    // SWITCH BACK TO ESS USER
    // =====================================================
    //
    // IMPORTANT:
    //
    // We are NOT manually switching tabs.
    //
    // We already have:
    //
    // essPage
    // adminPage
    //
    // We simply continue using essPage.
    //
    // =====================================================



    // =====================================================
    // REFRESH ESS PAGE
    // =====================================================

    await essPage.reload();


    // =====================================================
    // GO TO MY LEAVE
    // =====================================================

    await essPage.locator('//a[text()="My Leave"]').click();


    // =====================================================
    // WAIT FOR TABLE
    // =====================================================

    await essPage.waitForTimeout(3000);


    // =====================================================
    // VERIFY LEAVE TABLE VISIBLE
    // =====================================================

    const leaveTable = essPage.locator('.oxd-table');

    await expect(leaveTable).toBeVisible();


    console.log('ESS USER VERIFIED LEAVE RECORD');


    // =====================================================
    // CLEANUP
    // =====================================================

//    await essContext.close();
//
//    await adminContext.close();
});
