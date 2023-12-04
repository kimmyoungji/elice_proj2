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
            : dayjs(month).add(1, "month").format("YYYY-MM-DD"); // 아니면 같은 해 다음달
        const result = await fulfilled.findByMonth(userId, month, nextMonth);
        console.log(result);
        return result.map((el) => el.date);
      });
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
    }
  }

  static async getHabitsByToday(userId) {
    try {
      return await knex.transaction(async (trx) => {
        fulfilled.setTrx(trx);
        const today = dayjs();
        const tomorrow = today.add(1, "day");

        console.log(today.format("YYYY-MM-DD"));
        console.log(tomorrow.format("YYYY-MM-DD"));
        const result = await fulfilled.findByToday(
          userId,
          today.format("YYYY-MM-DD"),
          tomorrow.format("YYYY-MM-DD")
        );
        console.log(result);
        return result.map((row) => row.habit_id);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async addFulfilledHabits(userId, checked) {
    try {
      return await knex.transaction(async (trx) => {
        fulfilled.setTrx(trx);
        //fullfilledHabits:[ {habitId: [습관아이디],{...}, ...]
        console.log(checked);
        console.log(checked.fulfilledHabits);

        const data = checked.fulfilledHabits.map((el) => ({
          user_id: userId,
          habit_id: el.habitId,
          date: dayjs().format("YYYY-MM-DD"),
        }));
        console.log(data);
        data.map(async (el) => {
          if (!(await fulfilled.findExistingRecords(el)))
            await fulfilled.create(el);
        });
      });
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
    }
  }
}
module.exports = fulfilledHabitsService;
