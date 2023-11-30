const plannedHabitRouter = require("express").Router();
const kenx = require("../db/knex");
const PlannedHabitsModel = require("../db/models/planned_habits");
const plannedHabits = new PlannedHabitsModel(kenx);
const isLoggedIn = require("../middlewares/isLoggedIn");

plannedHabitRouter.get(
  "/planned-habits",
  isLoggedIn,
  async (req, res, next) => {
    // 요청 쿠키 데이터 받아오기 - user_id
    const user_id = req.currentUserId;
    console.log("user_id", user_id);
    // DB: end_date가 오늘또는 다음날들이고, user_id에 해당하는 데이터 조회
    const plannedHabitArr = await plannedHabits.findByUserId(user_id);
    console.log(plannedHabitArr);
    // 응답 데이터 구성하기
    res.status(200).json({
      message: "DB 데이터 조회 성공",
      plannedHabits: plannedHabitArr,
    });
    // 응답
  }
);

plannedHabitRouter.post("/planned-habits", isLoggedIn, (req, res, next) => {
  // 요청 쿠키 데이터 받아오기 - user_id
  const user_id = req.currentUserId;
  // 요청 바디 데이터 받아오기 - planned-habits array
  const plannedHabitArr = req.body;
  console.log(plannedHabitArr);
  // 반복문
  // 추가할 계획습관 데이터 구성하기
  // const planned_habit_id  = uuidV4()
  // habit_id 로 habits에서 습관 조회하기
  // start_date에 target_days 더해서 end_date 만들기
  // DB: 새로운 계획습관 데이터 추가하기
  //
  // 응답 데이터 구성하기
  // 응답
  res.status(200).json({ dump: null });
});

plannedHabitRouter.delete("/planned-habits", (req, res, next) => {
  // 요청 바디 데이터 받아오기 - planned-habit_id - array
  // 반복문
  // DB: 계획습관 아이디로 지우기
  //
  // 응답 데이터 구성하기
  // 응답
});

module.exports = plannedHabitRouter;
