
const { test, expect } = require('@playwright/test');
const logger = require("../../utils/logger");

test.describe('Login Tests', () => {
  test('valid login', async ({ page }) => {
  try
  {
  logger.info("Opening login page");
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/login');
    await page.fill('#input-email', 'testuser@gmail.com');
    await page.fill('#input-password', 'Password123');

    await expect(page).toHaveTitle(/My Accoun/);
    }
     catch (error) {

          logger.error("Login test failed: " + error.message);
          throw error;   // IMPORTANT → rethrow so test still fails

        }
  });
});
