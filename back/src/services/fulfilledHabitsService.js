const knex = require("../db/knex.js");
const FulfilledHabitsModel = require("../db/models/fulfilledHabits");
const fulfilled = new FulfilledHabitsModel(knex);
const dayjs = require("dayjs");

class fulfilledHabitsService {
  static async getDatesByMonth(userId, month) {
    try {
      return await knex.transaction(async (trx) => {
        fulfilled.setTrx(trx);
        const nextMonth =
          dayjs(month).month() === 11 // 쿼리로 들어온 달이 12월이면
            ? dayjs(month).add(1, "year").startOf("year").format("YYYY-MM-DD") //다음 해 01월
            : dayjs(month)
                .add(1, "month")
                .startOf("month")
                .format("YYYY-MM-DD"); // 아니면 같은 해 다음달
        const thisMonth = dayjs(month).startOf("month").format("YYYY-MM-DD");
        console.log(thisMonth, nextMonth);
        const result = await fulfilled.findByMonth(
          userId,
          thisMonth,
          nextMonth
        );
        console.log(result);
        return result.map((el) => el.date);
      });
    } catch (error) {
      console.error(error.stack);
      throw error;
    }
  }

  static async getHabitsByDate(userId, date) {
    try {
      return await knex.transaction(async (trx) => {
        fulfilled.setTrx(trx);
        const result = await fulfilled.findByDate(userId, date);
        console.log(result);
        return result.map((row) => row.habit_id);
      });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  static async getHabitsByToday(userId) {
    try {
      return await knex.transaction(async (trx) => {
        fulfilled.setTrx(trx);
        const today = dayjs();

        console.log(today.format("YYYY-MM-DD"));
        const result = await fulfilled.findByToday(
          userId,
          today.format("YYYY-MM-DD")
        );
        console.log(result);
        return result.map((row) => row.habit_id);
      });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  static async addFulfilledHabits(userId, checked) {
    try {
      return await knex.transaction(async (trx) => {
        fulfilled.setTrx(trx);
        //{"fulfilledHabits": ["habit1","habit2","habit4"]}
        console.log("요청받은 습관id", checked.fulfilledHabits);

        const today = dayjs().format("YYYY-MM-DD");
        const data4check = {
          user_id: userId,
          date: today,
          habit_id: checked.fulfilledHabits,
        };
        console.log("체크용데이터", data4check);
        const exist = await fulfilled.findExistingRecords(data4check);
        console.log("중복 습관id", exist);
        const data = checked.fulfilledHabits
          .filter((el) => {
            return !exist.some((id) => id.habit_id === el);
          })
          .map((id) => ({
            user_id: userId,
            date: today,
            habit_id: id,
          }));

        console.log("저장할 습관id", data);
        if (data.length) {
          await fulfilled.create(data);
        } else {
          console.log("오늘 새로 기록할 습관이 없습니다.");
        }
      });
    } catch (error) {
      console.error(error.message);
      throw new error();
    }
  }

  static async deleteFulfilledHabits(userId, habitIdArray) {
    try {
      return await knex.transaction(async (trx) => {
        fulfilled.setTrx(trx);
        const today = dayjs().format("YYYY-MM-DD");
        habitIdArray.map(async (el) => {
          const data = { user_id: userId, habit_id: el, date: today };
          console.log(data);
          await fulfilled.delete(data);
        });
      });
    } catch (error) {
      console.error(error.stack);
      throw error;
    }
  }
}
module.exports = fulfilledHabitsService;
