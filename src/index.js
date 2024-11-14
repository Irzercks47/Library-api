const express = require("express")
const app = express()
const port = 3000
const v1Route = require("./v1/routes")

app.use("/library/v1", v1Route)

//root
app.listen(port, () => {
    console.log(`Library api listening on port ${port}`)
})
