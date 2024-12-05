const db = require('../db/connection')
const { respJson } = require("../../util/template")
const { bites_util, paginate } = require("../../util/utilFunction")
const util = require('util');

//promisify db query so that we can improve readability and make error handling easier
const query = util.promisify(db.query).bind(db);
const showData = false
const hideData = true

//show logs
//joins from books, user, and status
const showLogs = async (res, params) => {
    const { page, limit } = params
    page = bites_util.page(page)
    limit = bites_util.limit(limit)
    const offset = bites_util.offset(page, limit)
    const sql = `SELECT ll.id, b.book_name, u.username, s.status_name, ll.amount, ll.created_at, ll.updated_at 
                FROM librarylogs AS ll
                JOIN users AS u ON ll.user_id = u.id
                JOIN books AS b ON ll.book_id = b.id
                JOIN statuses AS s ON ll.status_id = s.id
                ORDER BY ll.created_at DESC
                WHERE is_deleted ?
                LIMIT ? OFFSET ?`
    const countSql = `SELECT COUNT(id) AS total from librarylogs WHERE is_deleted = ?`
    try {
        const data = await query(sql, [showData, limit, offset])
        const pagination = await paginate(query, countSql, showData, limit, page)
        respJson(200, data, "succes", pagination, res)
    } catch (err) {
        respJson(500, null, err.message, null, res)
    }
}

//get logs by id
const getLogsbyId = async (res, id) => {
    const sql = `SELECT ll.id, b.book_name, u.username, s.status_name, ll.amount, ll.created_at, ll.updated_at 
                FROM librarylogs AS ll
                JOIN users AS u ON ll.user_id = u.id
                JOIN books AS b ON ll.book_id = b.id
                JOIN statuses AS s ON ll.status_id = s.id
                WHERE ll.id = ? AND is_deleted ?`
    try {
        const data = await query(sql, [id, showData]);
        if (data.length === 0) {
            respJson(404, null, `Log with ID ${id} not found`, null, res);
        }
        else {
            respJson(200, data, "succes", null, res)
        }
    } catch (err) {
        respJson(404, null, err.message, null, res)
    }
}

//search logs by user id
const searchLogsbyUserId = async (res, user_id, params) => {
    let { page, limit } = params
    page = bites_util.page(page)
    limit = bites_util.limit(limit)
    const offset = bites_util.offset(page, limit)
    const sql = `SELECT ll.id, b.book_name, u.username, s.status_name, ll.amount, ll.created_at, ll.updated_at 
                FROM librarylogs AS ll
                JOIN users AS u ON ll.user_id = u.id
                JOIN books AS b ON ll.book_id = b.id
                JOIN statuses AS s ON ll.status_id = s.id
                WHERE ll.user_id = ? AND is_deleted = ?
                ORDER BY ll.created_at DESC
                LIMIT ? OFFSET ?`
    const countSql = `SELECT COUNT(id) AS total from librarylogs WHERE user_id = ?`
    try {
        const data = await query(sql, [user_id, showData, limit, offset]);
        const pagination = await paginate(query, countSql, user_id, limit, page)
        if (data.length === 0) {
            respJson(404, null, `Log with ID ${user_id} not found`, null, res);
        }
        else {
            respJson(200, data, "succes", pagination, res)
        }
    } catch (err) {
        respJson(404, null, err.message, null, res)
    }
}

//borrow book logs
//needs to be fixed
const borrowBooks = async (res, id, body) => {
    const { user_id, status_id, amount, stock, note } = body
    const booksSql = "UPDATE books SET stock = ?, updated_at = ? WHERE id = ? AND stock >= ? AND is_deleted = ?"
    const logsSql = "INSERT INTO librarylogs (book_id, user_id, status_id, amount, note, created_at) VALUES (?,?,?,?,?,?)"
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
//needs to be fixed
const returnBooks = async (res, id, body) => {
    const { user_id, status_id, amount, stock } = body
    const booksSql = "UPDATE books SET stock = ?, updated_at = ? WHERE id = ? AND is_deleted = ?"
    const logsSql = "INSERT INTO librarylogs (book_id, user_id, status_id, note,amount, created_at) VALUES (?,?,?,?,?,?)"
    try {
        const books = await query(booksSql, [stock, bites_util.curr_date, id, showData])
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
    getLogsbyId,
    searchLogsbyUserId,
    borrowBooks,
    returnBooks,
}