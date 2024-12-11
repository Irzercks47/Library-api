const db = require('../db/connection')
const { respJson } = require("../../util/template")
const { bites_util, paginate } = require("../../util/utilFunction")
const util = require('util');
const mysql = require('mysql')

//promisify db query so that we can improve readability and make error handling easier
const query = util.promisify(db.query).bind(db);
const showData = false
const hideData = true

// Debug the SQL query
// console.log("SQL Query:", mysql.format(sql, [book_id, showData]));

//show logs
//joins from books, user, and status
const showLogs = async (res, params) => {
    let { page, limit } = params
    page = bites_util.page(page)
    limit = bites_util.limit(limit)
    const offset = bites_util.offset(page, limit)
    const sql = `SELECT ll.id, b.book_name, u.username, s.status_name, ll.amount, ll.created_at, ll.updated_at, ll.is_deleted
                FROM librarylogs AS ll
                JOIN users AS u ON ll.user_id = u.id
                JOIN books AS b ON ll.book_id = b.id
                JOIN statuses AS s ON ll.status_id = s.id
                ORDER BY ll.created_at DESC
                LIMIT ? OFFSET ?`
    const countSql = `SELECT COUNT(id) AS total from librarylogs`
    try {
        const data = await query(sql, [limit, offset])
        const pagination = await paginate(query, countSql, null, limit, page)
        respJson(200, data, "succes", pagination, res)
    } catch (err) {
        respJson(500, null, err.message || "an eror occured", null, res)
    }
}

//get logs by id
const getLogsbyId = async (res, id) => {
    const sql = `SELECT ll.id, b.book_name, u.username, s.status_name, ll.amount, ll.created_at, ll.updated_at, ll.is_deleted
                FROM librarylogs AS ll
                JOIN users AS u ON ll.user_id = u.id
                JOIN books AS b ON ll.book_id = b.id
                JOIN statuses AS s ON ll.status_id = s.id
                WHERE ll.id = ?`
    try {
        const data = await query(sql, [id]);
        if (data.length === 0) {
            respJson(404, null, `Log with ID ${id} not found`, null, res);
            return;
        }
        respJson(200, data, "succes", null, res)
    } catch (err) {
        respJson(404, null, err.message || "an eror occured", null, res)
    }
}

//search logs by user id
const searchLogsbyUserId = async (res, user_id, params) => {
    let { page, limit } = params
    page = bites_util.page(page)
    limit = bites_util.limit(limit)
    const offset = bites_util.offset(page, limit)
    const sql = `SELECT ll.id, b.book_name, u.username, s.status_name, ll.amount, ll.created_at, ll.updated_at, ll.is_deleted
                FROM librarylogs AS ll
                JOIN users AS u ON ll.user_id = u.id
                JOIN books AS b ON ll.book_id = b.id
                JOIN statuses AS s ON ll.status_id = s.id
                WHERE ll.user_id = ?
                ORDER BY ll.created_at DESC
                LIMIT ? OFFSET ?`
    const countSql = `SELECT COUNT(id) AS total from librarylogs WHERE user_id = ?`
    try {
        const data = await query(sql, [user_id, limit, offset]);
        const pagination = await paginate(query, countSql, user_id, limit, page)
        if (data.length === 0) {
            respJson(404, null, `Log with ID ${user_id} not found`, null, res);
            return;
        }
        respJson(200, data, "succes", pagination, res)
    } catch (err) {
        respJson(500, null, err.message, null, res)
    }
}

//borrow book logs
const borrowBooks = async (res, body) => {
    const { user_id, amount, final_stock, note, book_id } = body
    const status_id = 1
    const booksSql = "UPDATE books SET stock = ?, updated_at = ? WHERE id = ? AND stock >= ? AND is_deleted = ?"
    const logsSql = "INSERT INTO librarylogs (book_id, user_id, status_id, amount, note, created_at) VALUES (?,?,?,?,?,?)"
    try {
        await query("START TRANSACTION");
        // console.log(mysql.format(booksSql, [final_stock, bites_util.curr_date, id, amount, showData]));
        const books = await query(booksSql, [final_stock, bites_util.curr_date, book_id, amount, showData])
        if (books.affectedRows === 0) {
            respJson(404, null, `No book found with ID ${book_id}`, null, res);
            await query("ROLLBACK");
            return;
        }
        const logs = await query(logsSql, [book_id, user_id, status_id, amount, note, bites_util.curr_date])
        await query("COMMIT");
        respJson(200, { logs_id: logs.insertId, books_id: book_id }, "Book borrowed successfully", null, res)
    } catch (err) {
        await query("ROLLBACK");
        respJson(500, null, "Failed to borrow book", null, res)
    }
}

//return book logs
//needs to be revised
const returnBooks = async (res, body) => {
    const { note, book_id, log_id } = body
    const status_id = 2
    const booksSql = "UPDATE books SET stock = ?, updated_at = ? WHERE id = ? AND is_deleted = ?"
    const logsSql = "INSERT INTO librarylogs (book_id, user_id, status_id, amount, note, created_at) VALUES (?,?,?,?,?,?)"
    const calcSql = `SELECT b.stock, ll.amount, ll.user_id, ll.is_deleted
                    FROM librarylogs AS ll 
                    JOIN books AS b ON ll.book_id = b.id
                    WHERE ll.id = ? AND b.is_deleted = ?`
    const changeLogFlagSql = `UPDATE librarylogs SET is_deleted = ?, updated_at = ? WHERE id = ? AND is_deleted = ?`
    try {

        await query("START TRANSACTION");
        // console.log(mysql.format(calcSql, [log_id, showData]));
        const data = await query(calcSql, [log_id, showData]);
        if (data.length === 0 || !!data[0]?.is_deleted === hideData) {
            respJson(404, null, `Book with ID ${book_id} already returned or book already deleted`, null, res);
            await query("ROLLBACK");
            return;
        }
        // console.log(`is_deleted : ${!!data[0]?.is_deleted === true}`)

        const user_id = data[0]?.user_id;
        const stock = data[0]?.stock;
        const amount = data[0]?.amount;
        const final_stock = stock + amount;
        // console.log(stock)
        // console.log(amount)
        // console.log(final_stock)

        const changeLog = await query(changeLogFlagSql, [hideData, bites_util.curr_date, log_id, showData])
        // console.log(mysql.format(changeLogFlagSql, [hideData, bites_util.curr_date, log_id, showData]));
        // console.log(changeLog)
        if (changeLog.affectedRows === 0) {
            respJson(404, null, `Book with ID ${book_id} already returned`, null, res);
            await query("ROLLBACK");
            return;
        }

        const books = await query(booksSql, [final_stock, bites_util.curr_date, book_id, showData])
        // console.log(mysql.format(booksSql, [final_stock, bites_util.curr_date, book_id, amount, showData]));
        if (books.affectedRows === 0) {
            respJson(404, null, `Book with ID ${book_id} not found`, null, res);
            await query("ROLLBACK");
            return;
        }

        const logs = await query(logsSql, [book_id, user_id, status_id, amount, note, bites_util.curr_date])
        // console.log(mysql.format(logsSql, [book_id, user_id, status_id, amount, note, bites_util.curr_date]));
        await query("COMMIT");

        respJson(200, { logs_id: logs.insertId, books_id: book_id }, "Book returned successfully", null, res)
    } catch (err) {
        await query("ROLLBACK");
        respJson(500, null, err.message, null, res)
        // "Failed to return book"
    }
}

module.exports = {
    showLogs,
    getLogsbyId,
    searchLogsbyUserId,
    borrowBooks,
    returnBooks,
}