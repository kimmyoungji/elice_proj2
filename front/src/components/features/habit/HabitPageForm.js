// 컴포넌트 분리 및 api 수정중
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Button, Col, Row, ListGroup, Image, Form } from 'react-bootstrap';
import './HabitPage.css';
import calendar from "../../../assets/imgs/calendar.png";
import axios from 'axios';

// , selectedHabits
export default function HabitForm ({ userInfo, habitList, selectedHabits }) {
    const { userName, turtleLevel } = userInfo;
    const habits = habitList;
    // const selectedHabits = ["habit1", "habit2"];

    return (
        <>
            <Container className="habits-container">
                <Row>
                    <TurtleForm userName={userName} turtleLevel={turtleLevel}/>
                    
                    {/* 기존에 선택한 습관이 없는 경우  */}
                    {!selectedHabits && <HabitAddForm
                                            userName={userName}
                                            habits={habits}/>}
                    {/* 기존에 선택한 습관이 있는 경우  */}
                    {selectedHabits && <HabitShowForm
                                            userName={userName}
                                            selectedHabits={selectedHabits}
                                            request={true}/>}
                   
                    {/* <HabitCardForm userName={userName}
                                   habits={habits}
                                   selectedHabits={selectedHabits}/> */}
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

// const HabitCardForm = ({ userInfo, habitList, selectedHabits }) => {
//     return (
//         <>
//             {!selectDone && <HabitAddForm userName={userName}
//                                             habits={habits}/>}
//             {selectDone && <HabitShowForm selectedHabits={selectedHabits} request={false}/>}
//         </>
//     )
// }

const HabitAddForm = ({ userName, habits }) => {
    const [ addButton, setAddButton ] = useState(true);
    const [ selectedHabit, setSelectedHabit ] = useState([]);
    const [ selectedDay, setSelectedDay ] = useState(null);
    const [ selectDone, setSelectDone ] = useState(false);

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
        setSelectedDay(key)
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
        console.log(selectedHabit);
        console.log(selectedDay);

        // 새롭게 선택한 습관 추가하기
        // 아직 api 연결 x -> 백에서 변수와 data 수정중
        axios({
            method: 'post',
            url: "http://"+ window.location.hostname +":5001/planned_habits",
            withCredentials: true,
            headers: {
            "Content-Type": "application/json",
            },
            data: {
                selectedHabit: selectedHabit,
                selectedDay: selectedDay
            }
        })
        .then((res) => {
            // 백에 카멜케이스로 수정 요청
            const { habit_ids } = res.data.plannedHabits[0];
            console.log(habit_ids);
        }).catch((error) => {
            // 추후 수정예정
            console.log(error)
        }).then(() => {
        });

        setSelectDone(true);
    }


    return (
        <>
            <Col xs={12} sm={6} className="habit-container" >
                <Card style={{ height: '450px' }}>
                    <Card.Body style={{ height: "100%" }}>
                        <Card.Title>
                            <span style={{ fontSize: "30px" }}>
                                {userName}</span>의 습관
                        </Card.Title>
                        <div style={{ color: "grey", marginBottom: '20px', fontSize: "80%" }}>
                            습관과 실천 기간을 추가해보세요 !
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
                                onClick={() => handleSelectButton()}
                                style={{ width: "30%", fontSize: '13px', margin: "10px"}}>
                                    선택완료
                            </Button>
                        </div>
                    </>}
                </Card>
            </Col>
            {/* {selectDone && <HabitShowForm selectedHabits={selectedHabit} request={false}/>} */}
        </>
    )
}

// 선택한 습관들 조회하기
const HabitShowForm = ({ userName, selectedHabits, request}) => {
    console.log(request);
    console.log(selectedHabits);
    const [ checkHabit, setCheckHabit ] = useState(false);

    const getDoneHabit = () => {
        setCheckHabit(true)
        
        return (
            <></>
        )
    }

    useEffect(() => {
        axios({
          method: 'get',
          url: "http://"+ window.location.hostname +":5001/fullfilled_habits",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then((res) => {
          // 백에 카멜케이스로 요청
            const { habit_id } = res.data.fullfilledHabits[0];
          console.log(habit_id);
        }).catch((error) => {
          // 추후 수정예정
            console.log(error)
        }).then(() => {
        });
      }, [checkHabit])

    
    return (
        <>
            <Col xs={12} sm={6} className="habit-container" >
                <Card style={{ height: '450px' }}>
                    <Card.Body style={{ height: "100%" }}>
                        <Card.Title>
                            <span style={{ fontSize: "30px" }}>
                                {userName}</span>의 습관
                        </Card.Title>
                        {!request && <ListGroup style={{ position: 'relative', width: '100%', fontSize: "83%"}}>
                            {selectedHabits}
                        </ListGroup>}
                        {request && <ListGroup style={{ position: 'relative', width: '100%', fontSize: "83%"}}>
                            {getDoneHabit}
                        </ListGroup>}
                    </Card.Body>
                        <div className="d-flex justify-content-center">
                            <Button className="select-button" variant="primary" size="lg"
                                // onClick={() => handleSelectButton()}
                                style={{ width: "30%", fontSize: '13px', margin: "10px"}}>
                                    실천완료
                            </Button>
                        </div>
                </Card>
            </Col>
        </>
    )
}
