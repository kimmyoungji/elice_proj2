const knex = require("../db/knex");
const PlannedHabitsModel = require("../db/models/plannedHabits");
const plannedHabits = new PlannedHabitsModel(knex);
const HabitsModel = require("../db/models/habits");
const habits = new HabitsModel(knex);
const { NotFoundError, ConflictError } = require("../lib/custom-error");
const { v4: uuidv4 } = require("uuid");

class plannedHabitService {
  static async getPlannedHabitById(user_id) {
    // DB: end_date가 오늘또는 다음날들이고, user_id에 해당하는 데이터 조회
    const plannedHabitArr = await plannedHabits.findUnclosedByUserId(user_id);
    if (plannedHabitArr.length === 0)
      throw new NotFoundError("현재 실천 중인 습관이 없습니다.");
    return plannedHabitArr;
  }

  static async addPlannedHabit(user_id, habitIdArr) {
    // 이미 있는 습관인지 검증
    let user_habits = await plannedHabits.findUnclosedByUserId(user_id);
    let user_habit_ids = user_habits.map((h) => h.habit_id);
    const inCommingHset = new Set(habitIdArr);
    const overlappingH = user_habit_ids.filter((h) => inCommingHset.has(h));
    // console.log("user_habits_ids", user_habit_ids);
    // console.log("inCommingHset", inCommingHset);
    // console.log("overlappingH", overlappingH);
    if (overlappingH.length !== 0) {
      throw new ConflictError(
        `${overlappingH}: 옆의 habit_id에 해당하는 습관들은 이미 실천 중인 습관입니다.`
      );
    }

    // 반복문
    for (let pHabitId of habitIdArr) {
      // 추가할 계획습관 데이터 구성하기
      const planned_habit_id = uuidv4();
      // habit_id 로 habits에서 습관 조회하기
      const habitArr = await habits.findById(pHabitId);
      const habit = habitArr[0];
      // habit_id
      const habit_id = habit.habit_id;
      // start_date에 target_days 더해서 end_date 만들기
      const start_date = new Date();
      const end_date = new Date(start_date);
      end_date.setDate(end_date.getDate() + habit.target_days);
      // DB: 새로운 계획습관 데이터 추가하기
      const newhabit = {
        planned_habit_id,
        user_id,
        habit_id,
        start_date,
        end_date,
      };
      // DB: 새로운 데이터 추가
      await plannedHabits.create(newhabit);
    }
  }

  static async deletePlannedHabit(user_id, plannedHabitIdArr) {
    // 반복문
    for (let pHabitId of plannedHabitIdArr) {
      // 사용자의 계획습관인지 검증
      const habitArr = await plannedHabits.findById(pHabitId);
      const habit = habitArr[0];
      if (user_id !== habit.user_id) {
        throw new Error(
          "현재 사용자의 계획습관 데이터가 아니므로 삭제할 수 없습니다."
        );
      }
      // DB: 계획습관 아이디로 지우기
      const result = await plannedHabits.deleteById(pHabitId);
      if (result === 0) {
        throw new Error("DB 데이터 삭제 실패");
      }
    }
  }
}

module.exports = plannedHabitService;
