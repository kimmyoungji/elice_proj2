import { Router } from "express";
const userRouter = Router();

// create
userRouter.post("/users", async function (req, res, next) {
  // users TABLE에 새로운 유저 정보 추가하기
});

// read
userRouter.get("/users/:user_id", async function (req, res, next) {});

// update

// delete
