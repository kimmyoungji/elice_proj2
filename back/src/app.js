require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");

const knex = require("./db/knex");
const testKnex = require("./db/models/modelTestCodes/knex_test");

//라우터 가져오기
const introRouter = require("./routers/introRouter");
const usersRouter = require("./routers/usersRouter");
const fulfilledHabitsRouter = require("./routers/fulfilledHabitsRouter");
const plannedHabitsRouter = require("./routers/plannedHabitsRouter");

//라우터 가져오기
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

// 라우터
app.use("/graphs", introRouter);
app.use(usersRouter);
app.use(plannedHabitsRouter);
app.use("/fulfilledHabits", fulfilledHabitsRouter);
// 에러처리 미들웨어
app.use(errorMiddleware);

// Start the Express server
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});