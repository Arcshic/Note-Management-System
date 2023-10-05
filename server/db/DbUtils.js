const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const GenId = require("../utils/SnowFlake");

const db = new sqlite3.Database(path.join(__dirname,"note-database.db"));
const genId = new GenId({WorkerId:1});

module.exports = {
    db,
    genId
}

