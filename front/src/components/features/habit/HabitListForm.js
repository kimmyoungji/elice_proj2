import React from 'react';
import { Card, Container, Col, Row, } from 'react-bootstrap';
import './HabitPage.css';
import axios from 'axios';

export default function HabitListForm ({ habitList }) {
    const turtleImg = require(`../../../assets/imgs/거북이1.png`);
    const habits = habitList;
    const cheerUpTexts = [
        "같이 시작해봐요, 플라스틱 줄이기! 😊",
        "나부터 시작하는 환경을 위한 습관 !",
        "오늘도 환경을 위한 습관 Level Up 중!!",
        "👍🏻👍🏻👍🏻",
        "충분히 잘하고 있어요👍🏻 우리 계속 도전해봐요"
    ];
    const randomIndex = Math.floor(Math.random() * cheerUpTexts.length);

    const cards = Object.keys(habits).map((key) => (
        <Col key={key} xs={6} sm={4} md={6} lg={4}
            className="mb-4" style={{ marginRight: '0'}}>
            <Card border="light" style={{ width: '80%' }}>
                <Card.Body>
                    <Card.Img src={turtleImg} alt="Card image"/>
                    <Card.Title style={{fontSize: "15px"}}>{habits[key]}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    ));

    return (
        <>
            <Container
                className='text-center'
                style={{ marginTop: '50px'}}>
                <h2>{cheerUpTexts[randomIndex]}</h2>

                <h6 style={{ color: "grey", marginTop: '50px', marginBottom: '50px' }}>
                    ▼ 아래로 내려서 습관들을 확인해보세요
                </h6><br />
                <Row>{cards}</Row>
            </Container>
        </>
    )
};