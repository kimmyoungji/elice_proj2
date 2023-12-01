const fulfilledRouter = require("express").Router();
const knex = require("../db/knex");
const { v4: uuidv4 } = require("uuid");
const Fulfilled_habitsModel = require("../db/models/fulfilled_habits");
const fulfilled = new Fulfilled_habitsModel(knex);
const isLoggedIn = require("../middlewares/isLoggedIn.js");

fulfilledRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const { month, date } = req.query;
    const user_id = req.currentUserId;
    if (month) {
      const nextMonth =
        month.slice(5, 7) == 12 //쿼리로 들어온 달이 12월이면
          ? `${parseInt(month.slice(0, 4)) + 1}-01` //다음 해 01월
          : `${month.slice(0, 4)}-${parseInt(month.slice(5, 7)) + 1}`; //아니면 같은 해 다음달
      const result = await fulfilled.findByMonth(user_id, month, nextMonth);
      console.log(result);
      const data = result.map((el) => el.date);
      res.status(200).json({
        message: `${month}월에 습관을 실천한 날짜 목록 조회 성공`,
        data: data,
      });
    } else if (date) {
      const result = await fulfilled.findByDate(user_id, date);
      console.log(result);
      const data = { [date]: result.map((row) => row.habit_title) };
      res.status(200).json({
        message: `${date} 에 실천한 습관 목록 조회 성공`,
        data: data,
      });
    } else {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      console.log(today);
      console.log(tomorrow);
      const result = await fulfilled.findByToday(
        user_id,
        today.toISOString().slice(0, 10),
        tomorrow.toISOString().slice(0, 10)
      );
      console.log(result);
      const data = result.map((row) => row.habit_id);
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
    const user_id = req.currentUserId;
    const checked = req.body;
    //fullfilled_habits:[ {habit_id: [습관아이디],timestamp: [완료시간]},{...}, ...]
    console.log(checked);
    console.log(checked.fulfilled_habits);
    const fulfilled_habit_id = uuidv4();
    const data = checked.fulfilled_habits.map((el) => ({
      fulfilled_habit_id,
      user_id,
      habit_id: el.habit_id,
      date: new Date(el.timestamp).toISOString().slice(0, 10),
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
    const user_id = req.currentUserId;
    const habit_id_array = req.body.fullfilled_habit_id;
    //fullfilled_habit_id:[habit_id]
    //날짜 오늘, 유저아이디, habit_id인 데이터 삭제
    const today = new Date().toISOString().slice(0, 10);
    habit_id_array.map(async (id) => {
      const data = { user_id, habit_id: id, date: today };
      console.log(data);
      await fulfilled.delete(data);
      res.status(200).json({ message: "달성 취소 습관 삭제 성공" });
    });

    //delete from fulfilled_habits where user=user_id and date = today and habit_id = habit_id;
  } catch (error) {
    next(error);
  }
});

module.exports = fulfilledRouter;
