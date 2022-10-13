const { info, error } = require('../utils/logger');
const puppeteer = require('puppeteer');

let browser;

async function start() {
    try {
        info('Opening the browser...');
        browser = await puppeteer.launch({
            headless: true,
	        args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true
        });
    } catch (err) {
        error(err);
    };
    return browser;
};

async function close() {
    browser.close();
    info('Browser closed!');
};

module.exports = { start, close };