import React, { useEffect, useContext } from 'react';
import UserPageForm from '../features/user/UserPageForm';
import axios from 'axios';
import { UserStateContext } from "../../Context/UserStateContext";


const UserPage = () => {
    useEffect(() => {
      axios({
        method: 'get',
        url: "http://"+ window.location.hostname +":5001/users/user",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        console.log(res);
      }).catch((error) => {
          console.log(error)
      }).then(() => {
      });
  }, [])

    // get api로 기본 정보 가져오기
    // userName, userImg, userEmail
    const userInfo = {
        userName : "거북잉",
        userImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        userEmail : "elice@elice.com",
        password : "",
        passwordCheck: ""
    }
    const user = useContext(UserStateContext); // userState
    console.log('user', user)

    return (
      <>
        <UserPageForm userInfo={userInfo} />
      </>
    )
}

export default UserPage;