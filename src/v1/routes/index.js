const express = require("express")
const router = express.Router();
const { showBooks, getBooksbyId, addBooks, updateBooks, deleteBooks } = require("../controller/books-controller")

/**book**/
//fetch all book data
router.get('/books', (req, res) => {
    showBooks(res)
})

//add book
router.post("/addbooks", (req, res) => {
    const body = req.body
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

//borrowing book
router.put("/borrowbooks/:id", (req, res) => {
    res.send("test")
})

//return book
router.put("/returnbooks/:id", (req, res) => {
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