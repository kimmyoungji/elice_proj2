const plannedHabitRouter = require("express").Router();
const knex = require("../db/knex");
const PlannedHabitsModel = require("../db/models/planned_habits");
const plannedHabits = new PlannedHabitsModel(knex);
const HabitsModel = require("../db/models/habits");
const habits = new HabitsModel(knex);
const isLoggedIn = require("../middlewares/isLoggedIn");
const { v4: uuidv4 } = require("uuid");
const { stringToArr } = require("../lib/stringToarray");

// plannedHabitRouter.get(
//   "/planned-habits",
//   isLoggedIn,
//   async (req, res, next) => {
//     try {
//       // 요청 쿠키 데이터 받아오기 - user_id
//       const user_id = req.currentUserId;
//       // DB: end_date가 오늘또는 다음날들이고, user_id에 해당하는 데이터 조회
//       const plannedHabitArr = await plannedHabits.findByUserId(user_id);
//       // 응답 데이터 구성하기
//       res.status(200).json({
//         message: "DB 데이터 조회 성공",
//         plannedHabits: plannedHabitArr,
//       });
//       // 응답
//     } catch (err) {
//       next(err);
//     }
//   }
// );

plannedHabitRouter.get(
  "/planned-habits",
  isLoggedIn,
  async (req, res, next) => {
    try {
      // 요청 쿠키 데이터 받아오기 - user_id
      const user_id = req.currentUserId;
      // DB: end_date가 오늘또는 다음날들이고, user_id에 해당하는 데이터 조회
      const plannedHabitArr = await plannedHabits.findUnclosedByUserId(user_id);
      // 응답 데이터 구성하기
      res.status(200).json({
        message: "DB 데이터 조회 성공",
        plannedHabits: plannedHabitArr,
      });
      // 응답
    } catch (err) {
      next(err);
    }
  }
);

plannedHabitRouter.post(
  "/planned-habits",
  isLoggedIn,
  async (req, res, next) => {
    try {
      // 요청 쿠키 데이터 받아오기 - user_id
      const user_id = req.currentUserId;
      // 요청 바디 데이터 받아오기 - planned-habits array
      let plannedHabitIdStr = req.body.planned_habit_ids;
      let plannedHabitIdArr = stringToArr(plannedHabitIdStr);

      // 이미 있는 습관인지 검증
      let user_habits = await plannedHabits.findUnclosedByUserId(user_id);
      let user_habit_ids = user_habits.map((h) => h.habit_id);
      const inCommingHset = new Set(plannedHabitIdArr);
      const overlappingH = user_habit_ids.filter((h) => inCommingHset.has(h));
      // console.log("user_habits_ids", user_habit_ids);
      // console.log("inCommingHset", inCommingHset);
      // console.log("overlappingH", overlappingH);
      if (overlappingH.length !== 0) {
        throw new Error(
          `${overlappingH}: 옆의 habit_id에 해당하는 습관들은 이미 실천 중인 습관입니다.`
        );
      }

      // 반복문
      for (let pHabitId of plannedHabitIdArr) {
        // 추가할 계획습관 데이터 구성하기
        const planned_habit_id = uuidv4();
        // habit_id 로 habits에서 습관 조회하기
        const habitArr = await habits.findById(pHabitId);
        const habit = habitArr[0];
        // user_id는 위에..
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
        const result = await plannedHabits.create(newhabit);
        console.log(result);
      }

      // 응답
      res.status(200).json({
        message: "DB 데이터 추가 성공",
      });
    } catch (err) {
      next(err);
    }
  }
);

plannedHabitRouter.delete(
  "/planned-habits",
  isLoggedIn,
  async (req, res, next) => {
    try {
      // 요청 바디 데이터 받아오기 - planned-habit_id - array
      const user_id = req.currentUserId;
      const plannedHabitIdStr = req.body.planned_habit_ids;
      const plannedHabitIdArr = stringToArr(plannedHabitIdStr);
      console.log("pHabitId", plannedHabitIdArr);
      // 반복문
      for (let pHabitId of plannedHabitIdArr) {
        // 사용자의 계획습관인지 검증
        const habit = await plannedHabits.findById(pHabitId);
        console.log(habit);
        if (user_id !== habit.user_id) {
          throw new Error(
            "현재 사용자의 계획습관 데이터가 아니므로 삭제할 수 없습니다."
          );
        }
        // DB: 계획습관 아이디로 지우기
        const result = await plannedHabits.deleteById(pHabitId);
        console.log(result);
        if (result === 0) {
          throw new Error("DB 데이터 삭제 실패");
        }
      }

      // 응답 데이터 구성하기
      res.status(200).json({
        message: "DB 데이터 삭제 성공",
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = plannedHabitRouter;
