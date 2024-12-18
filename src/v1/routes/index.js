const express = require("express")
const router = express.Router();
const { showBooks, getBooksbyId, searchBooks, addBooks, updateBooks, deleteBooks } = require("../controller/books-controller")
const { showLogs, getLogsbyId, searchLogsbyUserId, borrowBooks, returnBooks } = require("../controller/logs-controller")
const { calcBorrowedAmount } = require("../controller/calculate-controller")
const { register, login, logout, registerAdmin } = require("../middleware/auth")
const { refreshAccessToken, revokeAllTokens, verifyAccessToken, restrictToAdmin } = require("../middleware/token_management")
/**book**/
//fetch all book data
router.get('/books', (req, res) => {
    const params = req.query
    showBooks(res, params)
})

//search book data
router.get('/searchBooks', (req, res) => {
    const params = req.query
    searchBooks(res, params)
})

//add book
router.post("/addbooks", verifyAccessToken, restrictToAdmin, (req, res) => {
    const body = req.body
    addBooks(res, body,)
})

//fetch detailed book data
router.get("/books/:id", (req, res) => {
    const id = req.params.id
    getBooksbyId(res, id)
})

//delete book data
router.delete("/deletebooks/:id", verifyAccessToken, restrictToAdmin, (req, res) => {
    const id = req.params.id
    deleteBooks(res, id)
})

//edit book data
router.put("/editbooks/:id", verifyAccessToken, restrictToAdmin, (req, res) => {
    const id = req.params.id
    const body = req.body
    updateBooks(res, id, body)
})

/** calculate **/
//calculate borrowed amount
router.post("/calculate/borrowed-amount", (req, res) => {
    const body = req.body
    calcBorrowedAmount(res, body)
})

/**logs**/

//get library lending log
router.get("/logs", (req, res) => {
    const params = req.query
    showLogs(res, params)
})

//fetch detailed lending log
router.get("/logs/:id", verifyAccessToken, restrictToAdmin, (req, res) => {
    const id = req.params.id
    getLogsbyId(res, id)
})

//search lending log by user_id
router.get("/searchLogs/:user_id", verifyAccessToken, restrictToAdmin, (req, res) => {
    const user_id = req.params.user_id
    const params = req.query
    searchLogsbyUserId(res, user_id, params)
})

//record borrowing book
router.post("/borrowbooks", (req, res) => {
    const body = req.body
    borrowBooks(res, body)
})

//record returning book
router.post("/returnbooks", verifyAccessToken, restrictToAdmin, (req, res) => {
    const body = req.body
    returnBooks(res, body)
})

/**Auth***/
//register
router.post("/register", (req, res) => {
    const body = req.body
    register(body, res)
})

//register admin
router.post("/register-admin", verifyAccessToken, restrictToAdmin, (req, res) => {
    const body = req.body
    registerAdmin(body, res)
})

//login
router.post("/login", (req, res) => {
    const body = req.body
    login(body, res)
})

//logout
router.post("/logout", verifyAccessToken, (req, res) => {
    const refreshToken = req.cookies.refreshToken
    logout(res, refreshToken)
})

/**service**/
//csrf
// router.get("/csrf", (req, res) => {
//     res.send("test")
// })
//revoke all tokens
router.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken
    refreshAccessToken(refreshToken, res,)
})

//refresh token
router.post("/revoke-all-tokens/:user_id", verifyAccessToken, restrictToAdmin, (req, res) => {
    const user_id = req.params.user_id
    revokeAllTokens(user_id, res)
})



module.exports = router;