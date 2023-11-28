const express = require("express");
require("dotenv").config();
const testPromisePool = require("./db/db");
const User = require("./db/models/users");

const app = express();

// Your Express routes and middleware go here
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// pool을 통한 DB연결 테스트
// testPromisePool();

//User 테이블 연결 테스트
const result = User.findOne("123abc");
console.log(result);

// Start the Express server
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});
