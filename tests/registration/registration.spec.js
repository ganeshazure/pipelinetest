
const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../../pages/registration.page');
const logger = require("../../utils/logger");

test('User Registration', async ({ page }) => {
  const register = new RegisterPage(page);
  logger.info("Opening register page");
  await register.open();
  logger.info("User enters details");
  await register.registerUser();
    logger.info("Test completed");
  await expect(page.locator('h1')).toHaveText('Your Account Has Been Created!');
});
