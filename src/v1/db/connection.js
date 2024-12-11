const mysql = require('mysql')
const CONFIG = require("../../../config")

const db = mysql.createPool({
    host: CONFIG.DB_HOST,
    user: CONFIG.DB_USER,
    password: CONFIG.DB_PASS,
    database: CONFIG.DB_NAME,
})

module.exports = db;