const db = require('../config/db');
const selectQuery = 'SELECT * FROM users'

class User {
    static async add(newUser) {
      const user = [newUser.username, newUser.email, newUser.password];
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
      db.query(query, user, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          console.log('유저 추가 성공')
        }
      })
    }

    static async findByEmail(email) {
      return new Promise((res, rej) => {
        db.query(`${selectQuery} WHERE email=?`, email, (error, data) => {
          if (error) {
            rej(error);
          } else {
            console.log('data', data);
            res(data);
          }
        });
      })
    }

    static async findUserById(user_id) {
      return new Promise((res, rej) => {
        db.query(`${selectQuery} WHERE user_id=?`, user_id, (error, data) => {
          if (error) {
            rej(error);
          } else {
            console.log('data', data);
            res(data);
          }
        });
      })
    }

    static async findUsername(user_id) {
      return new Promise((res, rej) => {
        db.query('SELECT username FROM users WHERE user_id=?', user_id, (error, data) => {
          if (error) {
            rej(error);
          } else {
            console.log('data', data);
            res(data);
          }
        });
      })
    }

    static async findByCursor(user_id, limit) {
      return new Promise((res, rej) => {
        const data = [user_id, parseInt(limit)]
        const query = 'SELECT user_id AS userId, username, email, level FROM users LIMIT 0, ?'
        db.query(query, limit, (error, data) => {
          if (error) {
            rej(error);
          } else {
            console.log('data', data);
            res(data);
          }
        });
      })
    }

    static async update(user_id, toUpdate) {
      //toUpdate.img_url,
      const updateSet = [ toUpdate.username, toUpdate.password, user_id ]
      return new Promise((res, rej) => {
        const query = `UPDATE users
                      SET username = ?, password= ?
                      WHERE user_id=?`
        db.query(query, updateSet, (error, data) => {
          if (error) {
            rej(error);
            // throw new Error("레벨 정보 업데이트 실패");
          } else {
            console.log('data', data);
            res(data);
          }
        })
      })
    }

    static async updateLevel(user_id, level) {
      const info = [level, user_id]
      return new Promise((res, rej) => {
        db.query('UPDATE users SET level = ? WHERE user_id=?', info, (error, data) => {
          if (error) {
            rej(error);
            // throw new Error("레벨 정보 업데이트 실패");
          } else {
            console.log('data', data);
            res(data);
          }
        })
      })
    }
}
module.exports = User;