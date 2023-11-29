const { Router } = require("express");
const connectDB = require("../middlewares/connectDB");
const router = Router();

router.get("/", connectDB, async (req, res, next) => {
  try {
    //connectDB 미들웨어가 전달한 request obj를 사용해 db에 연결합니다.
    const connection = req.dbConnection;
    console.log("get graphs is working");

    const getGraphData = await connection.query("SELECT * FROM intro;");
    const data = await JSON.parse(getGraphData[0][0].data);
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
  } finally {
    if (req.dbConnection) {
      req.dbConnection.release();
      console.log("connection pool released");
    }
  }
});

module.exports = router;
