const db = require('../db/connection')
const { respJson } = require("../../util/template")
const { bites_util, paginate } = require("../../util/utilFunction")
const util = require('util');
const bcrypt = require('bcryptjs')
const CONFIG = require('../../../config')
const jwt = require('jsonwebtoken');
// const mysql = require('mysql')

//promisify db query so that we can improve readability and make error handling easier
const query = util.promisify(db.query).bind(db);

//Register
const register = async (body, res) => {
    const { username, password, email } = body
    const role_id = 2;
    //check if there is data
    if (!username || !password || !email) {
        respJson(409, null, "Please enter username, password, and email", null, res)
        return;
    }
    //turn password into encrpyted data
    const cipherPass = bcrypt.hashSync(password, 10)
    const insertSql = `INSERT INTO users (username, email, password, role_id, created_at) VALUES (?,?,?,?,?)`
    try {
        //insert data
        const data = await query(insertSql, [username, email, cipherPass, role_id, bites_util.curr_date])
        // console.log(data)
        // console.log("SQL Query:", mysql.format(insertSql, [username, email, cipherPass, role_id, bites_util.curr_date]));
        respJson(201, { id: data.insertId }, "Account successfully created", null, res)
    } catch (err) {
        respJson(500, null, err.message, null, res)
    }
}

//DONE
const login = async (body, res) => {
    // Read username and password from request body
    const { email, password } = body;
    if (!password || !email) {
        respJson(400, null, "Please enter email and password", null, res)
        return;
    }
    // console.log(password)
    // console.log(email)
    const sql = `SELECT u.id, u.username, u.password, r.role_name
                FROM users AS u
                JOIN roles as r ON u.role_id = r.id
                WHERE u.email = ?`
    // Filter user from the users array by username and password
    try {
        //insert data
        const data = await query(sql, [email]);
        // console.log("SQL Query:", mysql.format(sql, [email]));
        // console.log(data)
        //check if there is data
        if (data.length === 0) {
            respJson(401, data, `Invalid email or password`, null, res);
            return;
        }
        const user = data[0];

        // Compare passwords
        const passwordMatches = bcrypt.compareSync(password, user.password);
        //if password not matches
        if (!passwordMatches) {
            respJson(401, null, "Invalid email or password", null, res); // HTTP 401 Unauthorized
            return;
        }
        // Generate an access token (short-lived)
        const accessToken = jwt.sign(
            { id: user.id, username: user.username, role: user.role_name },
            CONFIG.SECRET_TOKEN,
            { expiresIn: '15m' } // Expires in 15 minutes
        );

        // Generate a refresh token (long-lived)
        const refreshToken = jwt.sign(
            { id: user.id },
            CONFIG.REFRESH_SECRET,
            { expiresIn: '7d' } // Expires in 7 days
        );
        // Store the refresh token in the database
        const refreshSql = `
            INSERT INTO refresh_tokens (user_id, token, created_at, expires_at)
            VALUES (?, ?, ?, ?)
        `;
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
        await query(refreshSql, [user.id, refreshToken, bites_util.curr_date, expiresAt]);

        // Send refresh token as an HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,       // Prevent JavaScript access
            secure: true,         // Use HTTPS in production
            sameSite: 'strict',   // Prevent CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Send access token in the response
        respJson(200, { accessToken }, "Login successful", null, res);
    } catch (err) {
        respJson(500, null, err.message || "there is no user", null, res)
    }
}

//logout
const logout = async (res, refreshToken) => {
    //check if there is refreshtoken in cookies
    if (!refreshToken) {
        respJson(400, null, "Refresh token is required.", null, res);
        return;
    }

    try {
        // Delete the refresh token from the database
        const sql = `DELETE FROM refresh_tokens WHERE token = ?`;
        const result = await query(sql, [refreshToken]);

        if (result.affectedRows === 0) {
            respJson(400, null, "Refresh token not found or already revoked.", null, res);
            return;
        }

        // Clear the cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true, // Ensure consistent flag settings
            sameSite: 'strict'
        });

        respJson(200, null, "Logout successful.", null, res);
    } catch (err) {
        respJson(500, null, "Internal server error.", null, res);
    }
}

//register new admin user
const registerAdmin = async (body, res) => {
    const { username, password, email } = body
    const role_id = 1;
    if (!username || !password || !email) {
        respJson(409, null, "Please enter username, password, and email", null, res)
        return;
    }
    const cipherPass = bcrypt.hashSync(password, 10)

    const insertSql = `INSERT INTO users (username, email, password, role_id, created_at) VALUES (?,?,?,?,?)`
    try {
        const data = await query(insertSql, [username, email, cipherPass, role_id, bites_util.curr_date])
        // console.log(data)
        // console.log("SQL Query:", mysql.format(insertSql, [username, email, cipherPass, role_id, bites_util.curr_date]));
        respJson(201, { id: data.insertId }, "Account successfully created", null, res)
    } catch (err) {
        respJson(500, null, err.message, null, res)
    }
}

module.exports = {
    register,
    registerAdmin,
    login,
    logout,
}