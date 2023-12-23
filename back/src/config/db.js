const mysql = require('mysql');

const db = mysql.createConnection({
    host: "database-project2.cl4i2saqfzky.ap-northeast-2.rds.amazonaws.com",
    user: "yurim",
    password: "yurim0511",
    database: "turtine"
})

db.connect();

module.exports = db;