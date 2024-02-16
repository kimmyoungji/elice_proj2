const path = require("path");
const dotenv = require("dotenv");
const app = require('./src/app'); // src 폴더의 app.js 파일을 가져옴
dotenv.config({path: path.resolve(__dirname,".env")})

const PORT = process.env.SERVER_PORT || 5002;

// 서버를 지정된 포트로 시작
app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});