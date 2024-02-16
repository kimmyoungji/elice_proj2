const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");
const testKnex = require("./db/models/modelTestCodes/knex_test");
const {
  addDummyUsers,
  addDummyPlannedH,
  addDummyFulfilledH,
} = require("./db/models/modelTestCodes/dummy_data");
dotenv.config({path: path.resolve(__dirname,"../.env")})

//라우터 가져오기
const introRouter = require("./routers/introRouter");
const usersRouter = require("./routers/usersRouter");
const fulfilledHabitsRouter = require("./routers/fulfilledHabitsRouter");
const plannedHabitsRouter = require("./routers/plannedHabitsRouter");
const dayjs = require("dayjs");
const tz = require("dayjs/plugin/timezone");
dayjs.extend(tz);

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
// addDummyUsers(1, 200);
// addDummyPlannedH(500);
// addDummyFulfilledH(5000);

// 라우터
app.use("/graphs", introRouter);
app.use("/users", usersRouter);
app.use("/planned-habits", plannedHabitsRouter);
app.use("/fulfilled-habits", fulfilledHabitsRouter);

// 에러처리 미들웨어
app.use(errorMiddleware);

module.exports = app;