class PlannedHabitsModel {
  constructor(knex) {
    this.knex = knex;
  }

  async create(plannedHabit) {
    try {
      return await this.knex("planned_habits").insert(plannedHabit);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findById(planned_habit_id) {
    try {
      if (!planned_habit_id) {
        return await this.knex("planned_habits").select("*");
      }
      return await this.knex("planned_habits")
        .select("*")
        .where("planned_habit_id", planned_habit_id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findByUserId(user_id) {
    try {
      return await this.knex("planned_habits")
        .select("*")
        .where("user_id", user_id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUnclosedByUserId(user_id) {
    try {
      const today = new Date();
      return await this.knex("planned_habits")
        .select("*")
        .where("user_id", user_id)
        .andWhere("end_date", ">=", today);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(planned_habit_id) {
    try {
      return await this.knex("planned_habits")
        .where("planned_habit_id", planned_habit_id)
        .delete();
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = PlannedHabitsModel;
