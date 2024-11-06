const express = require("express")
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Hello biatch!!!")
})

app.post("/test", (req, res) => {
    console.log(req.body)
    res.send("success")
})

app.listen(port, () => {
    console.log(`Library api listening on port ${port}`)
})

//test push