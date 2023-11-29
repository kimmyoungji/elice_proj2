<<<<<<< HEAD
function errorMiddleware(error, req, res, next) {
=======
const errorMiddleware = (error, req, res, next) => {
>>>>>>> dev-back
  console.log("\x1b[33m%s\x1b[0m", error);
  if (error.status) {
    res.status(error.status).send({
      statusCode: error.status,
      message: error.message,
      data: {},
    });
  } else {
    // 정의되지 않은 Error
    res.status(400).send({
      statusCode: 400,
      message: error.message,
      data: {},
    });
  }
<<<<<<< HEAD
}

module.exports = { errorMiddleware };
=======
};

module.exports = errorMiddleware;
>>>>>>> dev-back
