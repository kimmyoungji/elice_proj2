require("dotenv").config();

module.exports = {
  client: "mysql",
  connection: {
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: "turtine",
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
};
