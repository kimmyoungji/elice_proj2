class FulfilledHabitsModel {
  constructor(knex) {
    this.knex = knex;
  }

  async findByToday(user_id, today, tomorrow) {
    try {
      return await this.knex
        .select("habit_id")
        .from("fulfilled_habits")
        .where({
          user_id: user_id,
        })
        .where("date", ">=", today)
        .where("date", "<", tomorrow);
    } catch (error) {
      console.error(
        "오늘의 습관 달성 여부를 불러오다가 뭔가 잘못됨",
        error.stack
      );
      throw new Error(error);
    }
  }

  async findByMonth(user_id, month, nextMonth) {
    try {
      return await this.knex
        .select("date")
        .from("fulfilled_habits")
        .where({
          user_id: user_id,
        })
        .where("date", ">=", `${month}-01`)
        .where("date", "<", `${nextMonth}-01`);
    } catch (error) {
      console.error("월별 달성 여부 불러오다가 뭔가 잘못됨", error.stack);
      throw new Error(error);
    }
  }

  async findByDate(user_id, date) {
    try {
      return await this.knex
        .select("habits.habit_title")
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
  async create(data) {
    try {
      // 중복 체크 필요!
      await this.this.knex("fulfilled_habits").insert(data);
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
      //delete from fulfilled_habits where user=user_id and date = today and habit_id = habit_id;
      //삭제할 내용을 못찾았을 경우 어떻게 할 지 추가
    } catch (error) {
      console.error("취소한 달성내역을 삭제하다가 뭔가 잘못됨", error.stack);
      throw new Error(error);
    }
  }
}

module.exports = FulfilledHabitsModel;
