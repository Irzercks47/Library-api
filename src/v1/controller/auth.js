const db = require('../db/connection')
const { respJson } = require("../../util/template")
const { bites_util, paginate } = require("../../util/utilFunction")
const util = require('util');
const bcrypt = require('bcryptjs')
const CONFIG = require('../../../config')
const jwt = require('jsonwebtoken');
const mysql = require('mysql')

//promisify db query so that we can improve readability and make error handling easier
const query = util.promisify(db.query).bind(db);

//DONE
const register = async (body, res) => {
    const { username, password, email } = body
    const role_id = 2;
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

//DONE
const login = async (body, res) => {
    // Read username and password from request body
    const { email, password } = body;
    if (!password || !email) {
        respJson(400, null, "Please enter email and password", null, res)
        return;
    }
    console.log(password)
    console.log(email)
    const sql = `SELECT u.id, u.username, u.password, r.role_name
                FROM users AS u
                JOIN roles as r ON u.role_id = r.id
                WHERE u.email = ?`
    // Filter user from the users array by username and password
    try {
        const data = await query(sql, [email]);
        console.log("SQL Query:", mysql.format(sql, [email]));
        console.log(data)
        if (data.length === 0) {
            respJson(401, data, `Invalid email or password`, null, res);
            return;
        }
        const user = data[0];
        console.log(user?.password)

        // Compare passwords
        const passwordMatches = bcrypt.compareSync(password, user.password);
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
//DONE
const logout = async (res, refreshToken) => {
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

const verifyAccessToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return respJson(401, null, "Access denied. No token provided.", null, res);
    }

    try {
        const decoded = jwt.verify(token, CONFIG.SECRET_TOKEN);
        req.user = decoded; // Attach user info to the request
        next(); // Proceed to the next middleware
    } catch (err) {
        respJson(401, null, "Invalid or expired token.", null, res);
    }
};

const refreshAccessToken = async (req, res) => {
    // Read refresh token from the HTTP-only cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        respJson(401, null, "Refresh token is required.", null, res);
        return;
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, CONFIG.REFRESH_SECRET);

        // Check if the refresh token exists in the database
        const tokenSql = `SELECT * FROM refresh_tokens WHERE token = ?`;
        const tokenData = await query(tokenSql, [refreshToken]);

        if (tokenData.length === 0) {
            respJson(401, null, "Invalid or revoked refresh token.", null, res);
            return;
        }

        // Generate a new access token
        const newAccessToken = jwt.sign(
            { id: decoded.id },
            CONFIG.SECRET_TOKEN,
            { expiresIn: '15m' } // Expires in 15 minutes
        );

        // Optionally refresh the refresh token itself
        const newRefreshToken = jwt.sign(
            { id: decoded.id },
            CONFIG.REFRESH_SECRET,
            { expiresIn: '7d' } // Expires in 7 days
        );

        // Update the refresh token in the database
        const updateSql = `
            UPDATE refresh_tokens
            SET token = ?, expires_at = ?
            WHERE token = ?
        `;
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
        await query(updateSql, [newRefreshToken, expiresAt, refreshToken]);

        // Update the refresh token in the cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send the new access token
        respJson(200, { accessToken: newAccessToken }, "Access token refreshed.", null, res);
    } catch (err) {
        respJson(403, null, "Invalid or expired refresh token.", null, res);
    }
};


const revokeAllTokens = async (userId, res) => {
    try {
        const sql = `DELETE FROM refresh_tokens WHERE user_id = ?`;
        const result = await query(sql, [userId]);

        if (result.affectedRows === 0) {
            respJson(400, null, "No active tokens found for this user.", null, res);
            return;
        }

        respJson(200, null, "All tokens revoked for the user.", null, res);
    } catch (err) {
        respJson(500, null, "Internal server error.", null, res);
    }
};



module.exports = {
    register,
    login,
    logout
}

// const isTokenRevoked = async (token) => {
//     const sql = `SELECT * FROM revoked_tokens WHERE token = ?`;
//     const result = await query(sql, [token]);
//     return result.length > 0;
// };

// const revokeAccessToken = async (token) => {
//     const sql = `INSERT INTO revoked_tokens (token) VALUES (?)`;
//     await query(sql, [token]);
// };
// CREATE TABLE revoked_tokens(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     token TEXT NOT NULL,
//     revoked_at DATETIME DEFAULT CURRENT_TIMESTAMP
// );