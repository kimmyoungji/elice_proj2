import React from 'react';
import { Card } from "react-bootstrap";

export default function HabitCard({ turtleCard }) {

  const getTurtleImage = (level) => {
    const turtleImg = require(`../../../assets/imgs/거북이${level}.png`);
    return (
      <Card.Img src={turtleImg} alt="Card image" className="justify-content-md-center"  />
    )
};


  return (
    <div>
      <Card className="mb-5" style={{ width: "23rem" }}>
        <Card.Header>{turtleCard.userName}의 거북이</Card.Header>
        {turtleCard.level >= 1 && turtleCard.level <= 5 && getTurtleImage(turtleCard.level)}
      </Card>
    </div>
  );
}