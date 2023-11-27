// import axios from "axios";

// //request사용
// const config = {
//   baseURL:
//     process.env.REACT_APP_API_BASE_URL || process.env.REACT_APP_BUILD_BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   timeout: 5000,
//   withCredentials: true,
// };

// export const api = axios.create(config); // 인스턴스

// // [Client] ------[ Interceptor ] -----> [Server]
// api.interceptors.request.use(
//   (req) => {
//     //요청 data가 formData일때
//     // console.log("req", req);
//     if (req.data && req.data instanceof FormData) {
//       req.headers["Content-Type"] = "application/json";
//     }
//     //요청 data가 Object일 때
//     if (req.data && req.data instanceof Object) {
//       req.headers["Content-Type"] = "application/json";
//       req.data = JSON.stringify(req.data);
//     }
//     if (req.status >= 400 && req.status < 400) {
//       console.log(`잘못된 요청입니다. ${req.status}`);
//       // throw new Error("Error");
//     }
//     if (req.status <= 500) {
//       console.log(`에러가 발생하였습니다 ${req.status}`);
//     }
//     return req;
//   },
//   (err) => {
//     // 400(Bad Requeset), 404(NotFound)
//     console.log(err);
//   }
// );

// // [Client] <------[ Interceptor ] ----- [Server]

// api.interceptors.response.use((res) => {
//   if (res.statusCode >= 400 && res.status < 500) {
//     alert(`요청이 실패하였습니다: error code ${res.status} `);
//   } else if (res.statusCode >= 500) {
//     alert(`요청이 실패하였습니다 error code ${res.status}`);
//   }
//   return res;
// });

// export default api;