const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");
const UsersModel = require("../db/models/users");
const knex = require("../db/knex");
const users = new UsersModel(knex);
const { UnauthorizedError } = require("../lib/custom-error");
dotenv.config({path: path.resolve(__dirname,"../../.env")})

async function isLoggedIn(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.currentUserId = decoded.user_id;

    next();
  } catch (err) {
    const error = new UnauthorizedError(err);
    next(error);
  }
}

module.exports = isLoggedIn;
