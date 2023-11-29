const express = require("express");
require("dotenv").config();
const knex = require("./db/knex");
const UsersModel = require("./db/models/users");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const testKnex = require("./db/models/modelTestCodes/knex_test");
const cors = require("cors");
//라우터 가져오기
const userRouter = require("./routers/userRouter");

// express 연결하기
const app = express();

// 필요한 미들웨어 연결
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    credentials: true,
  })
);

// knex 연결 test
testKnex();

// Your Express routes and middleware go here
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 라우터
app.use(userRouter);
// 에러처리 미들웨어
app.use(errorMiddleware);

// Start the Express server
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});
