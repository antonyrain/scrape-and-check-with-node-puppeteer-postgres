const { info, error } = require('../utils/logger');
const { productPageObj } = require('../pages/productPageObj');
const { checkPrice } = require('../methods/checkPrice');

async function updateController(browserInstance, changes) {
    let browser;
    let data = [];
    try{
        browser = await browserInstance;
        if (changes === 'price') {
            data.push(await checkPrice.get_data(browser));
            await new Promise(r => setTimeout(r, 1000));
        } else {
            for(i in changes) {
                data.push(await productPageObj.get_data(browser, changes[i]));
                await new Promise(r => setTimeout(r, 1000));
            };
        };
    } catch (err) {
        error('Could not launch the browser instance', err);
    };
    return data;
};

module.exports = (browserInstance, changes) => updateController(browserInstance, changes);