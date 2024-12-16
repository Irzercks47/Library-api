const db = require('../db/connection')
const { respJson } = require("../../util/template")
const { bites_util, paginate } = require("../../util/utilFunction")
const util = require('util');
const bcrypt = require('bcryptjs')
// const mysql = require('mysql')

//promisify db query so that we can improve readability and make error handling easier
const query = util.promisify(db.query).bind(db);

const register = async (body, res) => {
    const { username, password, email } = body
    if (!username || !password || !email) {
        respJson(500, null, "Please enter username, password, and email", null, res)
        return;
    }
    const cipherPass = bcrypt.hashSync(password, 10)

    const insertSql = `INSERT INTO users (username, email, password, created_at) VALUES (?,?,?,?)`
    try {
        const data = await query(insertSql, [username, email, cipherPass, bites_util.curr_date])
        respJson(201, null, "Account successfully created", res)
    } catch (err) {
        respJson(500, null, err.message, null, res)
    }
}

const login = async (body, res) => {
    // Read username and password from request body
    const { email, password } = body;
    if (!password || !email) {
        respJson(500, null, "Please enter email and password", null, res)
        return;
    }
    const cipherPass = bcrypt.hashSync(password, 10)
    const sql = `SELECT id, username FROM users WHERE username = ? AND password = ?`
    // Filter user from the users array by username and password
    try {
        const data = query(sql, [email, cipherPass]);
        if (data.length === 0) {
            respJson(404, null, `Username or password incorrect`, null, res);
            return;
        }
        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);
        respJson(201, accessToken, "Login success", null, res)

    } catch (err) {
        respJson(500, null, err.message || "there is no user", null, res)
    }
}

const logout = async () => {

}

module.exports = {
    register,
    login,
    logout
}