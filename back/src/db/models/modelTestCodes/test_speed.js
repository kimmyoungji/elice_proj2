const knex = require("../../knex");
async function searchDatabase(sql) {
  console.time("search-database"); // Start measuring time
  try {
    // Your Knex query goes here
    const result = await knex.raw(sql);
  } catch (error) {
    console.error(error);
  } finally {
    console.timeEnd("search-database"); // Stop measuring time and log the result
  }
}

module.exports = { searchDatabase };
