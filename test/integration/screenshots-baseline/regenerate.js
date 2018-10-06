/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

const puppeteer = require('puppeteer');
const {startServer} = require('polyserve');
const path = require('path');
const fs = require('fs');
const baselineDir = `${process.cwd()}/test/integration/screenshots-baseline`;

describe('🎁 regenerate screenshots', function() {
  let polyserve, browser, page;

  before(async function() {
    polyserve = await startServer({port:4444, root:path.join(__dirname, '../../..'), moduleResolution:'node'});

    // Create the test directory if needed.
    if (!fs.existsSync(baselineDir)){
      fs.mkdirSync(baselineDir);
    }
    // And it's subdirectories.
    if (!fs.existsSync(`${baselineDir}/desktop`)){
      fs.mkdirSync(`${baselineDir}/desktop`);
    }
    if (!fs.existsSync(`${baselineDir}/wide`)){
      fs.mkdirSync(`${baselineDir}/wide`);
    }
    if (!fs.existsSync(`${baselineDir}/narrow`)){
      fs.mkdirSync(`${baselineDir}/narrow`);
    }
  });

  after((done) => polyserve.close(done));

  beforeEach(async function() {
    browser = await puppeteer.launch({slowMo: true, args: ['--no-sandbox']});
    page = await browser.newPage();
  });

  afterEach(() => browser.close());

  it('did it', async function() {
    return generateBaselineScreenshots(page);
  });
});

async function generateBaselineScreenshots(page) {
  const breakpoints = [
      {width: 1920, height: 1080},
      {width: 800, height: 600},
      {width: 375, height: 667}];
  const prefixes = ['desktop', 'wide', 'narrow'];

  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    console.log(prefix + '...');
    page.setViewport(breakpoints[i]);
    // Index.
    await page.goto('http://localhost:4444/', {waitUntil: ['load', 'networkidle0']});
    await page.screenshot({fullPage: true, path: `${baselineDir}/${prefix}/index.png`});
    // Views.
    await page.goto(`http://localhost:4444/news`, {waitUntil: ['load', 'networkidle0']});
    await page.screenshot({fullPage: true, path: `${baselineDir}/${prefix}/news.png`});
    
    await page.goto(`http://localhost:4444/events`, {waitUntil: ['load', 'networkidle0']});
    await page.screenshot({fullPage: true, path: `${baselineDir}/${prefix}/events.png`});
    
    await page.goto(`http://localhost:4444/about`, {waitUntil: ['load', 'networkidle0']});
    await page.screenshot({fullPage: true, path: `${baselineDir}/${prefix}/about.png`});
    // 404.
    await page.goto('http://localhost:4444/batmanNotAView', {waitUntil: ['load', 'networkidle0']});
    await page.screenshot({fullPage: true, path: `${baselineDir}/${prefix}/batmanNotAView.png`});
  }
}
