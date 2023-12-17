import React, { useEffect, useState } from 'react';
import CalendarForm from '../features/calender/CalendarPageForm';
import api from "../utils/axiosConfig";
import getDate from "../utils/date";


function CalendarPage() {
  const [habitList, setHabitList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let monthCheckDate = {};

  const setDefaultData = async () => {
    // 전역상태관리로 이 호출이 필요없어짐. -> 습관 선택한 직후에만...
    // await api.get("/fulfilled-habits",{
    //   params: {date: getDate()[1]},
    // })
    // .then((res) => {
    //     const habitIds = res.habitIds;
    //     if (habitIds.length === 0) {
    //       setHabitList(() => ({
    //         date: getDate()[1],
    //         habit: "습관을 추가해주세요"
    //       }));
    //     } else {
    //       setHabitList(() => ({
    //         date: getDate()[1],
    //       ...habitIds.reduce((acc, habit, index) => {
    //         acc[`habit${index + 1}`] = habit;
    //         return acc;
    //         }, {})
    //       }));
    //     }
    // }).catch((error) => {
    //     console.log(error)
    // }).finally(() => {
    //   setIsLoading(true);
    // })
  
    await api.get("/fulfilled-habits", {
        params: {month: getDate()[0]},
    })
    .then((res) => {
        const checkDates = res.dates;
        monthCheckDate.current = checkDates;
    }).catch((error) => {
        console.log(error)
    }).finally(() => {
      setIsLoading(true);
    })
  }
  useEffect(() => setDefaultData(), [])
  
  return (
    <>
      {isLoading && <CalendarForm habitlist={habitList} checkdate={monthCheckDate}/>}
    </>
    
  );
}

export default CalendarPage;
