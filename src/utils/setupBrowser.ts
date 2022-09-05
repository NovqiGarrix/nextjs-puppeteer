// src/utils/setupBrowser.ts

import type { LaunchOptions } from 'puppeteer';
import chromium from 'chrome-aws-lambda';

async function setupBrowser(options?: LaunchOptions) {
    // Create the browser instance
    const browser = await chromium.puppeteer.launch({
        ...options,
        args: [
            ...chromium.args,
            "--hide-scrollbars", "--disable-web-security"
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true
    });

    // Use built-in page from the browser instance
    const page = (await browser.pages())[0];

    // Set the viewport of the page to 1920x1080. To make sure the screenshot is full HD
    await page.setViewport({ width: 1920, height: 1080 });

    // Return the browser and page instance
    return { page, browser }
}

export default setupBrowser