import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Col, Button, Container, Image, Form, Row } from 'react-bootstrap';
// import naverImg from "../../assets/imgs/naver.png";
import '../features/user/UserPage.css';

const UserPage = () => {
    const username = "유림";
    const email = "elice@elice.com"
    const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userFormName: username,
        userFormPassword: '',
        userFormPasswordCheck: '',
      });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };

    const editing = (e) => {
        e.preventDefault();
        // console.log(formData);
    }

    return (
      <>
        <Container className="mb-3 center-container mt-5">
            <Col className="center-content mb-3">
                <div className="mb-3" style={{ fontSize: '1.5rem' }}>{username}님의 마이페이지</div>
                <Col className="mb-3"> 
                    <Image src={image} roundedCircle height="200" width="200"/>
                </Col>
                <Link to='/' style={{ textDecoration: "none"}}>프로필사진 변경</Link>
                <Row className="mt-3">
                    <Col className='email'>
                        {email}
                    </Col>
                    {/* <Col className='snsImg'>
                        <Image src={naverImg} height="50px" width="50px"/>
                    </Col> */}
                </Row>
                <Col className="mt-3" sm={{ span: 6, offset: 3 }}> 
                    <Form>
                        <Form.Group className="mb-3" controlId="userFormName">
                            <Form.Control placeholder="닉네임" onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userFormPassword">
                            <Form.Control type="password" placeholder="비밀번호" onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userFormPasswordCheck">
                            <Form.Control type="password" placeholder="비밀번호 확인" onChange={handleInputChange}/>
                        </Form.Group>
                        <Button className="mb-3" variant="primary" type="submit" onClick={(e) => editing(e)}>
                            변경사항 저장
                        </Button>
                    </Form>
                    <Button variant="secondary" type="submit" size="sm" onClick={() => navigate('/')}>
                        회원탈퇴
                    </Button>
                </Col>
            </Col>
        </Container>
      </>
    )
}

export default UserPage;

// xs는 간격
// Row는 옆으로 나란히
// mb: margin-bottom의미