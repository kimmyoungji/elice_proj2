require("dotenv").config();
const express = require("express");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddleware");

const introRouter = require("./routers/introRouter");
const calenderRouter = require("./routers/calenderRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

const connectDB = require("./middlewares/connectDB");
app.get("/", connectDB, async (req, res, next) => {
  //연결 테스트 입니다. 콘솔에 "Connected to the turtineDB." 가 찍히면 연결 성공입니다.
  try {
    await req.connectDB;
    res.send("turtine에 오신걸 환영합니다 야호");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});

app.use("/graphs", introRouter);
app.use("/fulfilled_habits", calenderRouter);

app.use(errorMiddleware);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});
