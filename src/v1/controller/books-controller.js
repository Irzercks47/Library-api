const db = require('../db/connection')
const { respJson } = require("../../util/template")
const { bites_util } = require("../../util/utilFunction")
const util = require('util');

//promisify db query o that we can imporve readability and make error handling easier
const query = util.promisify(db.query).bind(db);

//get all books
const showBooks = async (res) => {
    const sql = "SELECT * FROM books"
    try {
        const data = await query(sql);
        respJson(200, data, "succes", null, res)
    } catch (err) {
        respJson(500, null, err.message, null, res)
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
        respJson(404, null, err.message, null, res)
    }
}

//add books
const addBooks = async (res, body) => {
    ({ book_name, summary, date_published, author, book_cover, stock } = body)
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
    ({ book_name, summary, date_published, author, book_cover, stock } = body)
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
    addBooks,
    updateBooks,
    deleteBooks,
};