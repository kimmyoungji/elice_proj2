const dotenv = require("dotenv");
const path = require("path");
const { S3Client } = require("@aws-sdk/client-s3");
dotenv.config({ path: path.resolve(__dirname,"../../.env") })

module.exports = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
