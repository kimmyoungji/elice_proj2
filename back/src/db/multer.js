const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("./aws");
const dayjs = require("dayjs");
const fileFilter = require("../middlewares/fileFilter");

const s3 = new aws.S3();

const storage = multerS3({
  s3: s3,
  bucket: "turtine-image",
  acl: "public-read-write",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(
      null,
      "uploads/" + dayjs().format("YYYY-MM-DD") + "_" + file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
