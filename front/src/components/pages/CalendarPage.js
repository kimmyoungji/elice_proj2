import React from 'react';
import CalendarForm from '../features/calender/CalendarPageForm';
import axios from 'axios';

function CalendarPage() {
  const habitList = {date: '2023-11-25', habit1: "오늘 습관1", habit2: "오늘 습관2", habit3: "오늘 습관3"}

  // get api로 기본 정보 가져오기
  // userName, userImg, userEmail
  axios.get("http://"+ window.location.hostname +":5001/fullfilled_habit/{user_id}")
      .then((res) => {
          console.log(res)
          // response 
      }).catch((error) => {
          console.log(error)
      }).then(() => {
      });

  return (
    <CalendarForm habitlist={habitList}/>
  );
}

export default CalendarPage;