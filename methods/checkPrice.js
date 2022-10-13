const { info, error } = require('../utils/logger');
const { pool } = require('../database/connectDB');

const checkPrice = {
    get_data: (browser) => new Promise(async(resolve, reject) => {

        let db_links = [];
        let { rows } = await pool.query('SELECT link FROM data');
        for (let i in rows) {
            db_links.push(rows[i]['link']);
        };

        let newPage = await browser.newPage();

        for( let i in db_links) {
            await new Promise(r => setTimeout(r, 1000));
            info('\x1b[33m%s\x1b[0m', `Checking product price of ${db_links[i]}`);
            await newPage.goto(db_links[i]);

            let currentPrice = await newPage.$eval('.price', text => text.textContent);
            let { rows } = await pool.query(
                `SELECT price FROM data WHERE '${db_links[i]}' = link`
            );
            
            if (currentPrice !== rows[0]['price']) {
                info('\x1b[35m%s\x1b[0m', "Some product price is changed!");
                info('\x1b[32m%s\x1b[0m', 'Changes: ');
                info('Link:', db_links[i]);
                info('New price: ', currentPrice);
                info('Old price: ', rows[0]['price']);
                let date = new Date;
                info('Date-Time: ', date.toUTCString());
                await pool.query(
                    `UPDATE data SET price = ${currentPrice} WHERE '${db_links[i]}' = link`
                );
                await pool.query(
                    `UPDATE data SET updated = '${date.toUTCString()}' WHERE '${db_links[i]}' = link`
                );
            } else {
                info('\x1b[32m%s\x1b[0m', 'Up to date! ');
            };
        }
        await newPage.close();
        browser.close();
    }),
};

module.exports = { checkPrice };