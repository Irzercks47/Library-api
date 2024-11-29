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
    } catch (error) {
        respJson(500, null, err, null, res)
    }
}

//borrow book logs
const borrowBooks = async (res, id, body) => {

}

//return book logs
const returnBooks = async (res, id, body) => {

}

module.exports = {
    showLogs,
    borrowbooks,
}