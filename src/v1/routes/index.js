const express = require("express")
const router = express.Router();
const { showBooks, getBooksbyId, searchBooks, addBooks, updateBooks, deleteBooks } = require("../controller/books-controller")
const { showLogs, getLogsbyId, borrowBooks, returnBooks } = require("../controller/logs-controller")

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

//fetch detailed lending log
router.get("/logs/:id", (req, res) => {
    const id = req.params.id
    getLogsbyId(res, id)
})

//get library lending log
router.get("/logs", (req, res) => {
    const params = req.query
    showLogs(res, params)
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