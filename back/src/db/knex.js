const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname,"../../.env") });

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB,
  },
});

module.exports = knex;
