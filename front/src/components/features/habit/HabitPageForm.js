import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Button, Col, Row, Dropdown, ListGroup, Image, Form } from 'react-bootstrap';
import './HabitPage.css';
import calendar from "../../../assets/imgs/calendar.png";
import axios from 'axios';


export function HabitForm ({ userInfo, habitList }) {
    const { userName, turtleLevel } = userInfo;
    const [ addButton, setAddButton ] = useState(true);
    const [ selectedHabit, setSelectedHabit ] = useState([]);
    const habits = habitList;

    const navigate = useNavigate();

    const getTurtleImage = (level) => {
        const turtleImg = require(`../../../assets/imgs/거북이${level}.png`);
        return (
            <Card.Body className="d-flex justify-content-center align-items-center">
                <Card.Img src={turtleImg} alt="Card image" style={{ width: '70%'}}/>
            </Card.Body>
        )
    };

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

    const getHabitList = Object.keys(habits).map((key) => (
        // <ListGroup.Item key={key} eventKey={key} onClick={() => handleCheckboxChange(key)}>{habits[key]}</ListGroup.Item>
        <Form.Check key={key}
            block
            label={habits[key]}
            type="checkbox" className="block-checkbox mb-2"
            style={{ fontSize: '15px' }}
            onChange={() => handleCheckboxChange(key)}
          />
    ));

    const handleSelectButton = () => {
        console.log(selectedHabit);
        axios.post("http://"+ window.location.hostname +":5001/habits/habits_id", selectedHabit)
        .then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        }).then(() => {
        });
    }

    return (
        <>
            <Container className="habits-container" style={{ marginTop: '50px'}}>
                <Row>
                    <Col xs={12} className="d-flex justify-content-end">
                        <Image src={calendar} alt="Calendar image" style={{ width: '5%' }} onClick={() => navigate('/calendar')}/>
                    </Col>
                    <Col className="turtle-container">
                        <Card style={{ height: '400px' }}>
                            <Card.Body>
                                <Card.Title>{userName}의 거북잉</Card.Title>
                            </Card.Body>
                            {turtleLevel >= 1 && turtleLevel <= 5 && getTurtleImage(turtleLevel)}          
                        </Card>
                    </Col>
                    <Col className="habit-container" >
                        <Card style={{ height: '400px' }}>
                            <Card.Body>
                                <Card.Title style={{ marginBottom: '150px' }}>{userName}의 습관</Card.Title>
                                <Card.Body className="d-flex justify-content-center align-items-center">
                                    {addButton === true && <Button variant="primary" size="lg" onClick={() => handleAddButton()}>+</Button>}
                                    {/* {addButton === false && <ListGroup style={{ position: 'absolute', top: '50%', left: '50%', bottom: '0', transform: 'translate(-50%, -50%)', width: '90%'}}>{getHabitList}</ListGroup>} */}
                                    {addButton === false && <Form style={{ position: 'absolute', left: '5%', right: '5%'}}>{getHabitList}</Form>}
                                </Card.Body>
                            </Card.Body>
                            <div className="d-flex justify-content-center align-items-center"  style={{ marginBottom: '5%' }}>
                            {addButton === false  && <Button className="select-button" variant="primary" size="lg" onClick={() => handleSelectButton()} style={{ width: "30%", fontSize: '15px'}}>선택완료</Button>}
                            </div>
                        </Card>
                    </Col>
                </Row> 
            </Container>     
        </>
    )
};


export function HabitListForm (habitList) {
    const turtleImg = require(`../../../assets/imgs/거북이1.png`);
    const habits = habitList.habitlist
    const cheerUpTexts = [
        "같이 시작해봐요, 플라스틱 줄이기! 😊",
        "나부터 시작하는 환경을 위한 습관 !",
        "오늘도 환경을 위한 습관 Level Up 중!!",
        "👍🏻👍🏻👍🏻",
        "충분히 잘하고 있어요👍🏻 우리 계속 도전해봐요"
    ];
    const randomIndex = Math.floor(Math.random() * cheerUpTexts.length);

    const cards = Object.keys(habits).map((key) => (
        <Col key={key} xs={12} md={6} lg={4} className="mb-4" style={{ marginRight: '0'}}>
            <Card border="light" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Img src={turtleImg} alt="Card image" />
                    <Card.Title>{habits[key]}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    ));

    return (
        <>
            <Container className='text-center' style={{ marginTop: '100px', marginBottom: '100px' }}>
                <h1>{cheerUpTexts[randomIndex]}</h1>
            </Container>
            <Container>
                <h6 style={{ color: "grey", marginTop: '50px', marginBottom: '50px' }}>▼ 아래로 내려서 습관들을 확인해보세요</h6><br />
                <Row>{cards}</Row>
            </Container>
        </>
    )
};
// 습관 리스트들 애니메이션 시간 되면 넣기
// 습관 선택 방식 which