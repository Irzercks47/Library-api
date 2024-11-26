const db = require('../db/connection')
const { respJson } = require("../../util/template")

//get all books
const showBooks = (res) => {
    try {
        const sql = "SELECT * FROM books"
        db.query(sql, (err, fields) => {
            if (err) throw err
            respJson(200, fields, "succes", null, res)
        })
    } catch (err) {
        respJson(404, err, err, null, res)
    }
}

//get books by id
const getBooksbyId = (res, id) => {
    try {
        const sql = `SELECT * FROM books WHERE id = ${id}`
        db.query(sql, (err, fields) => {
            if (err) throw err
            respJson(200, fields, "succes", null, res)
        })
    } catch (err) {
        respJson(404, err, err, null, res)
    }
}

//add books
const addBooks = (res, id, body) => {
    const sql = `INSERT INTO books (book_name, summary, date_published, author, book_cover, stock) VALUES
        ("${book_name}", "${summary}", ${date_published}, "${author}", "${book_cover}", ${stock})`
    try {
        db.query(sql, (err, fields) => {
            if (err) throw err
            respJson(200, fields, "succes", null, res)
        })
    } catch (err) {
        respJson(404, err, err, null, res)
    }
}

//update book
const updateBooks = (res, id, body) => {
    ({ book_name, summary, date_published, author, book_cover, stock } = body)
    const sql = `UPDATE books SET book_name = ${book_name}, summary = ${summary}, date_published = ${date_published}, 
        author = ${author}, book_cover = ${book_cover}, stock = ${stock} WHERE id = ${id}`
    try {
        db.query(sql, (err, fields) => {
            if (err) throw err
            respJson(200, fields, "succes", null, res)
        })
    } catch (err) {
        respJson(404, err, err, null, res)
    }
}

//delete books
const deleteBooks = (res, id) => {
    const sql = `DELETE FROM books WHERE id = ${id}`
    try {
        db.query(sql, (err, fields) => {
            if (err) throw err
            respJson(200, fields, "succes", null, res)
        })
    } catch (err) {
        respJson(404, err, err, null, res)
    }
}

module.exports = {
    showBooks,
    getBooksbyId,
    addBooks,
    updateBooks,
    deleteBooks,
};