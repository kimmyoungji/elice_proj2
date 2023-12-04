import React, { useState, useEffect } from 'react';
import HabitForm from '../features/habit/HabitPageForm';
import HabitListForm from '../features/habit/HabitListForm';
// import HabitCheckForm from '../features/habit/HabitCheckForm';
import axios from 'axios';

export default function HabitPage() {
  // const [isEditing, setIsEditing] = useState(true);
  const [selectedHabits, setSelectedHabits] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);

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
      console.log('Page', res.data);
      const habitIds = res.data.habitIds;
      const date = res.data.habitDates[0];
      setSelectedHabits( habitIds );
      setSelectedDate(date);
    }).catch((error) => {
      setSelectedHabits( false );
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
      {selectedHabits !== null && <HabitForm
            userInfo={userInfo}
            habitList={habitList}
            selectedDate={selectedDate}
            selectedHabits={selectedHabits}
            />}
      <HabitListForm habitList={habitList}/>
    </>
  );
}
