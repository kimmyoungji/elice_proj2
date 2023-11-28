const promisePool = require("../db");

const UsersModel = {
  async findOne(user_id) {
    return await promisePool.query(`SELECT * FROM users WHERE user_id=?;`, [
      user_id,
    ]);
  },

  //CRUD
  //쿼리문
  //최대한, 기본에 가깝게, 최대한 작은 기능으로 메소들르 정의해야한느데 --> 여기 정의 되는 메소드는 재활용될 가능성이 높기 때문에 범용적인 기능
};

module.exports = UsersModel;
