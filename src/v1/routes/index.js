const express = require("express")
const router = express.Router();

/**book**/
//fetch all book data
router.get('/books', (req, res) => {
    res.send("Hello biatch!!!")
})

//add book
router.post("/addbook", (req, res) => {
    console.log(req.body)
    res.send("success")
})

//fetch detailed book data
router.get("/book/:id", (req, res) => {
    res.send("test")
})

//delete book data
router.delete("/deletebook", (req, res) =>{
    res.send("test")
})

//borrowing book
router.put("/borrowbook", (req, res) => {
    res.send("test")
})

//return book
router.put("/returnbook", (req, res) => {
    res.send("test")
})

//get library lending log
router.get("/log", (req, res) => {
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