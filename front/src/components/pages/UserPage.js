import React, { useEffect } from "react";
import UserPageForm from "../features/user/UserPageForm";
import api from "../utils/axiosConfig";

const UserPage = () => {
  const fetchData = async () => {
    try {
      const res = await api({
        method: "get",
        url: "users/user",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
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
