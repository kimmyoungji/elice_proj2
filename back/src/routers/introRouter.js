const { Router } = require("express");
const connectDB = require("../middlewares/connectDB");
const router = Router();

// // SQL2 라이브러리를 사용해 DB 연결하고 SQL 문 사용하여 데이터 조작
// router.get("/", connectDB, async (req, res, next) => {
//   try {
//     //connectDB 미들웨어가 전달한 request obj를 사용해 db에 연결합니다.
//     const connection = req.dbConnection;
//     console.log("get graphs is working");

//     const getGraphData = await connection.query("SELECT * FROM intro;"); //intro 테이블에 string 형태로 저장된 json 데이터 조회
//     const data = JSON.parse(getGraphData[0][0].data); //json타입 으로 형변환
//     console.log(data);
//     res.json({
//       body: {
//         status: 200,
//         message: "인포그래픽 데이터 전송 성공",
//         data: data,
//       },
//     });
//   } catch (error) {
//     console.error("Error in introRouter", error.stack);
//     res.status(500).json({
//       body: {
//         status: 500,
//         message: "Internal Server Error",
//         data: null,
//       },
//     });
//   } finally {
//     if (req.dbConnection) {
//       req.dbConnection.release();
//       console.log("connection pool released");
//     }
//   }
// });

//Knex Query Builder 사용하여 DB 연결
router.get("/", connectDB, async (req, res, next) => {
  try {
    //connectDB 미들웨어가 전달한 request obj를 사용해 db에 연결하고, intro 테이블에서 string 형태로 저장된 json 데이터 조회
    const result = await req.dbConnection.select("*").from("intro");
    const data = JSON.parse(result[0].data); //json타입 으로 형변환
    console.log(data);
    res.json({
      body: {
        status: 200,
        message: "인포그래픽 데이터 전송 성공",
        data: data,
      },
    });
  } catch (error) {
    console.error("Error in introRouter", error.stack);
    res.status(500).json({
      body: {
        status: 500,
        message: "Internal Server Error",
        data: null,
      },
    });
  }
});

module.exports = router;
