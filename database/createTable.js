const { pool } = require('./connectDB');
const { info, error } = require('../utils/logger');

async function createTable () {
    const text = `
    CREATE TABLE IF NOT EXISTS "data" (
        "id" SERIAL,
	"category" VARCHAR(100) NOT NULL,
        "name" VARCHAR(100) NOT NULL,
        "price" VARCHAR(100) NOT NULL,
        "link" VARCHAR(200) NOT NULL,
        "created" VARCHAR(100) NOT NULL,
        "updated" VARCHAR(100) NOT NULL,
        PRIMARY KEY ("id")
    );`;
    await pool.query(text);
};

module.exports = { createTable };
