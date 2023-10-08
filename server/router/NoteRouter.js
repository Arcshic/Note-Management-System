const express = require("express");
const router = express.Router();
const { db, genId } = require("../db/DbUtils");

router.post("/_token/add", async (req,res)=>{
    let {title,categoryId,content} = req.body;
    let id = genId.NextId();
    let create_time = new Date().getTime();
    const insertSql = "INSERT INTO `note`(`id`,`title`,`category_id`,`content`,`create_time`) VALUES (?,?,?,?,?)"
    let params = [id,title,categoryId,content,create_time]

    let{err,rows} = await db.async.run(insertSql,params)
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

router.put("/_token/update", async (req,res)=>{
    let {id,title,categoryId,content} = req.body;
    let create_time = new Date().getTime();
    const updateSql = "UPDATE `note` SET `title` = ?, `content` = ?, `category_id` = ? WHERE `id` = ?"
    let params = [title,content,categoryId,id]

    let{err,rows} = await db.async.run(updateSql,params)
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

router.delete("/_token/delete", async (req,res)=>{
    let id = req.query.id;
    const deleteSql = "DELETE FROM `note` WHERE `id` = ?"
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

router.get("/search", async (req, res) => {
    let { keyword, categoryId, page, pagesize } = req.query
    page = page == null ? 1 : page;
    pagesize = pagesize == null ? 10 : pagesize;
    categoryId = categoryId == null ? 0 : categoryId;
    keyword = keyword == null ? "" : keyword;

    let params = []
    let whereSqls = []
    if (categoryId != 0) {
        whereSqls.push(" `category_id` = ? ")
        params.push(categoryId)
    }
    if (keyword != "") {
        whereSqls.push(" (`title` LIKE ? OR `content` LIKE ?) ")
        params.push("%" + keyword + "%")
        params.push("%" + keyword + "%")
    }

    let whereSqlsSentence = ""
    if (whereSqls.length > 0) {
        whereSqlsSentence = " WHERE " + whereSqls.join(" AND ")
    }

    let searchSqlSentence = " SELECT `id`,`category_id`,`title`,substr(`content`,0,50) AS `content`,`create_time` FROM `note` " + whereSqlsSentence + " ORDER BY `create_time` DESC LIMIT ?,? "
    let searchSqlParams = params.concat([(page - 1)*pagesize,pagesize])
    let searchCount = " SELECT count(*) AS `count` FROM 'note' " + whereSqlsSentence;
    let searchCountParams = params;

    let searchResult = await db.async.all(searchSqlSentence,searchSqlParams)
    let countResult = await db.async.all(searchCount,searchCountParams)
    
    if(searchResult.err == null && countResult.err == null){
        res.send({
            code:200,
            msg:"Search successful",
            data:{
                keyword,
                categoryId,
                page,
                pagesize,
                rows:searchResult.rows,
                count:countResult.rows[0].count
            }
        })
    }else{
        res.send({
            code:500,
            msg:"Search failed"
        })
    }
})

module.exports = router;