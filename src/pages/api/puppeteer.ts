// src/pages/api/puppeteer.ts

import fs from 'fs';
import validURL from 'valid-url';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import setupBrowser from '../../utils/setupBrowser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const method = req.method;

    try {
        switch (method) {

            case "GET": {
                const url = req.query?.url;

                /**
                 * Check if the URL is valid
                 */
                if (!url || typeof url !== "string" || !validURL.isUri(url)) return res.status(400).json({ msg: "URL is required" });

                // Create the puppeteer instance
                const { browser, page } = await setupBrowser();

                // Navigate to the URL
                await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

                // Generate a random filename to make sure Next.js Image component doesn't cache the image
                const filename = randomUUID();

                // Create the screenshot folder if it doesn't exist
                const folderPath = `./public/screenshots`;
                if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

                // Store the filepath to a variable
                const filePath = `${folderPath}/${filename}.jpeg`;

                // Take the screenshot
                await page.screenshot({
                    path: filePath,
                    quality: 100,
                    type: "jpeg",
                    // You can also use fullPage: true
                    fullPage: false,
                });

                // Close the browser after taking the screenshot
                await browser.close();

                // Return the response of the screenshot URL
                return res.send({ data: filePath.replace("./public", "") });
            }

            default:
                // Method not allowed
                return res.status(405).send({ msg: "Method Not Allowed!" });
        }
    } catch (error: any) {
        // Handler error;
        console.error(error.message);

        // Never send the error message to the client. It's a security risk.
        return res.status(500).send({ msg: "An error occured. Please try again!", error: error.message });
    }

}