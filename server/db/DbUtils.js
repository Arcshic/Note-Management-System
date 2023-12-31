const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const GenId = require("../utils/SnowFlake");


const db = new sqlite3.Database(path.join(__dirname,"note-database.db"));
const genId = new GenId({WorkerId:1});

db.async = {}

db.async.all = (sql,params) =>{
    return new Promise((resolve,reject)=>{
        db.all(sql,params,(err,rows)=>{
            resolve({err,rows})
        })
    })
}

db.async.run = (sql,params) =>{
    return new Promise((resolve,reject)=>{
        db.all(sql,params,(err,rows)=>{
            resolve({err,rows})
        })
    })
}
module.exports = {
    db,
    genId
}

