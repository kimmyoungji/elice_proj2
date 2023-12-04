import React, { useEffect } from 'react';
import CalendarForm from '../features/calender/CalendarPageForm';
import axios from 'axios';

const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  const monthString = year + '-' + month;
  const dateString = year + '-' + month + '-' + day;

  return [monthString, dateString];
}

function CalendarPage() {
  // api 연결 후 수정할 변수
  let habitList = {date: getDate()[1]}; //{date: '2023-11-25', habit1: "오늘 습관1", habit2: "오늘 습관2", habit3: "오늘 습관3"}
  let checkdata = {};

  // get api로 기본 정보 가져오기
  // 달마다 습관 완료한 날짜만 받아옴 -> fullfilledDate : date 배열
  useEffect(() => {
    axios({
        method: 'get',
        url: "http://"+ window.location.hostname +":5001/fulfilled-habits",
        params: {date: getDate()[1]},
        withCredentials: true,
        headers: {
        "Content-Type": "application/json",
        }
    })
    .then((res) => {
      console.log(res.data);
        const habitIds = res.data.habitIds[getDate()[1]];
        if (habitIds.length === 0) {
          habitList.habit1 = "습관을 추가해주세요"
        } else {
          habitIds.map((habit) => habitList.habit1 = habit)
        }
        console.log('habitList', habitList);
    }).catch((error) => {
        // 추후 수정예정
        console.log(error)
    }).then(() => {
    });

    axios({
        method: 'get',
        url: "http://"+ window.location.hostname +":5001/fulfilled-habits",
        params: {month: getDate()[0]},
        withCredentials: true,
        headers: {
        "Content-Type": "application/json",
        }
    })
    .then((res) => {
        // 백에 카멜케이스로 요청
        const checkDates = res.data.dates;
        checkdata.current = checkDates;
        console.log('checkdata', checkdata);
    }).catch((error) => {
        // 추후 수정예정
        console.log(error)
    }).then(() => {
    });
  }, [])
    

  return (
    <CalendarForm habitlist={habitList} checkdata={checkdata}/>
  );
}

export default CalendarPage;
