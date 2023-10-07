const express = require("express");
const router = express.Router();
const { db, genId } = require("../db/DbUtils");
const fs = require("fs")

router.post("/richEditorUpload", async (req, res) => {
    if (!req.files) {
        res.send({
            "errno": 1,
            "message": "Upload failed"
        })
        return;
    }
    let files = req.files;
    let retFiles = []
    for (let file of files) {
        let fileExt = file.originalname.substring(file.originalname.lastIndexOf(".") + 1)
        let fileName = genId.NextId() + "." + fileExt
        fs.renameSync(process.cwd() + "/public/upload/temp/" + file.filename,
            process.cwd() + "/public/upload/" + fileName)
        retFiles.push("/upload/" + fileName)
    }
    res.send({
        "errno": 0,
        "data": {
            "url": retFiles[0]
        }
    })
})

module.exports = router;