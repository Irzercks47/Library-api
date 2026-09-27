const mysql = require('mysql2')
const CONFIG = require("../../../config")

const db = mysql.createPool({
    host: CONFIG.DB_HOST,
    user: CONFIG.DB_USER,
    password: CONFIG.DB_PASS,
    database: CONFIG.DB_NAME,
    connectionLimit: 100,     // default cuma 10 — bottleneck utama di high load
    waitForConnections: true, // antri kalau pool penuh, jangan langsung error
    queueLimit: 0,            // 0 = unlimited queue
    enableKeepAlive: true,    // cegah koneksi mati karena idle terlalu lama
    keepAliveInitialDelay: 0
})

module.exports = db;