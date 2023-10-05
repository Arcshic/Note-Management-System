const express = require("express");
const router = express.Router();
const {db,genId} = require("../db/DbUtils");

router.get("/test",(req,res)=>{
    db.all("SELECT * FROM `admin`",[],(err,rows)=>{
        console.log(rows);
    })
    res.send({
        id:genId.NextId(),

    })
})

module.exports =router;