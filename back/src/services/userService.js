const User = require('../models/Users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    static async addUser(username, email, password) {
        try {
              const hashedPassword = await bcrypt.hash(password, 10);
              const newUser = {
                username,
                email,
                password: hashedPassword,
              };
              await User.add(newUser);
          } catch (err) {
            throw err;
          }
      
    }
    
    static async getUserByEmail(email) {
        try {
            const result = await User.findByEmail(email);
            const user = result[0];
            if (!user) {
                throw new INVALID_USER_Error("등록되지 않은 이메일입니다.");
            }
            return user;
        } catch (err) {
            throw err;
        }
    }
    
    static async getUserById(user_id) {
        try {
            const result = await User.findUserById(user_id);
            console.log('result', result)
            return result
        } catch (err) {
            throw err;
        }
    }
    ///
    static async getUsers(user_id, limit) {
        try {
            let userArr = await User.findByCursor(user_id, limit);
            if (userArr.length === 0) {
            throw new NotFoundError("데이터가 존재하지 않습니다.");
            }
            return userArr;
        } catch (err) {
            throw err;
        }
    }

    static async setAndgetUserLevel(user_id) {
        try {
            const countPacket = await fulfilledHabits.countByUserId(user_id);
            let count = countPacket[0].count;
    
            let level = 1;
            switch (true) {
              case count >= 75:
                level = 5;
                break;
              case count >= 50:
                level = 4;
                break;
              case count >= 25:
                level = 3;
                break;
              case count >= 10:
                level = 2;
                break;
              case count >= 5:
                level = 1;
                break;
              default:
                level = 1;
            }
            await User.updateLevel(user_id, level).then((res) => {
              console.log(res, "레벨 업데이트 완료");
            });
            return level;
        } catch (err) {
          throw err;
        }
      }
    

    static async setUser(user_id, toUpdate) {
        try {
            // const { username } = toUpdate;
            // const exUsername = await User.findUsername(user_id);
            // const updateSet =
            // exUsername === username ? { password, img_url } : toUpdate;
            
            await User.update(user_id, toUpdate);

        } catch (err) {
            throw err;
        }
    }

    static async deleteUserInfoById(user_id) {
        try {
            await User.deleteById(user_id);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = userService;