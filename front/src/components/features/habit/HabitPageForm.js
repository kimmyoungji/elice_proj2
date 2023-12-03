// 컴포넌트 분리 및 api 수정중
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Button, Col, Row, ListGroup, Image, Form } from 'react-bootstrap';
import './HabitPage.css';
import calendar from "../../../assets/imgs/calendar.png";
import axios from 'axios';

const getDate = () => {
    const today = new Date();
  
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
  
    const dateString = year + '-' + month + '-' + day;
  
    return dateString;
  }

export default function HabitForm ({ userInfo, habitList, selectedHabits }) {
    const { userName, turtleLevel } = userInfo;
    const habits = habitList;
    console.log('HabitForm selectedHabits', selectedHabits);

    return (
        <>
            <Container className="habits-container">
                <Row>
                    <TurtleForm userName={userName} turtleLevel={turtleLevel}/>
                    <HabitCardForm userName={userName}
                                   habits={habits}
                                   selectedHabits={selectedHabits}/>
                </Row>
            </Container>
        </>
    )
};


const TurtleForm = ({ userName, turtleLevel }) => {
    const navigate = useNavigate();

    const getTurtleImage = (level) => {
        const turtleImg = require(`../../../assets/imgs/거북이${level}.png`);
        return (
            <Card.Body className="d-flex justify-content-center align-items-center">
                <Card.Img src={turtleImg} alt="Card image" style={{ width: '70%'}}/>
            </Card.Body>
        )
    };
    return (
        <>
            <Col xs={12} className="d-flex justify-content-end">
                <Image src={calendar} alt="Calendar image"
                    style={{ width: '5%' }}
                    onClick={() => navigate('/calendar')}/>
            </Col>
            <Col xs={12} sm={6} className="turtle-container">
                <Card style={{ height: '450px' }}>
                    <Card.Body>
                        <Card.Title>
                            <span style={{ fontSize: "30px" }}>
                                {userName}</span>의 거북잉
                        </Card.Title>
                    </Card.Body>
                    {turtleLevel >= 1 && turtleLevel <= 5
                    && getTurtleImage(turtleLevel)}          
                </Card>
            </Col>
        </>
    )
}

const HabitCardForm = ({ userName, habits, selectedHabits }) => {
    const [ start, setStart ] = useState(selectedHabits ? false : true);
    const [ selectedHabit, setSelectedHabit ] = useState(selectedHabits);
    const [ request, setRequest ] = useState(true);
    const [ selectedDate, setSelectedDate ] = useState(0);

    const handleFormSubmit = (selectedHabit, selectedDate) => {
        setSelectedHabit(selectedHabit);
        setSelectedDate(selectedDate);
        setStart(false);
        setRequest(false);
      };

    return (
        <>
            <Col xs={12} sm={6} className="habit-container" >
                <Card style={{ height: '450px' }}>
                    {/* 기존에 선택한 습관이 없는 경우  */}
                    {start && <HabitAddForm userName={userName}
                                            habits={habits} onSubmit={handleFormSubmit}/>}
                    {/* 기존에 선택한 습관이 있는 경우  */}
                    {!start && <HabitShowForm userName={userName} habits={habits}
                                selectedDate={selectedDate} selectedHabit={selectedHabit} request={request}/>}
                </Card>
            </Col>
            
        </>
    )
}


const HabitAddForm = ({ userName, habits, onSubmit }) => {
    const [ addButton, setAddButton ] = useState(true);
    const [ selectedHabit, setSelectedHabit ] = useState([]);
    const [ selectedDate, setSelectedDate ] = useState(null);
    const [ pass, setPass ] = useState(false);

    const handleAddButton = () => {
        setAddButton(false);
    }

    const handleCheckboxChange = (key) => {
        setSelectedHabit((prev) => {
            if (prev.includes(key)) {
                return prev.filter((habitKey) => habitKey !== key);
            } else {
            return [...prev, key]
            }
        })
    }

    const handleRadioChange = (key) => {
        setSelectedDate(key)
    }

    const getHabitList = Object.keys(habits).map((key) => (
        <ListGroup.Item key={key} eventKey={key}>
                <Form.Check inline key={key} type="checkbox"
                onClick={() => handleCheckboxChange(key)}/>
            {habits[key]}
        </ListGroup.Item>
    ));

    const getDayList = ["3일", "5일", "7일"].map((day) => (
        <ListGroup.Item>
            <Form.Check key={day} 
            label={day}
            type='radio' name="group" 
            onClick={() => handleRadioChange(day)}
            style={{ fontSize: "14px"}}/>
        </ListGroup.Item> // name="group"으로 group 이름이 같아야 중복 선택 안됨
    ));

    const handleSelectButton = () => {
        setPass(true)
        if (onSubmit) {
            onSubmit(selectedHabit, selectedDate);
        }
        
        // 새롭게 선택한 습관 추가하기
        // 아직 api 연결 x -> 백에서 변수명과 data 수정중
        axios({
            method: 'post',
            url: "http://"+ window.location.hostname +":5001/planned-habits",
            withCredentials: true,
            headers: {
            "Content-Type": "application/json",
            },
            data: {
                habitIds: selectedHabit,
                habitDate: selectedDate
            }
        })
        .then((res) => {
            // 백에 카멜케이스로 수정 요청
            const { habit_ids } = res.data.plannedHabits[0];
            console.log(habit_ids);
        }).catch((error) => {
            // 추후 수정예정
            // error case 1) 선택 안 할 경우
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
                    습관과 실천 기간을 추가해보세요 !<br/>
                    한 번 정한 습관은 변경 없이 꾸준히 진행됩니다 😊
                </div>
                {addButton &&
                <div className="d-flex justify-content-center" style={{ marginTop: '100px' }}>
                    <Button variant="primary" size="lg"
                    onClick={() => handleAddButton()}>+
                    </Button>
                </div>
                }
                {!addButton &&
                <ListGroup style={{ position: 'relative', width: '100%', fontSize: "83%"}}>
                    {getHabitList}
                </ListGroup>}
            </Card.Body>
            {!addButton  &&
                <>
                    <ListGroup horizontal="sm"
                        className="d-flex justify-content-center"
                        style={{ border: "none" }}>
                        {getDayList}
                    </ListGroup>
                    <div className="d-flex justify-content-center">
                        <Button className="select-button" variant="primary" size="lg"
                            onClick={() => {
                                handleSelectButton();
                            }}
                            style={{ width: "30%", fontSize: '13px', margin: "10px"}}>
                                선택완료
                        </Button>
                    </div>
                </>
            }
        </>
    )
}


// 선택한 습관들 조회하기
const HabitShowForm = ({ userName, habits, selectedDay, selectedHabit, request }) => {
    const [ check, setCheck ] = useState(false);
    const [ checkHabit, setCheckHabit ] = useState(false);
    const today = getDate();

    const getSelectedHabit = selectedHabit.map((habit) => (
        <ListGroup.Item>
            <Form.Check inline key={habit} 
            type='checkbox'
            //onClick={() => handleRadioChange(day)}
            style={{ fontSize: "14px"}}/>{habits[habit]}
        </ListGroup.Item>
    ));

    const getDoneHabit = () => {
        setCheck(true)
    }

    // useEffect(() => {
    //     if (check) {
    //         console.log('get 요청');
    //         axios({
    //             method: 'get',
    //             url: "http://"+ window.location.hostname +":5001/fulfilled_habits",
    //             params: {date: today},
    //             withCredentials: true,
    //             headers: {
    //             "Content-Type": "application/json",
    //             }
    //         })
    //         .then((res) => {
    //             // 백에 카멜케이스로 요청
    //             const { habit_id } = res.data.habitIds;
    //             if (!habit_id) {
    //             setCheckHabit(null);
    //             } else {
    //             setCheckHabit(habit_id);
    //             }
    //             return getSelectedHabit
    //         }).catch((error) => {
    //             // 추후 수정예정
    //             console.log(error)
    //         }).then(() => {
    //         });
    //     }
    //   }, [check]);

    
    return (
        <>
            <Card.Body style={{ height: "100%" }}>
                <Card.Title>
                    <span style={{ fontSize: "30px" }}>
                        {userName}</span>의 습관
                </Card.Title>
                <div style={{ color: "grey", marginBottom: '20px', fontSize: "80%" }}>
                    실천한 습관을 선택해주세요 !</div>
                <div>실천 종료까지 남은 일자: {selectedDay}</div>
                {/* api 요청 없이 추가한 습관들 리스트 그대로 가져와서 띄우기 */}
                {!request && <ListGroup style={{ position: 'relative', width: '100%', fontSize: "83%", marginTop: "40px"}}>
                    {getSelectedHabit}
                </ListGroup>}
                {/* api 요청으로 완료한 습관들 구분해서 표시하기 */}
                {request && <ListGroup style={{ position: 'relative', width: '100%', fontSize: "83%"}}>
                    {getSelectedHabit}
                {/* 체크 작업 필요 */}
                </ListGroup>}
            </Card.Body>
                <div className="d-flex justify-content-center">
                    <Button className="select-button" variant="primary" size="lg"
                        // onClick={() => handleSelectButton()}
                        style={{ width: "30%", fontSize: '13px', margin: "10px"}}>
                            실천완료
                    </Button>
                </div>
        </>
    )
<<<<<<< HEAD
}
=======
}
>>>>>>> dev-front
