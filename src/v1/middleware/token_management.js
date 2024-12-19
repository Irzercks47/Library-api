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

const refreshAccessToken = async (cookies, res) => {
    // Read refresh token from the HTTP-only cookie
    const { refreshToken } = cookies;

    if (!refreshToken) {
        respJson(401, null, "Refresh token is required.", null, res);
        return;
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, CONFIG.REFRESH_SECRET);

        // // Check if the refresh token exists in the database
        const tokenSql = `SELECT * FROM refresh_tokens WHERE user_id = ?`;
        const tokenData = await query(tokenSql, [decoded.id]);

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


const revokeAllTokens = async (user_id, res) => {
    try {
        if (!user_id) {
            respJson(401, null, "there is no user id", null, res);
            return;
        }

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

const restrictToAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') { // Check the role attached by `verifyAccessToken`
        return respJson(403, null, "Access denied. Admins only.", null, res);
    }
    next(); // Proceed if the user is an admin
};

module.exports = {
    verifyAccessToken,
    refreshAccessToken,
    revokeAllTokens,
    restrictToAdmin
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