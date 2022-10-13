// utils
const { info, error } = require('./utils/logger');
// database
const browser = require('./controllers/browser');
const inDatabase = require('./database/createTable');
const toDatabase = require('./database/saveData');
// controllers
const scraperController = require('./controllers/scraperController');
const updateController = require('./controllers/updateController');
// methods
const { compareByLinks } = require('./methods/compareByLinks');


const args = process.argv.slice(2);
const url = 'http://localhost:3001/';

async function run(url, args) {

    let browserInstance;
    let data;

    switch (args[0]) {
        case '-init':
            inDatabase.createTable();
            browserInstance = browser.start();
            data = await scraperController(browserInstance, url);
            await toDatabase.save(data);
            await browser.close();
            break;
        case '-links':
            browserInstance = browser.start();
            data = await scraperController(browserInstance, url);
            if (data !== 0) {
                let newData = await compareByLinks(data);
                if (newData.length !== 0) {
                    let changes = await updateController(browserInstance, newData);
                    await toDatabase.save(changes);
                }
            }
            await browser.close();
            break;
        case '-prices':
            browserInstance = browser.start();
            await updateController(browserInstance, 'price');
            await browser.close();
            break;
        default:
          console.log('Sorry, that is not I know how to do.');
      };
};

run(url, args);