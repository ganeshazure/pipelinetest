const { test, expect } = require('@playwright/test');

test('Mock room API', async ({ page }) => {

  await page.route('**/api/room', async route => {

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        rooms: [
          {
            accessible: true,
            description: 'Mock Room',
            features: [
              'Netflix',
              'PlayStation',
              'Mini Bar'
            ],
            image: '/images/room1.jpg',
            roomName: 'Ganesh Room',
            roomPrice: 9999,
            roomid: 1,
            type: 'Suite'
          }
        ]
      })
    });

  });

  await page.goto('https://automationintesting.online/');

  await page.pause(); // Stops execution so you can inspect UI
});