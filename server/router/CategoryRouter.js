const express = require("express");
const router = express.Router();
const {db,genId} = require("../db/DbUtils");

router.post("/add", async (req,res)=>{
    let {name} = req.body
    const insertSql = "INSERT INTO `category` (`id`,`name`) VALUES (?,?)"
    let {err,rows} = await db.async.run(insertSql,[genId.NextId(),name])
    if(err==null){
        res.send({
            code:200,
            msg:"Add successful",
        })
    } else {
        res.send({
            code:500,
            msg:"Add failed"
        })
    }
})

router.put("/update", async (req,res)=>{
    let {id,name} = req.body
    const updateSql = "UPDATE `category` SET `name` = ? WHERE `id` = ?"
    let {err,rows} = await db.async.run(updateSql,[name,id])
    if(err==null){
        res.send({
            code:200,
            msg:"Update successful",
        })
    } else {
        res.send({
            code:500,
            msg:"Update failed"
        })
    }
})

router.delete("/delete", async (req,res)=>{
    let id = req.query.id;
    const deleteSql = "DELETE FROM `category` WHERE `id` = ?"
    let {err,rows} = await db.async.run(deleteSql,[id])
    if(err==null){
        res.send({
            code:200,
            msg:"Delete successful",
        })
    } else {
        res.send({
            code:500,
            msg:"Delete failed"
        })
    }
})

router.get("/list", async (req,res)=>{
    const searchSql = "SELECT * FROM `category`"
    let {err,rows} = await db.async.all(searchSql,[])
    if(err==null){
        res.send({
            code:200,
            msg:"Search successful",
            rows
        })
    } else {
        res.send({
            code:500,
            msg:"Search failed"
        })
    }
})

module.exports =router;