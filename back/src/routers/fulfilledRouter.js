const fulfilledRouter = require("express").Router();
const knex = require("../db/knex.js");
const { v4: uuidv4 } = require("uuid");
const FulfilledHabitsModel = require("../db/models/fulfilledHabits");
const fulfilled = new FulfilledHabitsModel(knex);
const isLoggedIn = require("../middlewares/isLoggedIn.js");

fulfilledRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const { month, date } = req.query;
    const userId = req.currentUserId;
    if (month) {
      const nextMonth =
        month.slice(5, 7) == 12 //쿼리로 들어온 달이 12월이면
          ? `${parseInt(month.slice(0, 4)) + 1}-01` //다음 해 01월
          : `${month.slice(0, 4)}-${parseInt(month.slice(5, 7)) + 1}`; //아니면 같은 해 다음달
      const result = await fulfilled.findByMonth(userId, month, nextMonth);
      console.log(result);
      const data = result.map((el) => el.date);
      res.status(200).json({
        message: `${month}월에 습관을 실천한 날짜 목록 조회 성공`,
        data: data,
      });
    } else if (date) {
      const result = await fulfilled.findByDate(userId, date);
      console.log(result);
      const data = { [date]: result.map((row) => row.habitTitle) };
      res.status(200).json({
        message: `${date} 에 실천한 습관 목록 조회 성공`,
        data: data,
      });
    } else {
      const today = new Date(now);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      console.log(today);
      console.log(tomorrow);
      const result = await fulfilled.findByToday(
        userId,
        today.toISOString().slice(0, 10),
        tomorrow.toISOString().slice(0, 10)
      );
      console.log(result);
      const data = result.map((row) => row.habitId);
      res.status(200).json({
        message: `${today
          .toISOString()
          .slice(0, 10)}에 실천한 습관 id 조회 성공`,
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
    const fulfilledHabitId = uuidv4();
    const data = checked.fulfilledHabits.map((el) => ({
      fulfilledHabitId,
      userId,
      habitId: el.habitid,
      date: new Date(now).toISOString().slice(0, 10),
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
    const today = new Date().toISOString().slice(0, 10);
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
