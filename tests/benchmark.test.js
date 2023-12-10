const puppeteer = require('puppeteer');

const APP = `http://localhost:${process.env.PORT || 8080}/`;
const timeout = 10000;

const networkConditions = {
  developer: {
    offline: false,
    latency: -1,
    downloadThroughput: -1, // disables download throttling
    uploadThroughput: -1, // disables upload throttling
    connectionType: 'none',
  },
  '4g': {
    offline: false,
    latency: 20,
    downloadThroughput: (10 * 1024 * 1024) / 8, // Adjusted for 4G (1.28 Mbps)
    uploadThroughput: (5 * 1024 * 1024) / 8, // Adjusted for 4G (1.28 Mbps)
    connectionType: 'cellular4g',
  },
  '3g': {
    offline: false,
    latency: 40,
    downloadThroughput: (750 * 1024) / 8, // 750 Kilobits/sec = 93750 bytes/sec
    uploadThroughput: (250 * 1024) / 8, // 250 Kilobits/sec = 31250 bytes/sec
    connectionType: 'cellular3g',
  },
  '2g': {
    offline: false,
    latency: 300,
    downloadThroughput: (150 * 1024) / 8, // 150 Kilobits/sec = 18750 bytes/sec
    uploadThroughput: (50 * 1024) / 8, // 50 Kilobits/sec = 6250 bytes/sec
    connectionType: 'cellular2g',
  },
};

async function run(networkCondition, networkString) {
  // Start headless chrome browser
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  // Create a new page in the browser
  const page = await browser.newPage();
  // Disable cache for accurate load times
  await page.setCacheEnabled(false);

  // Create a Chrome DevTools Protocol session to talk to the page.
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  await client.send('Performance.enable');

  // Emulate network condition
  await client.send('Network.emulateNetworkConditions', networkCondition);

  const requests = [];
  const loadingFinished = [];

  client.on('Network.requestWillBeSent', (request) => {
    requests.push(request);
  });

  client.on('Network.loadingFinished', (loaded) => {
    loadingFinished.push(loaded);
  });

  // Navigate to url
  await page.goto(APP, {
    waitUntil: 'networkidle2',
  });

  const performanceMetrics = await client.send('Performance.getMetrics');
  const { metrics } = performanceMetrics;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(
        '==============================================================='
      );
      console.log(`Benchmark for: ${networkString}`);
      console.log(
        `DOMContentLoaded: ${(
          metrics[metrics.length - 2].value - metrics[metrics.length - 1].value
        ).toFixed(4)} sec`
      );
      console.log(
        `Finished: ${(
          loadingFinished[loadingFinished.length - 1].timestamp -
          requests[0].timestamp
        ).toFixed(4)} sec`
      );
    }, timeout);
  });

  // await browser.close();
}

async function benchmark() {
  console.log('Starting benchmark. This may take a few seconds. Please wait.');
  await run(networkConditions.developer, 'current network');
  await run(networkConditions['4g'], '4g');
  await run(networkConditions['3g'], '3g');
  await run(networkConditions['2g'], '2g');
  
  setTimeout(() => {
    console.log(
      '==============================================================='
    );
    console.log('Benchmark completed!');
    process.exit()
  }, timeout);

}

benchmark();
