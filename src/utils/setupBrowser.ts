// src/utils/setupBrowser.ts

import { LaunchOptions } from 'puppeteer';

// Puppeteer extra is a wrapper around puppeteer,
import puppeteer from 'puppeteer-extra';

// Stealth plugin to make puppeteer look like a real browser
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Use the plugin
puppeteer.use(StealthPlugin());

async function setupBrowser(options?: LaunchOptions) {
    // Create the browser instance
    const browser = await puppeteer.launch({
        ...options,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--window-size=1920,1080"
        ],
        headless: true
    });

    // Use built-in page from the browser instance
    const page = (await browser.pages())[0];

    // Set the viewport of the page to 1920x1080. To make sure the screenshot is full HD
    await page.setViewport({ width: 1920, height: 1080 });

    // Return the browser and page instance
    return { page, browser }
}

export default setupBrowser