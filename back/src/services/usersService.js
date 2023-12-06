const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const knex = require("../db/knex");
const UsersModel = require("../db/models/users");
const users = new UsersModel(knex);
const { NotFoundError, INVALID_USER_Error } = require("../lib/custom-error");

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
    try {
      return await knex.transaction(async (trx) => {
        users.setTrx(trx);
        const result = await users.findByEmail(email);
        const user = result[0];
        if (!user) {
          throw new INVALID_USER_Error("등록되지 않은 이메일입니다.");
        }
        return user;
      });
    } catch (err) {
      throw err;
    }
  }

  static async getUserById(user_id) {
    try {
      return await knex.transaction(async (trx) => {
        // DB: transaction 객체전달하기
        users.setTrx(trx);
        // DB: user_id로 users 조회
        const result = await users.findById(user_id);
        // 빈 배열일 경우 에러처리
        if (result.length === 0) {
          throw new NotFoundError("데이터가 존재하지 않습니다.");
        }
        // 응답 데이터 구성하기
        delete result[0].user_id;
        delete result[0].password;
        return result;
      });
    } catch (err) {
      throw err;
    }
  }

  static async getUsers(user_id, limit) {
    try {
      return await knex.transaction(async (trx) => {
        // DB: transaction 객체전달하기
        users.setTrx(trx);
        let userArr = await users.findByCursor(user_id, limit);

        // 빈 배열일 경우 에러처리
        if (userArr.length === 0) {
          throw new NotFoundError("데이터가 존재하지 않습니다.");
        }

        return userArr;
      });
    } catch (err) {
      // 여기가 실행된면 트랜젝션이 rollback 된것이다.
      throw err;
    }
  }

  static async setAndGetUserLevel(user_id) {
    try {
      return await knex.transaction(async (trx) => {
        // DB: transaction 객체전달하기
        users.setTrx(trx);
        let level = await users.updateLevel(user_id);

        return level;
      });
    } catch (err) {
      // 여기가 실행된면 트랜젝션이 rollback 된것이다.
      throw err;
    }
  }

  static async addUser(username, email, password) {
    try {
      return await knex.transaction(async (trx) => {
        // DB: transaction 객체전달하기
        users.setTrx(trx);
        // 응답 데이터 구성하기
        // const user_id = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          username,
          email,
          password: hashedPassword,
        };

        // DB: user 데이터 DB에 추가하기
        await users.create(newUser); //왜 반환 값이 0이 나올까?..
      });
    } catch (err) {
      throw err;
    }
  }

  static async setUser(user_id, toUpdate) {
    try {
      return await knex.transaction(async (trx) => {
        // DB: transaction 객체전달하기
        users.setTrx(trx);
        // DB: DB 데이터 수정하기
        await users.update(user_id, toUpdate);
      });
    } catch (err) {
      throw err;
    }
  }

  static async deleteUserInfoById(user_id) {
    try {
      return await knex.transaction(async (trx) => {
        // DB: transaction 객체전달하기
        users.setTrx(trx);
        // DB: 데이터 삭제하기
        await users.deleteById(user_id);
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = userService;
