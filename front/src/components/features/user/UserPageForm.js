import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Col, Button, Container, Image, Form, Row } from 'react-bootstrap';
import './UserPage.css';


const UserPageForm = ( {...userInfo} ) => {
    const { userName, userImg, userEmail, password, passwordCheck } = userInfo.userinfo;
    const [image, setImage] = useState(userImg) //filereader를 위한 image
    const fileInput = useRef(null)

    const navigate = useNavigate();

    const [form, setForm] = useState({
        userFormName: userName,
        userFormImg: image,
        userFormPassword: password,
        userFormPasswordCheck: passwordCheck,
    });

    // 다른 page에서도 filereader 필요하면 따로 컴포넌트로
    const onChange = (e) => {
        handleInputChange(e)
        const uploadFile = e.target.files[0]

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result)
        }
        if (uploadFile) {
            reader.readAsDataURL(uploadFile)
        } else {
            return
        }
    }

    const handleInputChange = (e) => {
        if (e.target.type === "file") {
            const id = "userFormImg";
            const value = e.target.files[0];
            setForm((prevData) => ({
                ...prevData,
                [id]: value,
                }));
        } else {
            const { id, value } = e.target;
            setForm((prevData) => ({
            ...prevData,
            [id]: value,
            }));
        }
      };
    
    const editing = (e) => {
        e.preventDefault();
        if (form.userFormPassword !== form.userFormPasswordCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return false
        }
        const formData = new FormData();
        formData.append("name", form.userFormName);
        formData.append("file", form.userFormImg);
        formData.append("password", form.userFormPassword);
        formData.append("passwordcheck", form.userFormPasswordCheck);
        // formData.append("data", new Blob([JSON.stringify(formData)], {type: 'application/json'}));

        // FormData 확인
        // for (let key of formData.keys()){
        //     console.log(key);
        // }
        // console.log('-----');
        // for (let value of formData.values()){
        //     console.log(value);
        // }


        // post api 호출
        axios({
            method: 'post',
            url: '', // 서버 url에 따라
            data: formData,
        })
        .then((result) => {console.log('요청성공', result)})
        .catch((error) => {console.log('요청실패', error)})
    }

    return (
      <>
        <Container className="mb-3 center-container mt-5">
            <Col className="center-content mb-3">
                <div className="mb-3 username" style={{ fontSize: '1.5rem' }}>
                    {userName}님의 마이페이지
                </div>
                <Col className="mb-3"> 
                    <Image src={image} roundedCircle height="200" width="200"/>
                </Col>
                <label htmlFor="fileInput" id="fileInput-text">프로필 사진 변경
                    <input type="file" id="fileInput"
                            accept='image/jpg, image/png, image/jpeg, image/gif'
                            style={{ display: 'none' }}
                            onChange={onChange}
                            ref={fileInput}/>
                </label>
                <Row className="mt-3">
                    <Col>
                        {userEmail}
                    </Col>
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
                        <Button className="mb-3" variant="primary" type="submit"
                            onClick={(e) => editing(e)}>
                            변경사항 저장
                        </Button>
                    </Form>
                    <Button variant="secondary" type="submit" size="sm"
                        onClick={() => navigate('/')}>
                        회원탈퇴
                    </Button>
                </Col>
            </Col>
        </Container>
      </>
    )
}

export default UserPageForm;