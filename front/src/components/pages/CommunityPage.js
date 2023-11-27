import React, { useEffect, useState } from 'react';
import axios from "axios";
import HabitCard from "../features/HabitContents/HabitCard";
import { Row, Col, Container } from "react-bootstrap";


export default function CommunityPage() {
  const [turtleCards, setTurtleCards] = useState(
    [{
      idx: 0,
      userName: "유림님",
      level: 1,
      },
      {
      idx: 1,
      userName: "민정님",
      level: 2,
      },
      {
        idx: 2,
        userName: "명지님",
        level: 3,
      },
      {
        idx: 3,
        userName: "혜연님",
        level: 4,
      },
      {
        idx: 4,
        userName: "성혜님",
        level: 5,
      },
      {
        idx: 5,
        userName: "깍두기",
        level: 1,
        },
    ]);


  // const getTurtleCards = () =>
  //   axios.get('거북이 정보 불러오기')
  //     .then(res => {
  //       setTurtleCards(res.data);
  //     })
  //     .catch(err => console.log("🐢🤷‍♂️", err));
  
  // useEffect(() => {
  //   getTurtleCards();
  // }, []);
  
  return (
    <Container className="justify-content-md-center mt-5">
      <Row>
        <h2>거북이 구경하기</h2>
      </Row>
      <Row className="justify-content-center mt-5">
        {turtleCards.map((turtleCard) => (
          <Col>
            <HabitCard key={turtleCard.idx} turtleCard={turtleCard} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
