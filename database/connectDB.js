require('dotenv').config();
const { info, error } = require('../utils/logger');
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

// const pool = new Pool({
//   user: "",
//   database: "",
//   password: "",
//   port: 5432,
//   host: "localhost",
// });

module.exports = { pool };