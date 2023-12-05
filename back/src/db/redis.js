const { usersSchema } = require("./redis_schema");

const createClient = require("redis").createClient;

const redis = createClient({
  password: "6PPm1yruyMlCM22RFT9cyCiRYmqpd0tN",
  socket: {
    host: "redis-11620.c54.ap-northeast-1-2.ec2.cloud.redislabs.com",
    port: 11620,
  },
});

redis.on("error", (err) => console.log("Redis Client Error", err));

async function createUsersDoc() {
  await redis.connect().then(async (res) => {
    console.log("trying to connect with redis");
    try {
      await redis.ft.create("idx:users", usersSchema, {
        ON: "JSON",
        PREFIX: "users:",
      });
      console.log("redis users document created congrats!");
    } catch (e) {
      if (e.message === "Index already exists") {
        console.log("Index exists already, skipped creation.");
      } else {
        // Something went wrong, perhaps RediSearch isn't installed...
        console.error(e);
        process.exit(1);
      }
    }
  });
}

module.exports = { redis, createUsersDoc };
