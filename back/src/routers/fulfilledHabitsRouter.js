const fulfilledHabitsRouter = require("express").Router();
const knex = require("../db/knex");
const FulfilledHabitsModel = require("../db/models/fulfilledHabits");
const { stringToArr } = require("../lib/stringToarray");
const fulfilledHabits = new FulfilledHabitsModel(knex);
const isLoggedIn = require("../middlewares/isLoggedIn");
const { v4: uuidv4 } = require("uuid");

fulfilledHabitsRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const { month, date } = req.query;
    const user_id = req.currentUserId;
    if (month) {
      const nextMonth =
        month.slice(5, 7) == 12 //쿼리로 들어온 달이 12월이면
          ? `${parseInt(month.slice(0, 4)) + 1}-01` //다음 해 01월
          : `${month.slice(0, 4)}-${parseInt(month.slice(5, 7)) + 1}`; //아니면 같은 해 다음달
      const result = await fulfilledHabits.getByMonth(
        user_id,
        month,
        nextMonth
      );
      console.log(result);
      const data = result.map((el) => el.date);
      res.status(200).json({
        message: `${month}월에 습관을 실천한 날짜 목록 조회 성공`,
        dates: data,
      });
    } else if (date) {
      const result = await fulfilledHabits.getByDate(user_id, date);
      console.log(result);
      const data = { [date]: result.map((row) => row.habit_title) };
      res.status(200).json({
        message: `${date} 에 실천한 습관 목록 조회 성공`,
        habitIds: data,
      });
    } else {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      console.log(today);
      console.log(tomorrow);
      const result = await fulfilledHabits.getToday(
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
        habitIds: data,
      });
    }
  } catch (error) {
    next(error);
  }
});

fulfilledHabitsRouter.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.currentUserId; //로그인 기능 연결 전 임시 변수
    //fullfilled_habits:[ {habit_id: [습관아이디],timestamp: [완료시간]},{...}, ...]
    let checked = req.body.fulfilledHabits;
    checked = checked.trim().replace("[", "").replace("]", "").split("},");
    checked = checked.map((c) => {
      if (c.endsWith("}")) {
        return JSON.parse(c);
      }
      return JSON.parse(c + "}");
    });
    const data = checked.map((el) => ({
      fulfilled_habit_id: uuidv4(),
      user_id,
      habit_id: el.habit_id,
      date: new Date(el.timestamp).toISOString().slice(0, 10),
    }));
    await fulfilledHabits.insertChecked(data);
    res.status(200).json({ message: "습관 달성 내역 저장 성공" });
  } catch (error) {
    console.error("Error in fulfilledHabitsRouter", error.stack);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

fulfilledHabitsRouter.delete("/", isLoggedIn, async (req, res, next) => {
  try {
    //const { user_id } = req.cookies; //쿠키에서 user 정보 가져옴
    const user_id = req.currentUserId; //로그인 기능 연결 전 임시 변수
    //fullfilled_habit_id:[habit_id]
    let habitIds = req.body.habitIds;
    if (typeof habitIds === "string") {
      habitIds = stringToArr(habitIds);
    }
    //날짜 오늘, 유저아이디, habit_id인 데이터 삭제
    const today = new Date().toISOString().slice(0, 10);
    console.log(today, "today");
    for (let habitId of habitIds) {
      const data = { user_id, habit_id: habitId, date: today };
      await fulfilledHabits.deleteChecked(data);
    }
    res.status(200).json({
      message: "DB 데이터 삭제 성공",
    });

    //delete from fulfilled_habits where user=user_id and date = today and habit_id = habit_id;
  } catch (error) {
    next(error);
  }
});

module.exports = fulfilledHabitsRouter;
