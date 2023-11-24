import React, { useState } from "react";
import api from "./axiosConfig";
import { email, nickname } from "./RegisterForm";

export const duplicateEmail = (email) => {
  return;
};
const [checkMail, setCheckMail] = useState(false);
const [checkNickname, setCheckNickname] = useState(false);

const onCheckEmail = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("user/register/email", { email });

    const { result } = res.data;

    if (!result) {
      setEmailMsg("이미 등록된 메일입니다. 다시 입력해주세요.");
      setCheckMail(false);
    } else {
      setEmailMsg("사용 가능한 메일입니다.😊");
      setCheckMail(true);
    }
  } catch (err) {
    console.log(err);
  }
};

const onCheckNickname = async (e) => {
  e.preventDefault();

  try {
    const res = await Api.post("user/register/nickname", { nickname });

    const { result } = res.data;

    if (!result) {
      setNicknameMsg("이미 등록된 닉네임입니다. 다시 입력해주세요.");
      setCheckNickname(false);
    } else {
      setNicknameMsg("사용 가능한 닉네임입니다.😊");
      setCheckNickname(true);
    }
  } catch (err) {
    console.log(err);
  }
};
