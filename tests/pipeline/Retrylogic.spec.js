const { test, expect } = require('@playwright/test');
test('Flaky demo @flaky', async ({ page }, testInfo) => {
  console.log('Retry:', testInfo.retry);

  if (testInfo.retry === 0) {
    throw new Error('Failing first time');
  }

  console.log('Passing on retry');
});