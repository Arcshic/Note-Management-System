const express = require("express");
const multer = require("multer");
const app = express();
const port = 8080;


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if(req.method == "OPTIONS") res.sendStatus(200);
    else next();
})

app.use(express.json())

const update = multer({
    dest:"./public/upload/temp"
})
app.use(update.any())
app.use("/test",require("./router/TestRouter"))
app.use("/admin",require("./router/AdminRouter"))

app.get("/",(req,res)=>{
    res.send("Hello World!")
})
app.listen(port,()=>{
    console.log(`Server has runned on port ${port}`)

})