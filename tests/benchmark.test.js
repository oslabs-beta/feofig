// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');
const regeneratorRuntime = require('regenerator-runtime');
// const chromeHar = require('chrome-har')


const APP = `http://localhost:${process.env.PORT || 8080}/`;

// // (async () => {
// //   // Launch the browser and open a new blank page
// //   const browser = await puppeteer.launch();
// //   const page = await browser.newPage();

// //   // Navigate the page to a URL
// //   await page.goto('https://developer.chrome.com/');

// //   // Set screen size
// //   await page.setViewport({width: 1080, height: 1024});

// //   // Type into search box
// //   await page.type('.search-box__input', 'automate beyond recorder');

// //   // Wait and click on first result
// //   const searchResultSelector = '.search-box__link';
// //   await page.waitForSelector(searchResultSelector);
// //   await page.click(searchResultSelector);

// //   // Locate the full title with a unique string
// //   const textSelector = await page.waitForSelector(
// //     'text/Customize and automate'
// //   );
// //   const fullTitle = await textSelector?.evaluate(el => el.textContent);

// //   // Print the full title
// //   console.log('The title of this blog post is "%s".', fullTitle);

// //   await browser.close();
// // })();

// // describe('Front-end Integration/Features', () => {
// //     let browser;
// //     let page;

// //     beforeAll(async () => {
// //       browser = await puppeteer.launch({
// //         args: ['--no-sandbox', '--disable-setuid-sandbox'],
// //         headless: 'new',
// //       });
// //       page = await browser.newPage();
// //     });

// //     afterAll(() => {
// //       browser.close();
// //     });

// //     describe('Initial display', () => {
// //       it('loads successfully', async () => {
// //         // We navigate to the page at the beginning of each case so we have a
// //         // fresh start
// //         await page.goto(APP);
// //         await page.waitForSelector('#header');
// //         const title = await page.$eval('#header', el => el.innerHTML);
// //         expect(title).toBe('MegaMarket Loyalty Cards');
// //       });

// //       it('displays a usable input field for locations', async () => {
// //         await page.goto(APP);
// //         await page.waitForSelector('#new-location');
// //         await page.focus('#new-location');
// //         await page.keyboard.type('Tallahassee');
// //         const inputValue = await page.$eval('#new-location', el => el.value);
// //         expect(inputValue).toBe('Tallahassee');
// //       });

// //       // TODO: Finish tests

// //       xit('renders the MarketsDisplay section', () => {
// //       });

// //       xit('renders the TotalsDisplay area', () => {
// //       });
// //     });

// //     describe('State interactions', () => {
// //       xit('can add a new market', () => {
// //       });

// //       xit('can add and remove cards', () => {
// //       });

// //       xit('cannot delete cards from a market with zero cards', () => {
// //       });
// //     });

// //     describe('Server interactions', () => {
// //       // TODO: You'll need to require in and query the test DB in order to ensure
// //       // that the right items show up. You may find it's easiest to start each
// //       // test with a fresh DB.
// //       xit('loads all markets from database on pageload', () => {
// //       });

// //       xit('maintains synced state after refresh', () => {
// //         // First you'll need to make something to sync!
// //       });
// //     });
// //   });

// describe('FeoFig', () => {
//   beforeAll(async () => {
//     await page.goto(APP);
//   });

//   it('should be titled "FeoFig"', async () => {
//     // console.log(await page.metrics());
//     await page.tracing.start({ path: 'trace.json' });
//     await page.goto(APP);
//     await page.tracing.stop();
//     await expect(page.title()).resolves.toMatch('FeoFig');
//   });
// });

async function run() {
  // const browser = await puppeteer.launch({
  //     headless: false,
  //     defaultViewport: null
  // });

  // const page = await browser.newPage();
  // await page.goto("https://stackoverflow.com/questions/30455964/what-does-window-performance-getentries-mean");

  // let performanceTiming = JSON.parse(
  //     await page.evaluate(() => JSON.stringify(window.performance.getEntries()))
  // );

  // console.log(performanceTiming);

  //   const browser =  await puppeteer.launch({ headless: true});
  //   const page = await browser.newPage();
  //   await page.tracing.start({ categories: ['devtools.timeline'], path: "./tracing.json" });
  //   await page.goto("https://stackoverflow.com/questions/30455964/what-does-window-performance-getentries-mean");
  //   var tracing = JSON.parse(await page.tracing.stop());
  // console.log(tracing.traceEvents.filter(te => te.name ==="ResourceSendRequest"))
  // console.log(tracing.traceEvents.filter(te => te.name ==="ResourceReceiveResponse"))

  // const browser = await puppeteer.launch({
  //     headless: 'new',
  //     devtools: true,
  // });
  //   const page = await browser.newPage();
  //   await page.goto(APP);

  //===============================================================================

  // launch in headless mode & create a new page
  // const browser = await puppeteer.launch({
  //   headless: false,
  // });
  // const page = await browser.newPage();

  // // attach cdp session to page
  // const client = await page.target().createCDPSession();
  // await client.send('Debugger.enable');
  // await client.send('Debugger.setAsyncCallStackDepth', { maxDepth: 32 });

  // // enable network
  // await client.send('Network.enable');
  // // attach callback to network response event
  // await client.on('Network.responseReceived', (params) => {
  //   const { response: { timing } } = params;
  //   /*
  //    * See: https://chromedevtools.github.io/devtools-protocol
  //    * /tot/Network/#type-ResourceTiming for complete list of
  //    * timing data available under 'timing'
  //    */
  //   console.log(timing);
  // });

  // await page.goto('https://www.ted.com/', {
  //   waitUntil: 'networkidle2',
  // });

  // // cleanup
  // await browser.close();

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  // Create a raw DevTools protocol session to talk to the page.
  // Use CDP to set the animation playback rate.
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  await client.send('Page.enable');
  await client.send('Performance.enable');
  // await page.setRequestInterception(true);

  // Emulate 3G network conditions
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 40,
    downloadThroughput: (750 * 1024) / 8,
    uploadThroughput: (250 * 1024) / 8,
    connectionType: 'cellular3g',
  });

      // // Emulate developer's network conditions
      // await client.send('Network.emulateNetworkConditions', {
      //   offline: false,
      //   latency: 0,
      //   downloadThroughput: -1, // disables download throttling
      //   uploadThroughput: -1, // disables upload throttling
      // });
  

    // // Emulate 4G network conditions
    // await client.send('Network.emulateNetworkConditions', {
    //   offline: false,
    //   latency: 20,
    //   downloadThroughput: 10 * 1024 * 1024 / 8, // Adjusted for 4G (10 Mbps)
    //   uploadThroughput: 5 * 1024 * 1024 / 8,    // Adjusted for 4G (5 Mbps)
    //   connectionType: 'cellular4g',
    // });

  // // Emulate 2G network conditions
  // await client.send('Network.emulateNetworkConditions', {
  //   offline: false,
  //   latency: 300,
  //   downloadThroughput: (50 * 1024) / 8, // Adjusted for 2G
  //   uploadThroughput: (20 * 1024) / 8, // Adjusted for 2G
  //   connectionType: 'cellular2g',
  // });

  // page.on('request', (request) => {
  //   request.continue();
  // });

  // const harEntries = [];

  // page.on('response', (response) => {
  //   console.log('time: ', response.timing())
  //   const harEntry = {
  //     request: {
  //       method: response.request().method(),
  //       url: response.url(),
  //       headers: response.request().headers(),
  //       postData: response.request().postData(),
  //     },
  //     response: {
  //       status: response.status(),
  //       statusText: response.statusText(),
  //       headers: response.headers(),
  //       content: {
  //         mimeType: response.headers()['content-type'],
  //         text: response.text(),
  //       },
  //     },
  //     timings: response.timing(),
  //   };

  //   harEntries.push(harEntry);
  // });

  const requests = [];
  // const responses = [];
  const loadingFinished = [];

  await client.on('Network.requestWillBeSent', (request) => {
    requests.push(request);
  });


  // await client.on('Network.responseReceived', (response) => {
  //   responses.push(response);
  // });


  await client.on('Network.loadingFinished', (loaded) => {
    loadingFinished.push(loaded);
    // console.log(loadingFinished)
  });


  // await client.on('Network.responseReceived', (params) => {
  //   console.log(params)
  // });



//==================================================================
  const startTime = Date.now();
  
  await page.goto(APP, {
    waitUntil: 'networkidle2',
  });
  await page.waitForTimeout(5000);
  // const performanceTiming = JSON.parse(
  //   await page.evaluate(() => JSON.stringify(window.performance.timing))
  // );
  // console.log(performanceTiming);
  // console.log('domcontentloaded: ', performanceTiming.loadEventEnd - performanceTiming.navigationStart)

  // console.log(harEntries)
  
  // const metrics = await client.send('Performance.getMetrics', ['duration']);
  // // Find the "load" event and extract the relevant timestamp
  // console.log(metrics)


  // // Log the total load time
  // console.log('Total Load Time:', metrics, 'milliseconds');
 

  const endTime = Date.now();
  const totalLoadTime = endTime - startTime;
  console.log(totalLoadTime)
//============================================================================

 


  // await client.send('Page.reload', {
  //   ignoreCache: true,
  // });


  // // Disable network emulation when done
  // await client.send('Network.emulateNetworkConditions', {
  //   offline: false,
  //   latency: -1,
  //   downloadThroughput: -1,
  //   uploadThroughput: -1,
  //   connectionType: 'cellular4g',
  // });

  // const har = new PuppeteerHar(page);
  // await har.start({ path: 'results.har' });

  // await page.goto(APP, {
  //     waitUntil: 'networkidle2',
  //   });

  // await har.stop();
  // await browser.close();


  // console.log(requests[0].timestamp)

  // console.log(responses[responses.length - 1].timestamp);

  // console.log(responses[responses.length - 1].timestamp - requests[0].timestamp)
  // console.log(loadingFinished[loadingFinished.length - 1].timestamp - loadingFinished[0].timestamp)
  console.log(loadingFinished[loadingFinished.length - 1].timestamp - requests[0].timestamp)
}

run();
