const express = require("express")
const router = express.Router();
const { showBooks } = require("../controller/books-controller")

/**book**/
//fetch all book data
router.get('/books', (req, res) => {
    showBooks(res)
})

//add book
router.post("/addbooks", (req, res) => {
    console.log(req.body)
    res.send("success")
})

//fetch detailed book data
router.get("/books/:id", (req, res) => {
    res.send("test")
})

//delete book data
router.delete("/deletebooks/:id", (req, res) => {
    res.send("test")
})

//edit book data
router.put("/editbooks/:id", (req, res) => {
    res.send("test")
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