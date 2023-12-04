import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Form } from 'react-bootstrap';
import './HabitPage.css';
import axios from 'axios';

const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    
    const dateString = year + '-' + month + '-' + day;
    
    return dateString;
}

export default function HabitShowForm ({ userName, habits, selectedDate, selectedHabit, request }) {
    const [ check, setCheck ] = useState(false);
    const [ selectHabit, setSelectHabit ]= useState(selectedHabit)
    const [ checkHabit, setCheckHabit ] = useState();
    const [ fulfillHabit, setFulfillHabit ] = useState([]);
    const today = getDate();
    console.log('selectedDate', selectedDate);
    console.log('selectHabit',selectHabit);
  
    const handleFulfillChange = (key) => {
      setFulfillHabit((prev) => {
          if (prev.includes(key)) {
              return prev.filter((habitKey) => habitKey !== key);
          } else {
          return [...prev, key]
          }
      })
    }
  
    const getSelectedHabit = selectHabit.map((habit) => (
        <ListGroup.Item>
            <Form.Check inline key={habit} 
            type='checkbox'
            onClick={() => handleFulfillChange(habit)}
            style={{ fontSize: "14px"}}/>{habits[habit]}
        </ListGroup.Item>
    ));
  
    const getCheckedHabit = [checkHabit].map((habit) => (
      <ListGroup.Item>
          <Form.Check disabled key={habit} 
          type='checkbox'
          //onClick={() => handleRadioChange(day)}
          style={{ fontSize: "14px"}}/>{habits[habit]}(완료)
      </ListGroup.Item>
      ));
  
  
    const getDoneHabit = () => {
          // axios({
          //     method: 'get',
          //     url: "http://"+ window.location.hostname +":5001/fulfilled-habits",
          //     params: {date: today},
          //     withCredentials: true,
          //     headers: {
          //     "Content-Type": "application/json",
          //     }
          // })
          // .then((res) => {
          //     console.log('res.data.habitIds', res.data.habitIds);
          //     // const { habitId } = res.data.habitIds;
          //     const habitId = ['habit2'];
          //     if (!habitId) {
          //     // setCheckHabit();
          //     // let difference = selectedHabit.filter(x => !checkHabit.includes(x));
          //     // setSelectHabit(difference)
          //     } else {
          //     setCheckHabit(habitId);
          //     }
          // }).catch((error) => {
          //     // 추후 수정예정
          //     console.log(error)
          // }).then(() => {
          // });
  
        return (
          <>
              {/* 현재까지 체크된 습관이 없는 경우 */}
              {!checkHabit && getSelectedHabit}
  
              {/* 체크된 습관이 있는 경우 */}
              {checkHabit && getSelectedHabit && getCheckedHabit}
          </>
        )
    }
    useEffect(() => {
      if (!checkHabit) {
          console.log('checkHabit', checkHabit);
          let difference = selectedHabit.filter(x => [!checkHabit].includes(x));
          // setSelectHabit(difference)
      }
      }, [checkHabit, selectedHabit])
  
  
      const fulfilledButton = () => {
          console.log(fulfillHabit);
          axios({
              method: 'post',
              url: "http://"+ window.location.hostname +":5001/fulfilled-habits",
              withCredentials: true,
              headers: {
              "Content-Type": "application/json",
              },
              data: {
                  fulfilledHabits: fulfillHabit
              }
          })
          .then((res) => {
              console.log(res);
          }).catch((error) => {
              // 추후 수정예정
              console.log(error)
          }).then(() => {
          });
      }
    return (
        <>
            <Card.Body style={{ height: "100%" }}>
                <Card.Title>
                    <span style={{ fontSize: "30px" }}>
                        {userName}</span>의 습관
                </Card.Title>
                <div style={{ color: "grey", marginBottom: '20px', fontSize: "80%" }}>
                    실천한 습관을 선택해주세요 !</div>
                <div>실천 종료까지...  <b>D-{selectedDate}</b></div>
                {/* api 요청 없이 추가한 습관들 리스트 그대로 가져와서 띄우기 */}
                {!request && <ListGroup style={{ position: 'relative', width: '100%', fontSize: "83%", marginTop: "40px"}}>
                    {getSelectedHabit}
                </ListGroup>}
                {/* api 요청으로 완료한 습관들 구분해서 표시하기 */}
                {request && <ListGroup style={{ position: 'relative', width: '100%', fontSize: "83%", marginTop: "40px"}}>
                  {getDoneHabit()}
                </ListGroup>}
            </Card.Body>
                <div className="d-flex justify-content-center">
                    <Button className="select-button" variant="primary" size="lg"
                        onClick={() => fulfilledButton()}
                        style={{ width: "30%", fontSize: '13px', margin: "10px"}}>
                            실천완료
                    </Button>
                </div>
        </>
    )
  }

