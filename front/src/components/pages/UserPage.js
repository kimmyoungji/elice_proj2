import React, { useEffect } from "react";
import UserPageForm from "../features/user/UserPageForm";
import axios from "axios";
import { api } from "../utils/axiosConfig";

const UserPage = async () => {
  useEffect(() => {
    api({
      method: "get",
      url: "users/user",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {});
  }, []);

  const userInfo = {
    userName: "거북잉",
    userImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    userEmail: "elice@elice.com",
    password: "",
    passwordCheck: "",
  };

  return (
    <>
      <UserPageForm userInfo={userInfo} />
    </>
  );
};

export default UserPage;
