const { Router } = require("express");
const connectDB = require("../middlewares/connectDB");
const router = Router();

// router.get("/", connectDB, (req, res, next) => {
//   // Access the database connection from the request object
//   const connection = req.dbConnection;
//   const exQuery = (query) => {
//     return new Promise((res, rej) => {
//       connection.query(query, (err, results, fields) => {
//         if (err) {
//           rej(err);
//         }
//         res(results);
//       });
//     });
//   };
//   Promise.all([
//     exQuery("SELECT * FROM intro2"),
//     exQuery("SELECT * FROM intro3"),
//   ])
//     .then((result) => res.send(result))
//     .finally(() => {
//       connection.release();
//     });
// });

router.get("/", connectDB, (req, res, next) => {
  // Access the database connection from the request object
  const connection = req.dbConnection;
  console.log("get graphs is working");
  connection.query("SELECT * FROM intro;", (error, result, fields) => {
    console.log(error, result, fields);
    const global = result[0].global;
    const korea = result[0].korea;
    res.json([global, korea]);
  });
  connection.release();
  console.log("connection pool released");
});

module.exports = router;
