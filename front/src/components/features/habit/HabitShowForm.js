import React, { useState, useMemo, useCallback, useContext } from 'react';
import { Card, Button, ListGroup, Form } from 'react-bootstrap';
import api from "../../utils/axiosConfig";
import getDate from "../../utils/date";
import { HabitActionContext, HabitContext } from "../../../Context/HabitContext";


export default function HabitShowForm ({ userName, habits, selectedDate, selectedHabit, request }) {
    const [check, setCheck] = useState(false);
    const [selectHabit, setSelectHabit]= useState(selectedHabit)
    const [checkHabit, setCheckHabit] = useState([]);
    const [fulfillHabit, setFulfillHabit] = useState([]);
    const { fulfill } = useContext(HabitActionContext);
    const { habit } = useContext(HabitContext);
    const today = getDate();
  
    const handleFulfillChange = useCallback((key) => {
      setFulfillHabit((prev) => {
          if (prev.includes(key)) {
              return prev.filter((habitKey) => habitKey !== key);
          } else {
          return [...prev, key]
          }
      })
    }, [])
  
    const getSelectedHabit = useMemo(() => {
        return selectHabit.map((habit, idx) => (
            <ListGroup key={idx}>
                <ListGroup.Item>
                    <Form.Check
                        inline
                        type='checkbox'
                        onClick={() => handleFulfillChange(habit)}
                        style={{ fontSize: "14px"}}/>
                        {habits[habit]}
                </ListGroup.Item>
            </ListGroup>
        ));
    }, [selectHabit]) 

  
    const getCheckedHabit = useMemo(() => {
        return <>
                {selectHabit.map((habit, idx) => (
                <ListGroup.Item key={idx}>
                    <Form.Check 
                        inline
                        type='checkbox'
                        onClick={() => handleFulfillChange(habit)}
                        style={{ fontSize: "14px"}}/>
                        {habits[habit]}
                </ListGroup.Item>
                ))}
                {checkHabit.map((habit, idx) => (
                    <ListGroup.Item key={idx}>
                        <Form
                            style={{ fontSize: "12px"}}/>
                            <s>{habits[habit]} (완료)</s>
                    </ListGroup.Item>
                    ))
                }
            </>
    }, [selectHabit, checkHabit])
  
  
    const getDoneHabit = () => {
        if (!check) {
            api({
                method: 'get',
                url: "/fulfilled-habits",
                params: {date: today[1]},
            })
            .then((res) => {
                const habitId = res.habitIds;
                console.log('habitId', habitId);
                if (!habitId) {
                  setCheckHabit(false);
                } else {
                  let difference = selectedHabit.filter(x => !habitId.includes(x));
                  setCheckHabit(habitId);
                  setSelectHabit(difference);
                  habitId.map((id) => {
                    fulfill(id)
                  });
                }
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setCheck(true);
            });
            // DB문제로 test -> 원하는대로 구현 성공
            // const habitId = ['habit1']
            // console.log('habitId', habitId);
            // if (!habitId) {
            //     setCheckHabit(false);
            // } else {
            //     let difference = selectedHabit.filter(x => !habitId.includes(x));
            //     setCheckHabit(habitId);
            //     setSelectHabit(difference);
            //     habitId.map((id) => {
            //     fulfill(id)
            //     });
            // }
            // setCheck(true);
        }
        console.log(habit);
  
        return (
          <>
              {/* 현재까지 체크된 습관이 없는 경우 */}
              {checkHabit.length === 0 && getSelectedHabit}
  
              {/* 체크된 습관이 있는 경우 */}
              {checkHabit.length !== 0  && getCheckedHabit}
          </>
        )
    }
  

      const fulfilledButton = async () => {
          await api.post("/fulfilled-habits", {
                  fulfilledHabits: fulfillHabit
              })
          .then((res) => {
          }).catch((error) => {
              console.log(error)
          }).finally(() => {
            fulfillHabit && alert('실천 완료 !😊');
            setCheckHabit(checkHabit);
            setCheck(false);
            getDoneHabit();
            // done 수정
            fulfillHabit.map((id) => {
                fulfill(id)
              });
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
                <div>실천 종료까지  <b style={{ color: "red", fontSize: "120%"}}>D-{selectedDate}</b></div>
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
                <Button
                    className="select-button"
                    variant="primary" size="lg"
                    onClick={() => fulfilledButton()}
                    style={{ width: "30%", fontSize: '13px', margin: "10px"}}>
                        실천완료
                </Button>
            </div>
        </>
    )
  }

