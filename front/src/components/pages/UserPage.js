import React from "react";
import UserPageForm from "../features/user/UserPageForm";
import axios from "axios";
import { api } from "../utils/axiosConfig";

const UserPage = () => {
  const userInfo = {
    userName: "",
    userImg: "",
    // userEmail: "",
    // password: "",
    // passwordCheck: "",
    // 패스워드랑 이메일 빼도 되지 않을까용, 유저네임, 이미지 빈칸으로 두고 일단 커밋- 성혜
  };

  // get api로 기본 정보 가져오기
  // userName, userImg, userEmail
  api
    .get("users/{user_id}", userInfo)
    .then((res) => {
      console.log(res);
      // response
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {});

  return (
    <>
      <UserPageForm userInfo={userInfo} />
    </>
  );
};

export default UserPage;
