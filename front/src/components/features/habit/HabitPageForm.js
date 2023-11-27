import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Button, Col, Row, Dropdown, ListGroup, Image } from 'react-bootstrap';
import './HabitPage.css';
import calendar from "../../../assets/imgs/calendar.png";


export function HabitForm ({ userInfo, habitList }) {
    const { userName, turtleLevel } = userInfo;
    const [add, setAdd] = useState(false);
    const [select, setSelect] = useState(false);
    // const [selectedHabit, setSelectedHabit] = useState(null);
    const habits = habitList

    const navigate = useNavigate();

    const getTurtleImage = (level) => {
        const turtleImg = require(`../../../assets/imgs/거북이${level}.png`);
        return (
            <Card.Body className="d-flex justify-content-center align-items-center">
                <Card.Img src={turtleImg} alt="Card image" style={{ width: '70%'}}/>
            </Card.Body>
        )
    };

    const addButton = () => {
        setAdd(true);
    }

    const habitClick = (e) => {
        // const selectedText = e.target.text;
        // console.log(selectedText);
        // setSelectedHabit(selectedText);
        setSelect(true);
        return (
            <ListGroup.Item>{e.target.text}</ListGroup.Item>
        )
    }

    const getHabitList = Object.keys(habits).map((key) => (
        <Dropdown.Item key={key} eventKey={key} onClick={(e)=> habitClick(e)}>{habits[key]}</Dropdown.Item>
    ));

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
                    <Col className="habit-container">
                        <Card style={{ height: '400px' }}>
                            <Card.Body>
                                <Card.Title style={{ marginBottom: '150px' }}>{userName}의 습관</Card.Title>
                                <Card.Body className="d-flex justify-content-center align-items-center">
                                    {add === false && <Button variant="primary" size="lg" onClick={() => addButton()}>+</Button>}
                                    {add === true && select === true && <ListGroup>{habitClick}</ListGroup>}
                                    {add === true &&
                                    <Dropdown.Menu show style={{ width: '100%' }}>
                                        <Dropdown.Header>아래에서 습관을 선택하세요</Dropdown.Header>
                                        {getHabitList}
                                    </Dropdown.Menu>}
                                </Card.Body>
                            </Card.Body>
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
        "블라블라",
        "어떤 문자들을 채워볼까요",
        "👍🏻👍🏻👍🏻",
        "지금도 충분히 잘하고 있어요👍🏻 우리 계속 도전해봐요"
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