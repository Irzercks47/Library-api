const mysql = require('mysql')
const CONFIG = require("../../../config")

const connection = mysql.createConnection({
    host: CONFIG.DB_HOST,
    user: CONFIG.DB_USER,
    password: CONFIG.DB_PASS,
    database: CONFIG.DB_NAME,
})

module.exports = db;