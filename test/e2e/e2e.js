const puppeteer = require('puppeteer');
const express = require('express');
const prpl = require('prpl-server');
const expect = require('chai').expect;
const news_items = require('../../mock-api/data/news');
const events_items = require('../../mock-api/data/events');

const appPort = 4444;
const appUrl = `http://localhost:${appPort}`;

let listener;
before(async function() {
    let server = express();
    // Gotcha: build path is relative to the working directory, require is relative to this file
    server.get('/*', prpl.makeHandler('./build', require('../../build/polymer.json')));
    listener = server.listen(appPort);
});
after(() => listener.close());

describe('news view', function()  {
    let browser, page;

    beforeEach(async function() {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080});
        await page.setRequestInterception(true);
        page.on('request', req => {
            if (req.url().endsWith('/news.json')) {
                req.respond({
                    headers: {'Access-Control-Allow-Origin': '*'},
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(news_items)
                });
            } else {
                req.continue();
            }
        });
        await page.goto(`${appUrl}/news`, {waitUntil: ['domcontentloaded', 'networkidle0']});
    });
    afterEach(() => browser.close());

    it('loads all items', async function() {
        let app = await page.$('duttweiler-app');
        const cardCount = await page.evaluate((app) => {
            let view = app.shadowRoot.querySelector('news-view');
            let cards = view.shadowRoot.querySelectorAll('paper-card');
            return cards.length;
        }, app);

        expect(cardCount).to.equal(news_items.length, 'card count does not equal item count');
    });

});

describe('events view', function()  {
    let browser, page;

    beforeEach(async function() {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080});
        await page.setRequestInterception(true);
        page.on('request', req => {
            if (req.url().endsWith('/events.json')) {
                req.respond({
                    headers: {'Access-Control-Allow-Origin': '*'},
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(events_items)
                });
            } else {
                req.continue();
            }
        });
        await page.goto(`${appUrl}/events`, {waitUntil: ['domcontentloaded', 'networkidle0']});
    });
    afterEach(() => browser.close());

    it('loads all items', async function() {
        let app = await page.$('duttweiler-app');
        const cardCount = await page.evaluate((app) => {
            let view = app.shadowRoot.querySelector('events-view');
            let cards = view.shadowRoot.querySelectorAll('paper-card');
            return cards.length;
        }, app);

        expect(cardCount).to.equal(events_items.length, 'card count does not equal item count');
    });

});
