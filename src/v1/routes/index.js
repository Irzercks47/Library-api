const express = require("express")
const router = express.Router();
const { showBooks, getBooksbyId, addBooks, updateBooks, deleteBooks } = require("../controller/books-controller")
const { showLogs, borrowbooks } = require("../controller/logs-controller")

/**book**/
//fetch all book data
router.get('/books', (req, res) => {
    showBooks(res)
})

//add book
router.post("/addbooks", (req, res) => {
    const body = req.body
    // console.log(body)
    addBooks(res, body)
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

router.get("/logs", (req, res) => {
    showLogs(res)
})

//borrowing book
router.post("/borrowbooks/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    borrowbooks(res, id, body)
})

//return book
router.post("/returnbooks/:id", (req, res) => {
    res.send("test")
})

//get library lending log
router.get("/logs", (req, res) => {
    res.send("test")
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