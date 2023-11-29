const express = require("express");
require("dotenv").config();

const app = express();
const mysql = require("mysql2");

console.log(process.env.SERVER_PORT);

// Create a MySQL connection
const pool = mysql.createPool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
});

// test connection
// pool.getConnection((error, connection) => {
//   connection.connect(function (err) {
//     if (err) {
//       console.error("Database connection failed: " + err.stack);
//       connection.release();
//       return;
//     }
//     console.log("Connected to database.");
//     connection.query("USE turtine;", (error, result, fields) => {
//       console.log(error, result, fields);
//     });
//     connection.release();
//     console.log("connection pool released");
//   });
// });

// Your Express routes and middleware go here
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// test query
// app.get("/users", (req, res) => {
//   console.log("get users is working");
//   pool.getConnection((error, connection) => {
//     connection.connect(function (err) {
//       if (err) {
//         console.error("Database connection failed: " + err.stack);
//         connection.release();
//         return;
//       }
//       console.log("Connected to database.");
//       connection.query("USE turtine");
//       connection.query("SELECT * FROM users;", (error, result, fields) => {
//         console.log(error, result, fields);
//       });
//       connection.release();
//       console.log("connection pool released");
//     });
//   });
// });

// // Start the Express server
// app.listen(process.env.SERVER_PORT, () => {
//   console.log(
//     `Server is running on http://localhost:${process.env.SERVER_PORT}`
//   );
// });

module.exports = pool;
