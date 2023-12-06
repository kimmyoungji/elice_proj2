import React, { useState, useEffect, useContext } from 'react';
import HabitForm from '../features/habit/HabitPageForm';
import HabitListForm from '../features/habit/HabitListForm';
import { Card, Container, Image } from 'react-bootstrap';
import logo from "../common/header/logo.png"
import api from "../utils/axiosConfig";
import { UserStateContext } from "../../Context/UserStateContext";


const habitList = {
  habit1: "장바구니(에코백) 사용하기",
  habit2: "음식 포장 시 다회용기 사용하기",
  habit3: "텀블러나 머그컵 사용하기",
  habit4: "플라스틱 빨대 안 쓰기",
  habit5: "플라스틱 세척해서 분리배출하기",
  habit6: "무라벨 제품 구매하기"
}

export default function HabitPage() {
  const [selectedHabits, setSelectedHabits] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const user = useContext(UserStateContext);

  // 사용자가 계획한 습관이 있는지 확인
  // if yes -> 계획한 습관 띄우기
  // if no -> 추가하기 버튼 띄우기
  useEffect(() => {
    setIsLoading(true);
    api({
      method: 'get',
      url: "/planned-habits",
    })
    .then((res) => {
      const habitIds = res.habitIds;
      if (habitIds.length === 0) {
        setSelectedHabits( false );
      } else {
        const date = res.habitDates[0];
        setSelectedHabits( habitIds );
        setSelectedDate(date);
      }
    }).catch((error) => {
      
    }).finally(() => {
      setIsLoading(false);
    });
  }, [])
  
  const userInfo = {
    userName : user.username,
    turtleLevel: user.level
  }

  return (
    <>
      {isLoading &&
        <Container className="loading-container">
            <Card className="d-flex justify-content-center align-items-center"
              style={{ height: '450px', marginTop: "7%" }}>
                <Card.Title>
                    <span style={{ fontSize: "30px" }}>로딩중입니다</span>
                </Card.Title>
                <Image src={logo} alt="Logo image"
                style={{ width: '70%', marginTop: "70px" }}/>       
            </Card>
        </Container>}
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
