const { pool } = require('./connectDB');
const { info, error } = require('../utils/logger');

async function save (data) {
    for(let i in data) {
        const text = 'INSERT INTO data (category, name, price, link, created, updated) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [
            data[i]['category'],
            data[i]['name'],
            data[i]['price'],
            data[i]['link'],
            data[i]['created'],
            data[i]['updated'],
        ];
        await pool.query(text, values);
    }
};

module.exports = { save };
