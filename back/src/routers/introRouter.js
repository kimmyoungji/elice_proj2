const { Router } = require("express");
const db = require('../config/db');
const router = Router();


router.get("/", async (req, res, next) => {
  try {
    db.query('SELECT * FROM intro', (error, data) => {
        let result = data[0].data
          console.log('데이터 조회 성공', result)
          result = JSON.parse(result);
          res.status(200).json({
            message:
              "인포그래픽 데이터 전송 성공: [0]koreaTrashGraph, [1]worldOceanPlasticsGraph",
            data: [result.koreaTrashGraph, result.worldOceanPlasticsGraph],
          });
      })
  } catch (error) {
    console.error("Error in introRouter", error.stack);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});


module.exports = router;
