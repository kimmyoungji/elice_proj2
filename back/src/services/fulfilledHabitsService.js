const knex = require("../db/knex.js");
const FulfilledHabitsModel = require("../db/models/fulfilledHabits");
const fulfilled = new FulfilledHabitsModel(knex);
const dayjs = require("dayjs");

class fulfilledHabitsService {
  static async getCountsByWeeks(userId) {
    try {
      //주차 계산
      const today = dayjs(); //오늘
      //이번주 월~일
      const thisMonday = today.startOf("week").add(1, "day");
      const thisSunday = today.endOf("week").add(1, "day");
      //저번주 월~일
      const lastMonday = thisMonday.subtract(7, "day");
      const lastSunday = thisSunday.subtract(7, "day");
      //저저번주 월~일
      const mon2WsAgo = lastMonday.subtract(7, "day");
      const sun2WsAgo = lastSunday.subtract(7, "day");
      //3주전 월~일
      const mon3WsAgo = mon2WsAgo.subtract(7, "day");
      const sun3WsAgo = sun2WsAgo.subtract(7, "day");
      //4주전 월~일
      const mon4WsAgo = mon3WsAgo.subtract(7, "day");
      const sun4WsAgo = sun3WsAgo.subtract(7, "day");

      console.log(
        thisMonday.format("YYYY-MM-DD"),
        thisSunday.format("YYYY-MM-DD"),
        lastMonday.format("YYYY-MM-DD"),
        lastSunday.format("YYYY-MM-DD"),
        mon2WsAgo.format("YYYY-MM-DD"),
        sun2WsAgo.format("YYYY-MM-DD"),
        mon3WsAgo.format("YYYY-MM-DD"),
        sun3WsAgo.format("YYYY-MM-DD"),
        mon4WsAgo.format("YYYY-MM-DD"),
        sun4WsAgo.format("YYYY-MM-DD")
      ); //월~일 사이 실천 습관 수 카운팅
      //SELECT COUNT(habit_id) FROM fulfilled_habits WHERE user_id = user and date <= monday and date >=sunday;
      const countThisWeek = await fulfilled.findByWeek(
        userId,
        thisMonday.format("YYYY-MM-DD"),
        thisSunday.format("YYYY-MM-DD")
      );
      const countlastWeek = await fulfilled.findByWeek(
        userId,
        lastMonday.format("YYYY-MM-DD"),
        lastSunday.format("YYYY-MM-DD")
      );
      const count2WsAgo = await fulfilled.findByWeek(
        userId,
        mon2WsAgo.format("YYYY-MM-DD"),
        sun2WsAgo.format("YYYY-MM-DD")
      );
      const count3WsAgo = await fulfilled.findByWeek(
        userId,
        mon3WsAgo.format("YYYY-MM-DD"),
        sun3WsAgo.format("YYYY-MM-DD")
      );
      const count4WsAgo = await fulfilled.findByWeek(
        userId,
        mon4WsAgo.format("YYYY-MM-DD"),
        sun4WsAgo.format("YYYY-MM-DD")
      );
      console.log(
        countThisWeek[0].count,
        countlastWeek[0].count,
        count2WsAgo[0].count,
        count3WsAgo[0].count,
        count4WsAgo[0].count
      );
      return {
        thisWeek: countThisWeek[0].count,
        lastWeek: countlastWeek[0].count,
        twoWeeksAgo: count2WsAgo[0].count,
        threeWeeksAgo: count3WsAgo[0].count,
        fourWeeksAgo: count4WsAgo[0].count,
      };
    } catch (error) {
      console.error(error.stack);
      throw error;
    }
  }

  static async getDatesByMonth(userId, month) {
    try {
      //다음달 계산
      const nextMonth =
        dayjs(month).month() === 11 // 쿼리로 들어온 달이 12월이면
          ? dayjs(month).add(1, "year").startOf("year").format("YYYY-MM-DD") //다음 해 01월
          : dayjs(month).add(1, "month").startOf("month").format("YYYY-MM-DD"); // 아니면 같은 해 다음달
      //이번달 첫날
      const thisMonth = dayjs(month).startOf("month").format("YYYY-MM-DD");
      console.log(thisMonth, nextMonth);
      //이번달에 습관 실천할 날짜들 조회
      const resultMonth = await fulfilled.findByMonth(
        userId,
        thisMonth,
        nextMonth
      );

      console.log(resultMonth);

      return resultMonth.map((el) => dayjs(el.date).format("YYYY-MM-DD"));
    } catch (error) {
      console.error(error.stack);
      throw error;
    }
  }

  static async getHabitsByDate(userId, date) {
    try {
      const result = await fulfilled.findByDate(userId, date);
      console.log(result);
      return result.map((row) => row.habit_id);
    } catch (error) {
      console.error(error.stack);
      throw error;
    }
  }

  static async getHabitsByToday(userId) {
    try {
      const today = dayjs().format("YYYY-MM-DD");

      console.log(today);
      const result = await fulfilled.findByDate(userId, today);
      console.log(result);
      return result.map((row) => row.habit_id);
    } catch (error) {
      console.error(error.stack);
      throw error;
    }
  }

  static async addFulfilledHabits(userId, checked) {
    try {
      return await knex.transaction(async (trx) => {
        fulfilled.setTrx(trx);
        //{"fulfilledHabits": ["habit1","habit2","habit4"]}

        const today = dayjs().format("YYYY-MM-DD");
        const data4check = {
          user_id: userId,
          date: today,
          habit_id: checked.fulfilledHabits,
        };

        const exist = await fulfilled.findExistingRecords(data4check);
        console.log("중복 습관id", exist);
        const data = checked.fulfilledHabits
          .filter((el) => !exist.some((id) => id.habit_id === el))
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
      console.error(error.stack);
      // await trx.rollback();
      throw error;
    }
  }

  static async deleteFulfilledHabits(userId, habitIdArray) {
    try {
      return await knex.transaction(async (trx) => {
        fulfilled.setTrx(trx);
        const today = dayjs().format("YYYY-MM-DD");
        await Promise.all(
          habitIdArray.map(async (el) => {
            const data = { user_id: userId, habit_id: el, date: today };
            await fulfilled.delete(data);
          })
        );
      });
    } catch (error) {
      console.error(error.stack);
      // await trx.rollback();
      throw error;
    }
  }
}
module.exports = fulfilledHabitsService;
