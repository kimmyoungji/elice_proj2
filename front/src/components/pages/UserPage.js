import React from 'react';
import UserPageForm from '../features/user/UserPageForm';
import axios from 'axios';


const UserPage = () => {
    const userInfo = {
        userName : "거북잉",
        userImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        userEmail : "elice@elice.com",
        password : "",
        passwordCheck: ""
    }

    // get api로 기본 정보 가져오기
    // userName, userImg, userEmail
    axios.get("http://"+ window.location.hostname +":5001/users/user")
    .then((res) => {
        console.log(res.data);
         // response 
    }).catch((error) => {
        console.log(error)
    }).then(() => {
    });

    return (
      <>
        <UserPageForm userInfo={userInfo} />
      </>
    )
}

export default UserPage;