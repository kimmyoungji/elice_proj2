import React, { useState, useEffect, useContext, useMemo } from 'react';
import HabitForm from '../features/habit/HabitPageForm';
import HabitListForm from '../features/habit/HabitListForm';
import { Card, Container, Image } from 'react-bootstrap';
import logo from "../common/header/logo.png"
import api from "../utils/axiosConfig";
import { HabitContext, HabitActionContext } from "../../Context/HabitContext";
import useApi from "../../hooks/useApi";


// const habitList = {
//   habit1: "장바구니(에코백) 사용하기",
//   habit2: "음식 포장 시 다회용기 사용하기",
//   habit3: "텀블러나 머그컵 사용하기",
//   habit4: "플라스틱 빨대 안 쓰기",
//   habit5: "플라스틱 세척해서 분리배출하기",
//   habit6: "무라벨 제품 구매하기"
// }

export default function HabitPage() {
  const [selectedHabits, setSelectedHabits] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { habit } = useContext(HabitContext);
  const { select } = useContext(HabitActionContext);
  const [ habitList, sethabitList ] = useState({});
  const { result } = useApi('get', "/planned-habits",)

  const setDefaultHabitList = useMemo(() => {
      sethabitList(() =>
      habit.reduce((acc, value) => {
        acc[value.id] = value.text;
        return acc;
      }, {}))
  }, [])

  const setDefaultData = async () => {
    // await api.get("/planned-habits")
    // .then((res) => {
    //   const { habitIds, habitDates } = res;
    //   if (habitIds.length === 0) {
    //     setSelectedHabits( false );
    //   } else {
    //     const date = habitDates[0];
    //     habitIds.map((id) => {
    //       select(id)
    //     });
    //     console.log('수정 끝')
    //     setSelectedHabits( habitIds );
    //     setSelectedDate(date);
    //   }
    // }).catch((error) => {
    // }).finally(() => {
    //   setIsLoading(false); // 로딩중 제거
    // });
    const { habitIds, habitDates } = result;
    if (habitIds.length === 0) {
      setSelectedHabits( false );
    } else {
      const date = habitDates[0];
      habitIds.map((id) => {
        select(id)
      });
      console.log('수정 끝')
      setSelectedHabits( habitIds );
      setSelectedDate(date);
      }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    setDefaultData();
    
    // const fetchData = async () => {
    //   setIsLoading(true);
    //   true && await setDefaultData();
    // };
  
    // fetchData();
  }, []);

  return (
    <>
      {isLoading &&
        <Container className="loading-container">
            <Card className="d-flex justify-content-center align-items-center"
              style={{ height: '450px', marginTop: "7%" }}>
                <Card.Title>
                    <span style={{ fontSize: "30px" }}>로딩중입니다</span>
                </Card.Title>
                <Image
                  src={logo}
                  alt="Logo image"
                  style={{ width: '70%', marginTop: "70px" }}/>       
            </Card>
        </Container>}
      {selectedHabits !== null && <HabitForm
            habitList={habitList}
            selectedDate={selectedDate}
            selectedHabits={selectedHabits}
            />}
      {habitList && <HabitListForm habitList={habitList}/>}
    </>
  );
}