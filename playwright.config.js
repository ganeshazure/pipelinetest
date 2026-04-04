// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',

  reporter: [
    ['list'],
    ['allure-playwright']
  ],

 retries: 0, // global default OFF

  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },



    projects: [
      {
        name: 'normal-tests',
        testMatch: /.*\.spec\.js/,
        grepInvert: /@flaky/,
        retries: 1,
      },
      {
        name: 'flaky-tests',
        testMatch: /.*\.spec\.js/,
        grep: /@flaky/,
        retries: 2,
      }
    ]

});