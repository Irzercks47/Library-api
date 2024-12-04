const db = require('../db/connection')
const { respJson } = require("../../util/template")
const { bites_util, paginate } = require("../../util/utilFunction")
const util = require('util');

//promisify db query so that we can improve readability and make error handling easier
const query = util.promisify(db.query).bind(db);

//get all books
const showBooks = async (res, params) => {
    let { page, limit } = params
    //this approach prevents if the data sent is Nan or null by converting it to int and replacing it
    page = bites_util.page(page)
    limit = bites_util.limit(limit)
    const offset = bites_util.offset(page, limit)
    const sql = "SELECT * FROM books LIMIT ? OFFSET ?"
    const countSql = `SELECT COUNT(id) AS total FROM books`
    try {
        //you can use promise all for this but the loads in system is bigger
        /*
            const [data, pagination] = await Promise.all([
                query(sql, [limit, offset]),
                paginate(query, countSql, limit, page),
            ]);        
        */
        //but using this without promise all can take away user time so the use of it depends on the machine
        const data = await query(sql, [limit, offset]);
        const pagination = await paginate(query, countSql, limit, page)
        respJson(200, data, "succes", pagination, res)
    } catch (err) {
        respJson(500, null, err.message || "an eror occured", null, res)
    }
}

//get books by id
const getBooksbyId = async (res, id) => {
    const sql = `SELECT * FROM books WHERE id = ?`
    try {
        const data = await query(sql, id);
        if (data.length === 0) {
            respJson(404, null, `Book with ID ${id} not found`, null, res);
        }
        else {
            respJson(200, data, "succes", null, res)
        }
    } catch (err) {
        respJson(404, null, err.message || "an eror occured", null, res)
    }
}

//search books
const searchBooks = async (res, params) => {
    let { search, page, limit } = params
    page = bites_util.page(page)
    limit = bites_util.limit(limit)
    const sql = `SELECT * FROM books WHERE book_name = % ? %`
    try {
        const datas = await query(sql, [search])
        const pagination = await paginate(query, countSql, limit, page)
        respJson(200, datas, "succes", pagination, res)
    } catch (err) {
        respJson(404, null, err.message || "an eror occured", null, res)
    }
}

//add books
const addBooks = async (res, body) => {
    let { book_name, summary, date_published, author, book_cover, stock } = body
    stock = bites_util.intParse(stock)
    const sql = `INSERT INTO books (book_name, summary, date_published, author, book_cover, stock, created_at) VALUES
        (?, ?, ?, ?, ?, ?, ?)`
    try {
        const data = await query(sql, [book_name, summary, date_published, author, book_cover, stock, bites_util.curr_date]);
        respJson(201, { id: data.insertId }, "Book added successfully", null, res)
    } catch (err) {
        respJson(500, err, "Failed to add book", null, res)
    }
}

//update book
const updateBooks = async (res, id, body) => {
    let { book_name, summary, date_published, author, book_cover, stock } = body
    stock = bites_util.intParse(stock)
    const sql = `UPDATE books SET book_name = ?, summary = ?, date_published = ?, 
        author = ?, book_cover = ?, stock = ?, updated_at = ? WHERE id = ?`
    try {
        const data = await query(sql, [book_name, summary, date_published, author, book_cover, stock, bites_util.curr_date, id]);
        if (data.affectedRows === 0) {
            respJson(404, null, `No book found with ID ${id}`, null, res);
        } else {
            respJson(201, { id, updated: true }, "Book updated successfully", null, res)
        }
    } catch (err) {
        respJson(500, null, "Failed to update book", null, res)
    }
}

//delete books
const deleteBooks = async (res, id) => {
    const sql = `DELETE FROM books WHERE id = ?`
    try {
        const data = await query(sql, id);
        if (data.affectedRows === 0) {
            respJson(404, null, `No book found with ID ${id}`, null, res);
        } else {
            respJson(201, { id, deleted: true }, "Book deleted successfully", null, res)
        }
    } catch (err) {
        respJson(500, null, "Failed to delete book", null, res)
    }
}

module.exports = {
    showBooks,
    getBooksbyId,
    searchBooks,
    addBooks,
    updateBooks,
    deleteBooks,
};