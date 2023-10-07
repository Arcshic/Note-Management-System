const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const {db,genId} = require("../db/DbUtils");

router.post("/login",async (req,res)=>{
    let {account,password} = req.body;
    let {err,rows} = await db.async.all("SELECT * FROM `admin` WHERE `account` = ? AND `password` = ?",[account,password])
    if(err == null && rows.length>0){
        let loginToken = uuidv4();
        let updateTokenSql = "UPDATE `admin` SET `token` = ? WHERE `id` = ?"

        await db.async.run(updateTokenSql,[loginToken,rows[0].id])

        let adminInfo = rows[0]
        adminInfo.token = loginToken
        adminInfo.password = ""
        res.send({
            code:200,
            msg:"log in successful",
            data:adminInfo
        })
    } else{
        res.send({
            code:500,
            msg:"log in failed"
        })
    }
})

module.exports =router;