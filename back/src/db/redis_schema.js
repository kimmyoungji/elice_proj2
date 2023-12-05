const { SchemaFieldTypes } = require("redis");

const usersSchema = {
  "$.user_id": {
    type: SchemaFieldTypes.NUMERIC,
    SORTABLE: true,
    AS: "user_id",
  },
  "$.username": {
    type: SchemaFieldTypes.TEXT,
    AS: "username",
  },
  "$.email": {
    type: SchemaFieldTypes.TEXT,
    AS: "email",
  },
  "$.password": {
    type: SchemaFieldTypes.TEXT,
    AS: "password",
  },
  "$.level": {
    type: SchemaFieldTypes.NUMERIC,
    AS: "level",
  },
};

module.exports = { usersSchema };
