const { test, expect } = require('@playwright/test');
const { chromium } = require("playwright");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test.skip("GPU hardware acceleration", async ({ browser }) => {
  //Step-1: Launch the browser
  browser = await chromium.launch({
    headless: process.env.HEADLESS === 'true' ? true : false,
  });

  const context = await browser.newContext();
  
  //Step-3: Create a new page
  const page = await context.newPage();

  await page.goto("chrome://gpu")
  let featureStatusList = page.locator(".feature-status-list")
  await expect(featureStatusList).toContainText("Hardware accelerated")
})

test('Spectate', async ({ browser }) => {
  //Step-1: Launch the browser
  browser = await chromium.launch({
    headless: process.env.HEADLESS === 'true' ? true : false,
  });
  //Step-2: Create a new context
  const context = await browser.newContext({
    // recordVideo: {
    //   dir: './videos/',
    // },
    recordHar: { path: './test-results/spectate.har', urlFilter: '**' }
  });
  await context.tracing.start({ screenshots: true, snapshots: true });

  //Step-3: Create a new page
  const page = await context.newPage();

  // Listen for all console logs
  page.on('console', msg => console.log(msg.text()))

  // Log and continue all network requests
  /*   await page.route('**', (route, request) => {
      console.log(request.url());
      route.continue();
    }); */



  //Step-4: Go to the URL
  await page.goto(process.env.FRONTEND_URL)

  //Step-5: Click on the button
  await page.getByRole('link', { name: 'Fight now!' }).click();
  await page.getByRole('button', { name: 'Watch a match' }).click();

  //Step-6: Fill the room id
  await page.getByPlaceholder('room id').fill(process.env.ROOM_ID);
  await page.locator('text=Watch').click();

  await delay(60000);
  await page.keyboard.type('Test message');
  await page.keyboard.press('Enter');

  await context.tracing.stop({ path: './test-results/trace.zip' });
  await context.close();

});