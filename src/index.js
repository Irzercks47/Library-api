const express = require("express")
const app = express()
const v1Route = require("./v1/routes")
const CONFIG = require("../config.js")
const bodyParser = require("body-parser");

app.use(bodyParser.json())
const port = CONFIG.PORT
app.use("/v1", v1Route)

//root
app.listen(port, () => {
    console.log(`Library api listening on port ${port}`)
})
