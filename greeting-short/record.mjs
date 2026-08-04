import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'output');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: outDir, size: { width: 1280, height: 720 } },
});
const page = await context.newPage();
await page.goto('file://' + path.join(__dirname, 'index.html'));

const totalDuration = await page.evaluate(() => window.TOTAL_DURATION);
await page.waitForFunction(() => window.__ANIME_DONE__ === true, null, {
  timeout: totalDuration + 10000,
});
await page.waitForTimeout(300);

const video = page.video();
await context.close();
await browser.close();

const videoPath = await video.path();
console.log('RAW_VIDEO=' + videoPath);
