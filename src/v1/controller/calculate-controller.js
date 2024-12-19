const db = require('../db/connection')
const { respJson } = require("../../util/template")
const { bites_util } = require("../../util/utilFunction")
const util = require('util');
// const mysql = require('mysql')

//promisify db query so that we can improve readability and make error handling easier
const query = util.promisify(db.query).bind(db);
const showData = false
const hideData = true

//calculate borrowed amount 
const calcBorrowedAmount = async (res, body) => {
    let { amount, book_id } = body
    amount = bites_util.intParse(amount)
    //it will take the stock directly from db instead of client side to make the data not to be tampered
    const sql = `SELECT stock FROM books WHERE id = ? AND is_deleted = ?`
    try {
        const data = await query(sql, [book_id, showData]);
        if (data.length === 0) {
            respJson(404, null, `Book with ID ${book_id} not found`, null, res)
            return
        }
        const stock = data[0]?.stock;
        // Validate that the requested amount does not exceed stock
        if (amount > stock) {
            respJson(422, null, `Input error: amount exceeds available stock`, null, res);
            return;
        }
        //this will calculate the amout left in stock
        const final_stock = stock - amount;
        // Respond with the updated amount and remaining stock
        respJson(200, { amount: amount, stock, final_stock: final_stock }, "Success", null, res);
    } catch (err) {
        respJson(500, null, "Failed to borrow book", null, res)
    }
}


module.exports = {
    calcBorrowedAmount,
};