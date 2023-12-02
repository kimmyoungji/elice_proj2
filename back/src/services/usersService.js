const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const knex = require("../db/knex");
const UsersModel = require("../db/models/users");
const users = new UsersModel(knex);
const {
  NotFoundError,
  INVALID_USER_Error,
  ConflictError,
} = require("../lib/custom-error");

class userService {
  static async getAccessToken(user) {
    return jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        algorithm: "HS256", // 암호화 알고리즘
        expiresIn: 60 * 60 * 24, // 유효기간
      }
    );
  }

  static async verifyPassword(user, password) {
    const correctPasswordHash = user.password;
    return await bcrypt.compare(password, correctPasswordHash);
  }

  static async getUserByEmail(email) {
    const result = await users.findByEmail(email);
    const user = result[0];
    if (!user) {
      throw new INVALID_USER_Error("등록되지 않은 이메일입니다.");
    }
    return user;
  }

  static async getUserById(user_id) {
    // DB: user_id로 users 조회
    const result = await users.findById(user_id);
    // 빈 배열일 경우 에러처리
    if (result.length === 0) {
      throw new NotFoundError("데이터가 존재하지 않습니다.");
    }
    // 응답 데이터 구성하기
    delete result[0].password;
    return result;
  }

  static async getUsersAll() {
    // DB: 모든 users 조회
    let userArr = await users.findById();

    // 응답 데이터 구성하기
    userArr = userArr.map((user) => {
      delete user.password;
      return user;
    });

    // 빈 배열일 경우 에러처리
    if (userArr.length === 0) {
      throw new NotFoundError("데이터가 존재하지 않습니다.");
    }

    return userArr;
  }

  static async addUser(username, email, password) {
    try {
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
    } catch (err) {
      const errStr = JSON.stringify(err.message);
      if (errStr.includes("ER_DUP_ENTRY")) {
        if (errStr.includes("for key 'users.username'")) {
          next(new ConflictError("이미 사용중인 사용자명입니다."));
        } else if (errStr.includes("for key 'users.email'")) {
          next(new ConflictError("이미 등록된 이메일입니다."));
        }
      }
    }
  }

  static async setUser(user_id, toUpdate) {
    // DB: DB 데이터 수정하기
    await users.update(user_id, toUpdate);
  }

  static async deleteUserInfoById(user_id) {
    await users.deleteById(user_id);
  }
}

module.exports = userService;
