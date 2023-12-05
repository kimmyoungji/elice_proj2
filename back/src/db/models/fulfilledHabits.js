class FulfilledHabitsModel {
  constructor(knex) {
    this.knex = knex;
  }
  setTrx(trx) {
    this.trx = trx;
  }

  async findByToday(userId, today, tomorrow) {
    try {
      return await this.knex
        .select("habit_id")
        .from("fulfilled_habits")
        .where({
          user_id: userId,
        })
        .where("date", ">=", today)
        .andWhere("date", "<", tomorrow);
    } catch (error) {
      console.error(
        "오늘의 습관 달성 여부를 불러오다가 뭔가 잘못됨",
        error.stack
      );
      throw new Error(error);
    }
  }

  async findByMonth(userId, month, nextMonth) {
    try {
      return await this.knex
        .distinct("date")
        .from("fulfilled_habits")
        .where({
          user_id: userId,
        })
        .andWhere("date", ">=", `${month}-01`)
        .andWhere("date", "<", `${nextMonth}-01`);
    } catch (error) {
      console.error("월별 달성 여부 불러오다가 뭔가 잘못됨", error.stack);
      throw new Error(error);
    }
  }

  async findByDate(user_id, date) {
    try {
      return await this.knex
        .select("habits.habit_id")
        .from("fulfilled_habits")
        .join("habits", "fulfilled_habits.habit_id", "=", "habits.habit_id")
        .where("fulfilled_habits.user_id", "=", user_id)
        .andWhere("fulfilled_habits.date", "=", date);
    } catch (error) {
      console.error(
        "요청한 일자의 달성 여부 불러오다가 뭔가 잘못됨",
        error.stack
      );
      throw new Error(error);
    }
  }

  async findExistingRecords(data) {
    try {
      return await this.knex
        .select("habit_id")
        .from("fulfilled_habits")
        .whereIn("habit_id", data.habit_id)
        .andWhere({ user_id: data.user_id, date: data.date });
    } catch (error) {
      console.error(
        "요청한 데이터를 저장전 중복검사하다가 뭔가 잘못됨",
        error.stack
      );
      throw new Error(error);
    }
  }

  async create(data) {
    try {
      await this.knex("fulfilled_habits").insert(data);
      console.log("달성 기록이 잘 저장됨");
    } catch (error) {
      console.error("달성 습관을 저장하다가 뭔가 잘못됨", error.stack);
      throw new Error(error);
    }
  }

  async delete(data) {
    try {
      await this.knex("fulfilled_habits").where(data).del();
      console.log("달성 기록이 잘 삭제됨");
    } catch (error) {
      console.error("취소한 달성내역을 삭제하다가 뭔가 잘못됨", error.stack);
      throw new Error(error);
    }
  }
}

module.exports = FulfilledHabitsModel;
