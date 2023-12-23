const userRouter = require("express").Router();
const userService = require("../services/userService");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const { cookieOption, cookieOption2 } = require("../lib/cookieOption.js");
const { INVALID_USER_Error, BadRequestError } = require("../lib/custom-error.js");
const bcrypt = require("bcrypt");

// 회원가입
userRouter.post('/', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new BadRequestError("필수적인 정보가 입력되지 않았습니다");
    }

    await userService.addUser(username, email, password);

    res.status(200).send({
      message: "DB 데이터 추가 성공",
    });
  } catch (err) {
    next(err);
  }

});

// 로그인
userRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadReaquestError("필수 정보가 입력되지 않았습니다.")
        }

        const user = await userService.getUserByEmail(email);

        const isPwCorrect = await userService.verifyPassword(user, password);
        if (!isPwCorrect) throw new INVALID_USER_Error("잘못된 비밀번호입니다.");
        // jwt 생성
        const accessToken = await userService.getAccessToken(user);
        // cookie 전송
        res.cookie("accessToken", accessToken, cookieOption);
    
        // 응답
        res.status(200).json({
          message: "로그인 성공",
          user: {
            username: user.username,
            email: user.email,
            level: user.level,
            // img_url: user.img_url,
          },
        });
      } catch (err) {
        next(err);
      }
});

// 커뮤니티-모든 거북이 불러오기
userRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    // 요청 바디 데이터 가져오기
    const user_id = req.query.userId;
    const limit = req.query.limit;
    // 모든 사용자 데이터 가져오기
    let users = await userService.getUsers(user_id, limit);

    // 응답
    res.status(200).send({
      message: "DB 데이터 조회 성공",
      users,
    });
  } catch (err) {
    next(err);
  }
});


// 유저 정보 조회하기
userRouter.get("/user", isLoggedIn, async (req, res, next) => {
    try {
      const user_id = req.currentUserId;
  
      const user = await userService.getUserById(user_id);
      const level = await userService.setAndgetUserLevel(user_id);
      console.log(user);
      user.level = level;
  
      res.status(200).send({
        message: "DB 데이터 조회 성공",
        user,
      });
    } catch (err) {
      next(err);
    }
  });

// UPDATE
userRouter.put("/", isLoggedIn, //upload.single("file"),
  async (req, res, next) => {
    try {
      // 요청 쿠키, 바디에서 값 받아오기
      const user_id = req.currentUserId;
      console.log('user_id', user_id);
      let { username, password } = req.body;
      if (!username && !password) {
        throw new BadRequestError("업데이트할 정보를 전달해주세요!");
      }

      if (password) {
        password = await bcrypt.hash(password, 10);
      }

      const img_url = req.file ? req.file.location : "";
      const toUpdate = { username, password, img_url };
      // 현재 사용자 정보 수정하기
      await userService.setUser(user_id, toUpdate);

      // 응답
      res.status(200).send({
        message: "DB 데이터 수정 성공",
      });
    } catch (err) {
      next(err);
    }
  }
);


userRouter.get("/logout", isLoggedIn, async (req, res, next) => {
  try {
    res.cookie("accessToken", "", cookieOption2);
    res.status(200).json({
      message: "로그아웃 성공",
    });
  } catch (err) {
    next(err);
  }
});

userRouter.delete("/", isLoggedIn, async (req, res, next) => {
  try {
    // cookie에서 user_id 받아오기
    const user_id = req.currentUserId;

    // 현재 사용자 데이터 삭제
    await userService.deleteUserInfoById(user_id);

    //응답
    res.status(200).send({
      message: "DB 데이터 삭제 성공",
    });
  } catch (err) {
    next(err);
  }
});

  

module.exports = userRouter;