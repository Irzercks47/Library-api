const express = require("express")
const router = express.Router();
const { showBooks, getBooksbyId, searchBooks, addBooks, updateBooks, deleteBooks, calcAmount } = require("../controller/books-controller")
const { showLogs, getLogsbyId, searchLogsbyUserId, borrowBooks, returnBooks } = require("../controller/logs-controller")

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
router.post("/addbooks", (req, res) => {
    const body = req.body
    addBooks(res, body,)
})

//fetch detailed book data
router.get("/books/:id", (req, res) => {
    const id = req.params.id
    getBooksbyId(res, id)
})

//delete book data
router.delete("/deletebooks/:id", (req, res) => {
    const id = req.params.id
    deleteBooks(res, id)
})

//edit book data
router.put("/editbooks/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    updateBooks(res, id, body)
})

//calculate amount
router.post("/calculate-amount", (req, res) => {
    const body = req.body
    calcAmount(res, body)
})

/**logs**/

//get library lending log
router.get("/logs", (req, res) => {
    const params = req.query
    showLogs(res, params)
})

//fetch detailed lending log
router.get("/logs/:id", (req, res) => {
    const id = req.params.id
    getLogsbyId(res, id)
})

//search lending log by user_id
router.get("/searchLogs/:user_id", (req, res) => {
    const user_id = req.params.user_id
    console.log(user_id)
    const params = req.query
    searchLogsbyUserId(res, user_id, params)
})

//record borrowing book
router.post("/borrowbooks/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    borrowBooks(res, id, body)
})

//record returning book
router.post("/returnbooks/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    returnBooks(res, id, body)
})

/**Auth***/
//register
//login


/**service**/
//csrf
router.get("/csrf", (req, res) => {
    res.send("test")
})


module.exports = router;