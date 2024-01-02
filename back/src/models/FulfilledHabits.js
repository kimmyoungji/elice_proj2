const db = require('../config/db');
const selectQuery = 'SELECT * FROM fulfilled_habits'

class FulfilledHabits {
    // 이번달 습관 실천 날짜 조회
    static async findByMonth(userId, thisMonth, nextMonth) {
      return new Promise((res, rej) => {
        const data = [userId, thisMonth, nextMonth]
        const query = `${selectQuery} WHERE user_id=? AND date >=? AND date < ?`
        db.query(query, data, (error, data) => {
          if (error) {
            console.log("월별 달성 여부 불러오다가 뭔가 잘못됨", error)
            rej(error)
          } else {
            console.log('이번달 습관 실천 날짜 조회 성공')
            res(data);
          }
        })
      })
    }
  
    static async findByDateRange(userId, startDate, endDate) {
      return new Promise((res, rej) => {
        const data = [userId, startDate, endDate]
        const query = `${selectQuery} WHERE user_id=? AND date BETWEEN ? AND ?`
        db.query(query, data, (error, data) => {
          if (error) {
            console.log("주차별 실천 습관 수 불러오다가 뭔가 잘못됨", error)
            rej(error)
          } else {
            console.log('이번달 습관 실천 날짜 조회 성공')
            res(data);
          }
        })
      })
    }
  
    static async findByDate(user_id, date) {
      console.log(date);
      return new Promise((res, rej) => {
        const data = [user_id, date]
        const query = `${selectQuery} WHERE user_id=? AND date=?`
        db.query(query, data, (error, data) => {
            if (error) {
              console.log("요청한 일자의 달성 여부 불러오다가 뭔가 잘못됨", error)
              rej(error)
            } else {
              console.log('이번달 습관 실천 날짜 조회 성공')
              res(data);
            }
          })
      })
    }

    // 중복습관 확인?
    static async findExistingRecords(data) {
    //   try {
    //     return await this.knex
    //       .select("habit_id")
    //       .from("fulfilled_habits")
    //       .whereIn("habit_id", data.habit_id)
    //       .andWhere({ user_id: data.user_id, date: data.date });
    //   } catch (error) {
    //     console.error(
    //       "요청한 데이터를 저장전 중복검사하다가 뭔가 잘못됨",
    //       error.stack
    //     );
    //     throw new Error(
    //       "실천한 습관을 저장하기 위해 DB를 체크하던 중 문제가 생겼습니다."
    //     );
    //   }
    }
  
    static async countByUserId(user_id) {
      return new Promise((res, rej) => {
        const query = `${selectQuery} WHERE user_id=?`
        db.query(query, user_id, (error, data) => {
            if (error) {
              console.log("user의 count 불러오다가 잘못됨", error)
              rej(error)
            } else {
              console.log('user의 개수 조회 성공', data)
              res(data);
            }
          })
      })
    }
  
    static async create(data) {
      return new Promise((res, rej) => {
        const habit = [data.user_id, data.date, data.habit_id];
        const query = 'INSERT INTO fulfilled_habits (user_id, date, habit_id) VALUES (?, ?, ?)'
        db.query(query, habit, (error, data) => {
            if (error) {
              console.log("실천 습관을 저장하다가 뭔가 잘못됨", error)
              rej(error)
            } else {
              console.log('이번달 습관 실천 날짜 조회 성공')
              res(data);
            }
          })
        })
    }
  
    // async delete(data) {
    //   try {
    //     await this.knex("fulfilled_habits")
    //       .transacting(this.trx)
    //       .where(data)
    //       .del();
    //   } catch (error) {
    //     console.error("취소한 달성내역을 삭제하다가 뭔가 잘못됨", error.stack);
    //     throw new Error(
    //       "요청한 습관 실천 내역을 DB에서 삭제하던 중 문제가 생겼습니다."
    //     );
    //   }
    // }
  }
  
module.exports = FulfilledHabits;
  