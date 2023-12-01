import React, { useState, useEffect } from 'react';
import HabitForm from '../features/habit/HabitPageForm';
import HabitListForm from '../features/habit/HabitListForm';
import axios from 'axios';
// import { api } from "../utils/axiosConfig";

export default function HabitPage() {
  const [isEditing, setIsEditing] = useState(true);
  const [selectedHabits, setSelectedHabits] = useState();

  // 페이지 처음 로드되면 사용자의 계획 습관 조회하기
  //     api.get("/planned-habits", {
  // useEffect(() => {
  //     
  //     });
  // })

  // 사용자가 계획한 습관이 있는지 확인
  // if yes -> 계획한 습관 띄우기
  // if no -> 추가하기 버튼 띄우기
  useEffect(() => {
    axios({
      method: 'get',
      url: "http://"+ window.location.hostname +":5001/planned-habits",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => {
      // 백에 카멜케이스로 수정 요청함
      const { habitIds } = res.data.plannedHabits[0];
      setSelectedHabits(habitIds);
    }).catch((error) => {
      // 추후 수정예정
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
      <HabitForm
        userInfo={userInfo}
        habitList={habitList}
        selectedHabits={selectedHabits} />
      {isEditing === true && <HabitListForm habitList={habitList} />}
    </>
  );
}

