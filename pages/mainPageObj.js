const { info, error } = require('../utils/logger');

const mainPageObj = {
    get_links: async function (browser, url) {
        let page = await browser.newPage();
        info('\x1b[33m%s\x1b[0m', `Navigating to ${url}`);
        await page.goto(url);
        let urls = await page.$$eval('ul > li', links => {
            links = links.map(el => el.querySelector('a').href);
            return links;
        });
    return urls;
    },
};

module.exports = { mainPageObj };