// playwright.config.js
// @ts-check

// Read from default ".env" file.
const dotenv = require('dotenv');
dotenv.config();

// Alternatively, read from "../my.env" file.
//dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  timeout: 2400000,
  use: {
    baseURL: process.env.APEX_FRONTEND_URL,
    //video: 'on',
    //channel: "chrome",
    launchOptions: {
      // force GPU hardware acceleration
      // (even in headless mode)
      args: ["--use-gl=egl", "--ignore-gpu-blocklist",]
    }
  }
};

module.exports = config;