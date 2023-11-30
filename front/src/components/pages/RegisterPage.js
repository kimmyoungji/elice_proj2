import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "../features/Register/validate";

export default function RegisterPage() {
  const navigate = useNavigate();

  //email, password, confirmPassword, Nickname 상태 생성
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [nickname, setNickname] = useState("");
  // const [idErrMsg, setIdErrMsg] = useState("");
  // const [idCheckMsg, setIdCheckMsg] = useState("");

  //이메일 형태 적합 여부 확인
  const isEmailValid = validateEmail(email);
  // 비밀번호가 5글자 이상인지 여부 확인
  const isPasswordValid = validatePassword(password);
  // 비밀번호와 확인용 비밀번호 일치 여부를 확인
  const isPasswordSame = password === confirmPwd;
  // 닉네임 형태 및 길이 적합 여부를 확인.
  const isNicknameValid = validateNickname(nickname);

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNicknameValid;

  // 이메일 중복검사 success시 닉네임 중복검사
  const onClickRegister = (e) => {
    e.preventDefault();

    axios.get("/users").then((res) => {
      const resMessage = res.data.message;
      if (resMessage === "FAIL") {
        alert("이미 사용중인 이메일입니다.");
      } else if (resMessage === "SUCCESS") {
        axios.get("/users").then((res) => {
          const resMessage = res.data.message;
          if (resMessage === "FAIL") {
            alert("이미 사용중인 닉네임입니다.");
          } else if (resMessage === "SUCCESS") {
            alert("회원가입이 정상적으로 완료되었습니다.");
          }
        });
      }
    });
  };

  // 회원가입 버튼 눌렀을 때 post 요청 보내서 회원가입 처리하기: 백 일단 정리되면 정리하기로 함

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await axios.post("/users", {
        email,
        password,
        nickname,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col lg={5}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="registerEmail">
            <Form.Label>이메일 주소</Form.Label>
            <Form.Control
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <Form.Text className="text-success">
                이메일 형식이 올바르지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registerPassword" className="mt-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <Form.Text className="text-success">
                비밀번호는 8글자 이상부터 설정 가능합니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registerConfirmPassword" className="mt-3">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
            {!isPasswordSame && (
              <Form.Text className="text-success">
                비밀번호가 일치하지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registerName" className="mt-3">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {!isNicknameValid && (
              <Form.Text className="text-success">
                2~8자로 설정 가능합니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                variant="primary"
                type="submit"
                onClick={onClickRegister}
                disabled={!isFormValid}
              >
                회원가입
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}
