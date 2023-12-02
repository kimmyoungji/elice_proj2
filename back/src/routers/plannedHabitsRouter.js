const plannedHabitsRouter = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

const { stringToArr } = require("../lib/stringToarray");
const plannedHabitService = require("../services/plannedHabitsService");

plannedHabitsRouter.get(
  "/planned-habits",
  isLoggedIn,
  async (req, res, next) => {
    try {
      // 요청 쿠키 데이터 받아오기 - user_id
      const user_id = req.currentUserId;

      // user_id로 습관 계획 정보 가져오기
      const plannedHabits = await plannedHabitService.getPlannedHabitById(
        user_id
      );

      // 응답 데이터 구성하기
      res.status(200).json({
        message: "DB 데이터 조회 성공",
        plannedHabits,
      });
      // 응답
    } catch (err) {
      next(err);
    }
  }
);

plannedHabitsRouter.post(
  "/planned-habits",
  isLoggedIn,
  async (req, res, next) => {
    try {
      // 요청 쿠키 데이터 받아오기
      const user_id = req.currentUserId;
      // 요청 바디 데이터 받아오기
      let habitIdStr = req.body.habitIds;
      let habitIdArr = stringToArr(habitIdStr);

      // 새로운 습관 계획 추가하기
      await plannedHabitService.addPlannedHabit(user_id, habitIdArr);

      // 응답
      res.status(200).json({
        message: "DB 데이터 추가 성공",
      });
    } catch (err) {
      next(err);
    }
  }
);

plannedHabitsRouter.delete(
  "/planned-habits",
  isLoggedIn,
  async (req, res, next) => {
    try {
      // 요청 바디 데이터 받아오기 - planned-habit_id - array
      const user_id = req.currentUserId;
      const plannedHabitIdStr = req.body.plannedHabitIds;
      const plannedHabitIdArr = stringToArr(plannedHabitIdStr);

      // 계획습관아이디로 계획습관 삭제하기
      await plannedHabitService.deletePlannedHabit(user_id, plannedHabitIdArr);

      // 응답 데이터 구성하기
      res.status(200).json({
        message: "DB 데이터 삭제 성공",
      });
    } catch (err) {
      next(err);
    }
  }
);

// plannedHabitsRouter.get(
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

module.exports = plannedHabitsRouter;
