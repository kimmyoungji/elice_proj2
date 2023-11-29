const userRouter = require("express").Router();
const knex = require("../db/knex");
const UsersModel = require("../db/models/users");
const { NotFoundError } = require("../lib/custom-error");
const users = new UsersModel(knex);
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// GET /users/login
userRouter.get("/users/login", (req, res, next) => {
  try {
    // cookie에서 email, password 받아오기
    // FindByEmail로 유저 조회
    // password 검증
    // cookie 전송
    // OR
    // passport.authenticate() 함수 호출하여 후속처리
  } catch (err) {
    next(err);
  }
});

// GET /users/user
userRouter.get("/users/user", async (req, res, next) => {
  try {
    // 요청 쿠키 데이터 가져오기
    const { user_id } = req.cookies;
    // DB:  user_id로 users 조회
    const result = await users.findById(user_id);
    // 응답 데이터 구성하기
    delete result[0].password;

    // 빈 배열일 경우 에러처리
    if (result.length === 0) {
      throw new NotFoundError("데이터가 존재하지 않습니다.");
    }

    // 응답
    res.send({
      statusCode: 200,
      message: "DB 데이터 조회 성공",
      data: {
        user: result,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /users
userRouter.get("/users", async (req, res, next) => {
  try {
    // DB: 모든 users 조회
    let userArr = await users.findById();
    // 응답 데이터 구성하기
    userArr = userArr.map((user) => {
      delete user.password;
      return user;
    });

    // 응답
    res.send({
      statusCode: 200,
      message: "db 조회 성공",
      data: {
        users: userArr,
      },
    });
  } catch (err) {
    next(err);
  }
});

// POST /users
userRouter.post("/users", async (req, res, next) => {
  try {
    // 요청 바디 데이터 가져오기
    const { username, email, password } = req.body;
    // 응답 데이터 구성하기
    const user_id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      user_id,
      username,
      email,
      password: hashedPassword,
      level: 0,
    };
    // DB: user 데이터 DB에 추가하기
    await users.create(newUser); //왜 반환 값이 0이 나올까?..

    //응답
    res.send({
      statusCode: 200,
      message: "DB 데이터 추가 성공",
      data: { result },
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /users
userRouter.delete("/users", async (req, res, next) => {
  try {
    // cookie에서 user_id 받아오기
    const user_id = req.cookies.user_id;
    // DB: db 데이터 삭제
    const result = await users.deleteById(user_id);

    //응답
    res.send({
      statusCode: 200,
      message: "DB 데이터 삭제 성공",
      data: { result },
    });
  } catch (err) {
    next(err);
  }
});

// UPDATE /users
userRouter.put("/users", async (req, res, next) => {
  try {
    // 요청 쿠키, 바디에서 값 받아오기
    const user_id = req.cookies.user_id;
    const toUpdate = { ...req.body };
    console.log(user_id, toUpdate);
    // DB: DB 데이터 수정하기
    const result = await users.update(user_id, toUpdate);

    // 응답
    res.send({
      statusCode: 200,
      message: "DB 데이터 수정 성공",
      data: { result },
    });
    console.log(result);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
