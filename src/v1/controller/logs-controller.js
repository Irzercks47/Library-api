const db = require('../db/connection')
const { respJson } = require("../../util/template")
const { bites_util } = require("../../util/utilFunction")
const util = require('util');

//promisify db query o that we can imporve readability and make error handling easier
const query = util.promisify(db.query).bind(db);

//show logs
const showLogs = async (res) => {
    const sql = 'SELECT * FROM librarylogs'
    try {
        const data = await query(sql)
        respJson(200, data, "succes", null, res)
    } catch (err) {
        respJson(500, null, err, null, res)
    }
}

//borrow book logs
const borrowBooks = async (res, id, body) => {
    ({ user_id, status_id, amount, stock } = body)
    const booksSql = "UPDATE books SET stock = ? WHERE id = ?"
    const logsSql = "INSERT INTO librarylogs (book_id, user_id, status_id, amount, created_at) VALUES (?,?,?,?,?)"
    try {
        await query(booksSql, id)
        const logs = await query(logsSql, [id, user_id, status_id, amount])
        respJson(200, { logs_id: logs.insertId, books_id: book_id }, "Book borrowed successfully", null, res)
    } catch (err) {
        respJson(500, null, "Failed to borrow book", null, res)
    }
}

//return book logs
const returnBooks = async (res, id, body) => {
    ({ user_id, status_id, amount, stock } = body)
    const booksSql = "UPDATE books SET stock = ? WHERE id = ?"
    const logsSql = "INSERT INTO librarylogs (book_id, user_id, status_id, amount, created_at) VALUES (?,?,?,?,?)"
    try {
        await query(booksSql, id)
        const logs = await query(logsSql, [id, user_id, status_id, amount])
        respJson(200, { logs_id: logs.insertId, books_id: book_id }, "Book borrowed successfully", null, res)
    } catch (err) {
        respJson(500, null, "Failed to borrow book", null, res)
    }
}

module.exports = {
    showLogs,
    borrowBooks,
    returnBooks,
}