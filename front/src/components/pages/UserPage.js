import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import UserPageForm from '../features/user/UserPageForm';

// import { Col, Button, Container, Image, Form, Row } from 'react-bootstrap';

const UserPage = () => {
    const [userInfo, setUserInfo] = useState({
        userName : "거북잉",
        userEmail : "elice@elice.com",
        password : "",
        passwordCheck: ""
    })

    return (
      <>
        <UserPageForm userinfo={userInfo} />
      </>
    )
}

export default UserPage;