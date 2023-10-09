const express = require("express");
const multer = require("multer");
const path = require("path")
const app = express();
const {db,genId} = require("./db/DbUtils");
const port = 8080;



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == "OPTIONS") res.sendStatus(200);
    else next();
})

app.use(express.json())

const update = multer({
    dest: "./public/upload/temp"
})
app.use(update.any())
app.use(express.static(path.join(__dirname, "public")))

const tokenPath = "/_token"
app.all("*", async (req, res, next) => {
    if (req.path.indexOf(tokenPath) > -1) {
        let token = req.headers.token;
        let tokenSql = "SELECT * FROM `admin` WHERE `token` = ?"
        let tokenResult = await db.async.all(tokenSql, [token])

        if (tokenResult.err != null || tokenResult.rows.length == 0) {
            res.send({
                code: 403,
                msg: "Please log in first"
            })
            return
        } else{
            next()
        }
    } else {
        next()
    }
})

app.use("/admin", require("./router/AdminRouter"))
app.use("/category", require("./router/CategoryRouter"))
app.use("/note", require("./router/NoteRouter"))
app.use("/upload", require("./router/UploadRouter"))

app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.listen(port, () => {
    console.log(`Server has runned on port ${port}`)

})