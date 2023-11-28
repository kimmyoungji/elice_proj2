const pool = require("../server");
const connectDB = (req, res, next) => {
  console.log("Connecting to the turtineDB...");
  pool.getConnection((error, connection) => {
    if (error) {
      console.error("Database connection failed: " + error.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    console.log("Connected to the database.");
    connection.query("USE turtine");

    // Attach the database connection to the request object
    req.dbConnection = connection;

    // Continue to the next middleware or route handler
    next();
  });
};

module.exports = connectDB;
