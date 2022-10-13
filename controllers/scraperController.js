const { info, error } = require('../utils/logger');
const { mainPageObj } = require('../pages/mainPageObj');
const { productPageObj } = require('../pages/productPageObj');

async function scraperController(browserInstance, url) {
    let browser;
    let links;
    let data = [];
    try{
        browser = await browserInstance;
        links = await mainPageObj.get_links(browser, url);
        for(i in links) {
            data.push(await productPageObj.get_data(browser, links[i]));
            await new Promise(r => setTimeout(r, 1000));
        };
    } catch (err) {
        error('Could not launch the browser instance', err);
    };
    return data;
};

module.exports = (browserInstance, url) => scraperController(browserInstance, url);