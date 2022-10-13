const { info, error } = require('../utils/logger');

const productPageObj = {
    get_data: (browser, url) => new Promise(async(resolve, reject) => {
        let dataObj = {};
        let newPage = await browser.newPage();
        info('\x1b[33m%s\x1b[0m', `Navigating to ${url}`);
        await newPage.goto(url);
        dataObj['category'] = await newPage.$eval('h2', text => text.textContent);
        dataObj['name'] = await newPage.$eval('h1', text => text.textContent);
        dataObj['price'] = await newPage.$eval('.price', text => text.textContent);
        dataObj['link'] = url;
        dataObj['created'] = new Date().toUTCString();
        dataObj['updated'] = new Date().toUTCString();
        resolve(dataObj);
        await newPage.close();
    }),
};

module.exports = { productPageObj };