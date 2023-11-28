const express = require("express");
const app = express();

const introRouter = require("./routers/introRouter");
app.use("/graphs", introRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});
