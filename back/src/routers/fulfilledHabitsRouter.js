const fulfilledRouter = require("express").Router();
const knex = require("../db/knex.js");
const FulfilledHabitsModel = require("../db/models/fulfilledHabits");
const fulfilled = new FulfilledHabitsModel(knex);
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const dayjs = require("dayjs");
const fulfilledService = require("../services/fulfilledService");

fulfilledRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    //쿼리 파라미터 받아오기
    const { month, date } = req.query;
    //쿠키에서 유저 정보 받아오기
    const userId = req.currentUserId;

    //쿼리파라미터 중 month 가 사용된 경우
    if (month) {
      //캘린더에 표시된 month 에 따라 습관을 실천한 모든 날짜를 조회
      const data = await fulfilledService.getDatesByMonth(userId, month);
      res.status(200).json({
        message: `${month}월에 습관을 실천한 날짜 목록 조회 성공`,
        dates: data,
      });
    }
    //쿼리 파라미터 중 date 가 사용된 경우
    else if (date) {
      //캘린더에서 선택한 날짜에 실천한 습관 id 조회
      const data = await fulfilledService.getHabitsByDate(userId, date);
      res.status(200).json({
        message: `${date}에 실천한 습관 id 조회 성공`,
        habitIds: data,
      });
    }
    //쿼리 파라미터가 사용되지 않은 경우
    else {
      //오늘 날짜를 사용하여 오늘 실천합 습관 목록 조회
      const today = dayjs();
      const tomorrow = today.add(1, "day");

      console.log(today);
      console.log(tomorrow);
      const result = await fulfilled.findByToday(
        userId,
        today.format("YYYY-MM-DD"),
        tomorrow.format("YYYY-MM-DD")
      );
      console.log(result);
      const data = result.map((row) => row.habitId);
      res.status(200).json({
        message: `${today.format("YYYY-MM-DD")}에 실천한 습관 id 조회 성공`,
        data: data,
      });
    }
  } catch (error) {
    next(error);
  }
});

fulfilledRouter.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const checked = req.body;

    //fullfilledHabits:[ {habitId: [습관아이디],{...}, ...]
    console.log(checked);
    console.log(checked.fulfilledHabits);
    const data = checked.fulfilledHabits.map((el) => ({
      userId,
      habitId: el.habitid,
      date: dayjs().format("YYYY-MM-DD"),
    }));
    console.log(data);
    await fulfilled.create(data);
    res.status(200).json({ message: "습관 달성 내역 저장 성공" });
    //중복 검사 해야함
    //만약 해당 날짜에 이미 저장된 습관이 있다면 무시하고 과거 내역 남기거나 덮어쓰는 부분 추가해야함
  } catch (error) {
    console.error("Error in fulfilledRouter", error.stack);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

fulfilledRouter.delete("/", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const habitIdArray = req.body.fullfilledHabitId;
    //fullfilledHabitId:[habitId]
    //날짜 오늘, 유저아이디, habitId인 데이터 삭제
    const today = dayjs().format("YYYY-MM-DD");
    habitIdArray.map(async (el) => {
      const data = { userId, habitId: el, date: today };
      console.log(data);
      await fulfilled.delete(data);
      res.status(200).json({ message: "달성 취소 습관 삭제 성공" });
    });

    //delete from fulfilledHabits where user=userId and date = today and habitId = habitId;
  } catch (error) {
    next(error);
  }
});

module.exports = fulfilledRouter;
