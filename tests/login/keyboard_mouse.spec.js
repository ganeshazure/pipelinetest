import { test, expect } from '@playwright/test';

test('Playwright Keyboard & Mouse Actions Cheat Sheet', async ({ page }) => {

  await page.goto('https://example.com');

  const input = page.locator('#input');      // sample input field
  const button = page.locator('#button');    // sample button


  // =========================
  // ⌨️ KEYBOARD ACTIONS
  // =========================

  await input.click();
  // Focus on input field before typing

  await page.keyboard.type('Hello World');
  // Types text like real user (slower, char by char)

  await page.keyboard.press('Enter');
  // Press Enter key

  await page.keyboard.press('Tab');
  // Move to next focusable element

  await page.keyboard.press('Escape');
  // Press Escape key

  await page.keyboard.press('Backspace');
  // Delete one character

  await page.keyboard.press('Delete');
  // Delete forward character

  await page.keyboard.down('Shift');
  // Hold Shift key down

  await page.keyboard.press('KeyA');
  // Press A while Shift is held (for uppercase/select actions)

  await page.keyboard.up('Shift');
  // Release Shift key

  await page.keyboard.press('Control+A');
  // Select all text (Windows/Linux)

  await page.keyboard.press('Control+C');
  // Copy selected text

  await page.keyboard.press('Control+V');
  // Paste text

  await page.keyboard.press('Control+X');
  // Cut text

  await page.keyboard.press('ArrowLeft');
  // Move cursor left

  await page.keyboard.press('ArrowRight');
  // Move cursor right

  await page.keyboard.press('ArrowUp');
  // Move up (useful in dropdowns)

  await page.keyboard.press('ArrowDown');
  // Move down (dropdown navigation)


  // =========================
  // 🖱️ MOUSE ACTIONS
  // =========================

  await button.click();
  // Single click

  await button.dblclick();
  // Double click

  await button.click({ button: 'right' });
  // Right click (context menu)

  await button.click({ clickCount: 3 });
  // Triple click (selects full text usually)

  await button.hover();
  // Hover over element

  await page.mouse.move(100, 200);
  // Move mouse to specific coordinates

  await page.mouse.click(100, 200);
  // Click at coordinates

  await page.mouse.down();
  // Press mouse button down

  await page.mouse.up();
  // Release mouse button

  await page.mouse.wheel(0, 500);
  // Scroll down (vertical scroll)

  await page.mouse.wheel(0, -500);
  // Scroll up


  // =========================
  // 🧲 DRAG & DROP
  // =========================

  const source = page.locator('#drag');
  const target = page.locator('#drop');

  await source.dragTo(target);
  // Drag source element and drop into target

  // Alternative manual drag
  await source.hover();
  await page.mouse.down();
  await target.hover();
  await page.mouse.up();
  // Custom drag & drop (used for complex cases)


  // =========================
  // 🎯 ADVANCED INTERACTIONS
  // =========================

  await button.click({ force: true });
  // Click even if element is not visible/covered (use carefully)

  await button.click({ timeout: 5000 });
  // Custom timeout for click

  await button.click({ position: { x: 10, y: 10 } });
  // Click specific position inside element

  await button.hover({ force: true });
  // Force hover if needed


  // =========================
  // 🧠 BEST PRACTICE NOTES
  // =========================

  // Prefer locator.click() over page.mouse.click()
  // → More stable, auto-wait supported

  // Use keyboard actions mainly for:
  // → Forms
  // → Shortcuts
  // → Dropdown navigation

  // Avoid hard coordinates unless necessary

});