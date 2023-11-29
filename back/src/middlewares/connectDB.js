const pool = require("../db/db");

const connectDB = async (req, res, next) => {
  console.log("Connecting to the turtineDB...");

  try {
    const connection = await pool.getConnection();
    await connection.query("USE turtine");
    console.log("Connected to the turtineDB.");
    req.dbConnection = connection;
    next();
  } catch (error) {
    console.error("Database connection failed: " + error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = connectDB;
