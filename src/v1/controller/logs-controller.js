const db = require('../db/connection')
const { respJson } = require("../../util/template")
const { bites_util } = require("../../util/utilFunction")
const util = require('util');

//promisify db query o that we can imporve readability and make error handling easier
const query = util.promisify(db.query).bind(db);

//show logs
//joins from books, user, and status
const showLogs = async (res) => {
    const sql = `SELECT ll.id, b.book_name, u.username, s.status_name, ll.amount, ll.created_at, ll.updated_at 
                FROM librarylogs AS ll
                JOIN users AS u ON ll.user_id = u.id
                JOIN books AS b ON ll.book_id = b.id
                JOIN statuses AS s ON ll.status_id = s.id
                ORDER BY ll.created_at DESC`
    try {
        const data = await query(sql)
        respJson(200, data, "succes", null, res)
    } catch (err) {
        respJson(500, null, err.message, null, res)
    }
}

//borrow book logs
const borrowBooks = async (res, id, body) => {
    ({ user_id, status_id, amount, stock } = body)
    const booksSql = "UPDATE books SET stock = ?, updated_at = ? WHERE id = ? AND stock >= ?"
    const logsSql = "INSERT INTO librarylogs (book_id, user_id, status_id, amount, created_at) VALUES (?,?,?,?,?)"
    try {
        const books = await query(booksSql, [stock, bites_util.curr_date, id, amount])
        if (books.affectedRows === 0) {
            respJson(404, null, `No book found with ID ${id}`, null, res);
        }
        else {
            const logs = await query(logsSql, [id, user_id, status_id, amount, bites_util.curr_date])
            respJson(200, { logs_id: logs.insertId, books_id: book_id }, "Book borrowed successfully", null, res)
        }
    } catch (err) {
        respJson(500, null, "Failed to borrow book", null, res)
    }
}

//return book logs
const returnBooks = async (res, id, body) => {
    ({ user_id, status_id, amount, stock } = body)
    const booksSql = "UPDATE books SET stock = ?, updated_at = ? WHERE id = ?"
    const logsSql = "INSERT INTO librarylogs (book_id, user_id, status_id, amount, created_at) VALUES (?,?,?,?,?)"
    try {
        const books = await query(booksSql, [stock, bites_util.curr_date, id])
        if (books.affectedRows === 0) {
            respJson(404, null, `No book found with ID ${id}`, null, res);
        }
        const logs = await query(logsSql, [id, user_id, status_id, amount, bites_util.curr_date])
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