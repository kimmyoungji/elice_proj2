import React, { useState, useEffect } from 'react';
import HabitForm from '../features/habit/HabitPageForm';
import HabitListForm from '../features/habit/HabitListForm';
import axios from 'axios';
// import { api } from "../utils/axiosConfig";

export default function HabitPage() {
  const [isEditing, setIsEditing] = useState(true);

  // 페이지 처음 로드되면 사용자의 완료 습관 조회하기
  //     api.get("/fullfilled_habits", {
  // useEffect(() => {
  //     
  //     });
  // })

  useEffect(() => {
    axios({
      method: 'get',
      url: "http://"+ window.location.hostname +":5001/fullfilled_habits",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => {
        const { fullfilled_habit_id, habit_id } = res.data;
      console.log(res);
    }).catch((error) => {
        console.log(error)
    }).then(() => {
    });
}, [])

  const userInfo = {
    userName : "거북잉",
    turtleLevel: 2
  }

  const habitList = {
    habit1: "장바구니(에코백) 사용하기",
    habit2: "음식 포장 시 다회용기 사용하기",
    habit3: "텀블러나 머그컵 사용하기",
    habit4: "플라스틱 빨대 안 쓰기",
    habit5: "플라스틱 세척해서 분리배출하기",
    habit6: "무라벨 제품 구매하기"
  }

  return (
    <>
      <HabitForm userInfo={userInfo} habitList={habitList} />
      {isEditing === true && <HabitListForm habitList={habitList} />}
    </>
  );
}

