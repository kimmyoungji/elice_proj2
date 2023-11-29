const express = require("express");
require("dotenv").config();
const knex = require("./db/knex");
const UsersModel = require("./db/models/users");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
//라우터 가져오기
const userRouter = require("./routers/userRouter");

// express 연결하기
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Your Express routes and middleware go here
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//test kenx
const testKnex = async () => {
  const result = await knex.select("*").from("users").limit(3);
  // const result = await knex("users").insert({ user_id: "54321" }, ["user_id"]);
  console.log("testKnex", result);
  return;
};
testKnex();

app.use(userRouter);

app.use(errorMiddleware);

// Start the Express server
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});
