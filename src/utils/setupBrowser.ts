// src/utils/setupBrowser.ts

import chromium from 'chrome-aws-lambda';

// @ts-ignore
import puppeteer from 'puppeteer-core';

async function setupBrowser() {
    const options = process.env.AWS_REGION
        ? {
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless
        }
        : {
            args: [],
            executablePath:
                process.platform === 'win32'
                    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
                    : process.platform === 'linux'
                        ? '/usr/bin/google-chrome'
                        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        };

    // Create the browser instance
    const browser = await puppeteer.launch(options);

    // Use built-in page from the browser instance
    const page = (await browser.pages())[0];

    // Set the viewport of the page to 1920x1080. To make sure the screenshot is full HD
    await page.setViewport({ width: 1920, height: 1080 });

    // Return the browser and page instance
    return { page, browser }
}

export default setupBrowser