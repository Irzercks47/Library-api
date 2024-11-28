const db = require('../db/connection')
const { respJson } = require("../../util/template")
const util = require('util');

const query = util.promisify(db.query).bind(db);

//get all books
const showBooks = async (res) => {
    const sql = "SELECT * FROM books"
    try {
        const data = await query(sql);
        respJson(200, data, "succes", null, res)
    } catch (err) {
        respJson(500, null, err, null, res)
    }
}

//get books by id
const getBooksbyId = async (res, id) => {
    const sql = `SELECT * FROM books WHERE id = ?`
    try {
        const data = await query(sql, id);
        if (data.length === 0) respJson(404, null, `Book with ID ${id} not found`, null, res);
        respJson(200, data, "succes", null, res)
    } catch (err) {
        respJson(404, null, err, null, res)
    }
}

//add books
const addBooks = async (res, body) => {
    ({ book_name, summary, date_published, author, book_cover, stock } = body)
    const sql = `INSERT INTO books (book_name, summary, date_published, author, book_cover, stock) VALUES
        (?, ?, ?, ?, ?, ?)`
    try {
        const data = await query(sql, [book_name, summary, date_published, author, book_cover, stock]);
        respJson(201, { id: data.insertId }, "Book added successfully", null, res)
    } catch (err) {
        respJson(404, err, err, null, res)
    }
}

//update book
const updateBooks = async (res, id, body) => {
    ({ book_name, summary, date_published, author, book_cover, stock } = body)
    const sql = `UPDATE books SET book_name = ?, summary = ?, date_published = ?, 
        author = ?, book_cover = ?, stock = ? WHERE id = ?`
    try {
        const data = await query(sql, [book_name, summary, date_published, author, book_cover, stock, id]);
        if (data.affectedRows === 0) respJson(404, null, `No book found with ID ${id}`, null, res);
        respJson(201, { id, updated: true }, "Book updated successfully", null, res)
    } catch (err) {
        respJson(500, null, "Failed to update book", null, res)
    }
}

//delete books
const deleteBooks = async (res, id) => {
    const sql = `DELETE FROM books WHERE id = ?`
    try {
        const data = await query(sql, id);
        if (data.affectedRows === 0) respJson(404, null, `No book found with ID ${id}`, null, res);
        respJson(200, { id, deleted: true }, "Book deleted successfully", null, res)
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