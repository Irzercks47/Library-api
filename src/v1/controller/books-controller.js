const db = require('../db/connection')
const { respJson } = require("../../util/template")
const showBooks = (res) => {
    try {
        const sql = "SELECT * FROM books"
        db.query(sql, (err, fields) => {
            respJson(200, fields, "succes", null, res)
        })
    } catch (err) {
        respJson(404, err, err, null, res)
    }
}

module.exports = {
    showBooks,
};