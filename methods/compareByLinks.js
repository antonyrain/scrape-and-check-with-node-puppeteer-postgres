const { info, error } = require('../utils/logger')
const { pool } = require('../database/connectDB')

let message_1 = 'Some product pages (links) are DROPPED from the target website!'
let message_2 = 'Some product pages (links) are NEW on the target website!'
let message_3 = 'Some URL has changed!'
let message_4 = 'The product pages (links) updated!'

async function compareByLinks (data) {
    let newLinks = []
    let db_links = []
    let scrp_links = []

    let dataFromScraper = data
    for (let i in dataFromScraper) {
        scrp_links.push(dataFromScraper[i]['link'])
    }

    let { rows } = await pool.query('SELECT link FROM data')
    for (let i in rows) {
        db_links.push(rows[i]['link'])
    }

    if (scrp_links.length !== db_links.length) {
        // filtering one array from another array and vice versa
        let differ_1 = db_links.filter(x => !scrp_links.includes(x))
        let differ_2 = scrp_links.filter(x => !db_links.includes(x))
        if (differ_1.length !== 0){
            for (let i in differ_1) {
                await pool.query(`DELETE FROM data WHERE '${differ_1[i]}' = link`)
            }
            info('\x1b[35m%s\x1b[0m', message_1)
            info(differ_1)
        }
        if (differ_2.length !== 0){
            differ_2.forEach(el => {
                newLinks.push(el)
            })
            info('\x1b[32m%s\x1b[0m', message_2)
            info(differ_2)
        }
    } else {
        for (let i in scrp_links) {
            let { rows } = await pool.query(
                `SELECT link FROM data WHERE '${scrp_links[i]}' = link`
            )
            if (rows.length === 0) {
                newLinks.push(scrp_links[i])
                info('\x1b[32m%s\x1b[0m', message_3)
            }
        }
    }

    info('\x1b[32m%s\x1b[0m', message_4)
    return newLinks
}

module.exports = { compareByLinks }