const db = require('../config/db');
const selectQuery = 'SELECT * FROM planned_habits'

const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const day = today.getDate().toString().padStart(2, '0');

const monthString = year + '-' + month;
const dateString = year + '-' + month + '-' + day;

class PlannedHabits {
    // 습관 추가
    static async create(plannedHabit) {
        const habit = [plannedHabit.user_id, plannedHabit.habit_id, plannedHabit.start_date, plannedHabit.end_date];
        const query = 'INSERT INTO planned_habits (user_id, habit_id, start_date, end_date) VALUES (?, ?, ?, ?)'
        db.query(query, habit, (error, data) => {
          if (error) {
            console.log(error)
          } else {
            console.log('습관 추가 성공')
          }
        })
      }

    // 
    static async findById(planned_habit_id) {
      try {
        if (!planned_habit_id) {
          return this.knex("planned_habits").transacting(this.trx).select("*");
        }
        return this.knex("planned_habits")
          .transacting(this.trx)
          .select("*")
          .where("planned_habit_id", planned_habit_id);
      } catch (err) {
        throw new Error(err);
      }
    }
  
    static async findByUserId(user_id) {
      try {
        return this.knex("planned_habits")
          .transacting(this.trx)
          .select("*")
          .where("user_id", user_id);
      } catch (err) {
        throw new Error(err);
      }
    }

    // 현재 실천중인 습관 가져오기
    static async findUnclosedByUserId(user_id) {
      return new Promise((res, rej) => {
        const query = `${selectQuery} WHERE end_date >= ${dateString} AND user_id = ?`
        db.query(query, user_id, (error, data) => {
          if (error) {
            console.log(error)
            rej(error)
          } else {
            console.log('실천중인 습관 가져오기 성공')
            res(data);
          }
        })
      })
    }

    // 삭제??
    static async deleteById(planned_habit_id) {
      try {
        return this.knex("planned_habits")
          .transacting(this.trx)
          .where("planned_habit_id", planned_habit_id)
          .delete();
      } catch (err) {
        throw new Error(err);
      }
    }
  }
  
  module.exports = PlannedHabits;
  