class UsersModel {
  constructor(knex) {
    this.knex = knex;
  }

  setTrx(trx) {
    this.trx = trx;
  }

  async create(user) {
    try {
      return this.knex("users").transacting(this.trx).insert(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findByCursor(cursor, limit) {
    try {
      cursor = cursor ? cursor : "99999999999999999999"; // Replace this with your actual cursor value
      limit = limit ? limit : "10";
      console.log("cursor and limit", cursor, limit);
      return this.knex("users")
        .transacting(this.trx)
        .select("username", "email", "level")
        .select(
          this.knex.raw(
            "CONCAT(LPAD(username, 10, 0), LPAD(level, 10, 0)) as cursors"
          )
        )
        .whereRaw(`CONCAT(LPAD(username, 10, 0), LPAD(level, 10, 0)) < ?`, [
          cursor,
        ])
        .orderBy("username", "desc")
        .orderBy("level", "desc")
        .limit(limit);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findById(user_id) {
    try {
      if (!user_id) {
        return this.knex("users").transacting(this.trx).select("*");
      }
      return this.knex("users")
        .transacting(this.trx)
        .select("*")
        .where("user_id", user_id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findByEmail(email) {
    try {
      return this.knex("users")
        .transacting(this.trx)
        .select("*")
        .where("email", email);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findByUsername(username) {
    try {
      return this.knex("users")
        .transacting(this.trx)
        .select("*")
        .where("username", username);
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(user_id, toUpdate) {
    try {
      return this.knex("users")
        .transacting(this.trx)
        .where("user_id", user_id)
        .update(toUpdate);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(user_id) {
    try {
      return this.knex("users")
        .transacting(this.trx)
        .where("user_id", user_id)
        .delete();
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = UsersModel;
