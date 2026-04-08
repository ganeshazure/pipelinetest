<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Playwright File Handling</title>
  <style>
    #dropZone {
      width: 200px; height: 100px; border: 2px dashed #333;
      display: flex; align-items: center; justify-content: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <!-- 1. Single File Upload -->
  <h3>Single File Upload</h3>
  <input type="file" id="singleUpload">

  <!-- 2. Multiple File Upload -->
  <h3>Multiple File Upload</h3>
  <input type="file" id="multiUpload" multiple>

  <!-- 3. Drag & Drop Upload -->
  <h3>Drag & Drop Upload</h3>
  <div id="dropZone">Drop files here</div>

  <!-- 4. Download Button -->
  <h3>File Download</h3>
  <a id="downloadLink" href="sample.txt" download>Download Sample File</a>

  <!-- 5. Disabled Upload (Negative Test) -->
  <h3>Disabled Upload</h3>
  <input type="file" id="disabledUpload" disabled>

</body>
</html>
import { test, expect } from '@playwright/test';
import path from 'path';

test('Playwright File Handling Examples', async ({ page }) => {

  // Load local HTML file
  await page.goto('file://' + path.join(__dirname, 'file-handling.html'));

  // =========================
  // 1. SINGLE FILE UPLOAD
  // =========================
  const singleUpload = page.locator('#singleUpload');
  await singleUpload.setInputFiles('files/sample1.txt');
  // Upload one file
  const filesSingle = await singleUpload.evaluate(el => el.files.length);
  expect(filesSingle).toBe(1);

  // =========================
  // 2. MULTIPLE FILE UPLOAD
  // =========================
  const multiUpload = page.locator('#multiUpload');
  await multiUpload.setInputFiles([
    'files/sample1.txt',
    'files/sample2.txt'
  ]);
  const filesMulti = await multiUpload.evaluate(el => el.files.length);
  expect(filesMulti).toBe(2);

  // =========================
  // 3. DRAG & DROP FILE UPLOAD
  // =========================
  const dropZone = page.locator('#dropZone');

  await dropZone.setInputFiles([
    'files/sample1.txt',
    'files/sample2.txt'
  ]);
  // Even for drag & drop, Playwright uses setInputFiles
  const filesDrop = await dropZone.evaluate(el => el.files.length);
  expect(filesDrop).toBe(2);

  // =========================
  // 4. FILE DOWNLOAD
  // =========================
  const [download] = await Promise.all([
    page.waitForEvent('download'), // Wait for download
    page.locator('#downloadLink').click(), // Trigger download
  ]);
  const pathDownloaded = await download.path();
  console.log('Downloaded file path:', pathDownloaded);
  expect(await download.suggestedFilename()).toBe('sample.txt');

  // =========================
  // 5. DISABLED FILE UPLOAD (NEGATIVE TEST)
  // =========================
  const disabledUpload = page.locator('#disabledUpload');
  await expect(disabledUpload).toBeDisabled();
  // Cannot interact, validates negative scenario

  // =========================
  // 6. VALIDATIONS
  // =========================
  // Check first uploaded file name
  const firstFileName = await singleUpload.evaluate(el => el.files[0].name);
  expect(firstFileName).toBe('sample1.txt');

  // Check multi-upload file names
  const multiFileNames = await multiUpload.evaluate(el => Array.from(el.files).map(f => f.name));
  expect(multiFileNames).toContain('sample1.txt');
  expect(multiFileNames).toContain('sample2.txt');

});