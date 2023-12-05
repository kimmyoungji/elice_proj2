require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");

const knex = require("./db/knex");
const testKnex = require("./db/models/modelTestCodes/knex_test");

const {
  addDummyUsers,
  addDummyPlannedH,
  addDummyFulfilledH,
} = require("./db/models/modelTestCodes/dummy_data");

//라우터 가져오기
const introRouter = require("./routers/introRouter");
const usersRouter = require("./routers/usersRouter");
const fulfilledHabitsRouter = require("./routers/fulfilledHabitsRouter");
const plannedHabitsRouter = require("./routers/plannedHabitsRouter");
const userService = require("./services/usersService");

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
// addDummyUsers(50);
// addDummyPlannedH(40);
// addDummyFulfilledH(50);

// 라우터
app.use("/graphs", introRouter);
app.use("/users", usersRouter);
app.use("/planned-habits", plannedHabitsRouter);
app.use("/fulfilled-habits", fulfilledHabitsRouter);

// 에러처리 미들웨어
app.use(errorMiddleware);

// Start the Express server
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});

//for testing redis
// const { createClient } = require("redis");
// const client = createClient({
//   password: "6PPm1yruyMlCM22RFT9cyCiRYmqpd0tN",
//   socket: {
//     host: "redis-11620.c54.ap-northeast-1-2.ec2.cloud.redislabs.com",
//     port: 11620,
//   },
// });
// client.on("error", (err) => console.log("Redis Client Error", err));
// async function connectRedis(client) {
//   await client.connect().then(async (res) => {
//     console.log(res);
//     console.log("redis connected");
//   });
//   // key-value
//   await client.set("bike:1", "Process 1");
//   await client.set("bike:2", "Process 2");
//   await client.set("bike:3", "Process 3");
//   await client.set("bike:4", "Process 4");
//   const value = await client.get("bike:1");
//   console.log(value);
//   // key-object : hash
//   const fieldsAdded = await client.hSet("bike:5", {
//     model: "Deimos",
//     brand: "Ergonom",
//     type: "Enduro bikes",
//     price: 4972,
//   });
//   const price = await client.hGet("bike:5", "price");
//   console.log(`Price: ${price}`);
//   const bike = await client.hGetAll("bike:5");
//   console.log(bike);
// }
// connectRedis(client);
