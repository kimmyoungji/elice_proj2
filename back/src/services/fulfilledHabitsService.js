class plannedHabitService {
  static async getDatesByMonth(userId, month) {
    try {
      const nextMonth =
        dayjs(month).month() === 11 // 쿼리로 들어온 달이 12월이면
          ? dayjs(month).add(1, "year").startOf("year").format("YYYY-MM-DD") //다음 해 01월
          : dayjs(month).add(1, "month").format("YYYY-MM-DD"); // 아니면 같은 해 다음달
      const result = await fulfilled.findByMonth(userId, month, nextMonth);
      console.log(result);
      return result.map((el) => el.date);
    } catch (error) {}
  }

  static async getHabitsByDate(userId, date) {
    const result = await fulfilled.findByDate(userId, date);
    console.log(result);
    return result.map((row) => row.habit_id);
  }
}
module.exports = fulfilledHabitsService;
// return await knex.transaction(async (trx) => {})
