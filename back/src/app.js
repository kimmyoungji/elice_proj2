require("dotenv").config();
const express = require("express");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

const introRouter = require("./routers/introRouter");
// const calenderRouter = require("./routers/calenderRouter");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

const connectDB = require("./middlewares/connectDB");
app.get("/", connectDB, async (req, res, next) => {
  try {
    await req.connectDB;
    res.send("turtine에 오신걸 환영합니다 야호");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});

app.use("/graphs", introRouter);
// app.use("/calender", calenderRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});
