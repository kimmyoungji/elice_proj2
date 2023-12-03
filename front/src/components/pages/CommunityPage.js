import React, { useEffect, useState, useRef } from 'react';
import api from "../utils/axiosConfig";
import HabitCard from "../features/HabitContents/HabitCard";
import { Row, Container } from "react-bootstrap";
import { CardWrapperDiv } from "../features/CommunityContents/CardScollStyled";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import LoadingCard from "../features/CommunityContents/LoadingCard";


export default function CommunityPage() {
  const [turtleCards, setTurtleCards] = useState();
  const lastCusor = useRef();

  const getTurtleCards = () =>
    api.get(lastCusor.current ? `/users?cursor=${lastCusor.current}&limit=6` : "/users?limit=6" ,{
      withCredentials: true,
    })
      .then(res => {
        console.log("응답데이터:",res.data.users);
        turtleCards === undefined ? setTurtleCards(res.data.users) : setTurtleCards((prev) => [...prev], res.data.users);
        console.log("카드데이터:",turtleCards);
        lastCusor.current = res.data.users[res.data.users.length-1].cursors;
        console.log("커서데이터:",lastCusor.current); 
      })
      .catch(err => console.log("거북이를 불러오지 못했어요! 페이지를 새로고침 해주세요 🐢", err));
  
  useEffect(() => {
    getTurtleCards();
  }, []);
  
  const [isLoading, setIsLoading] = useState(false);
  const { ref, isInViewport } = useScrollAnimation();
  const lastIdx = turtleCards && turtleCards.length - 1;


  useEffect(() => {
    if (isInViewport === true) {
      setIsLoading(true);
      getTurtleCards();
    } else {
      setIsLoading(false);
    }
  }, [isInViewport]);

  console.log(ref);
  console.log(isInViewport);


  return (
    <Container className="justify-content-center mt-5 ">
      <Row className="mb-5">
        <h3 className="text-center">🐢 거북이 구경하기 🐢</h3>
      </Row>
      <CardWrapperDiv>
        {turtleCards && turtleCards.map((turtleCard) =>
          turtleCard === turtleCards[lastIdx] ? (
            <div ref={ref} key={turtleCard.cursors}>
              <HabitCard
                turtleCard={turtleCard}
              />
            </div>
          ) : (
              <HabitCard
                key={turtleCard.cursors}
                turtleCard={turtleCard}
          />
          )
        )}
        { isLoading && <LoadingCard/> }
      </CardWrapperDiv>
    </Container>
  );
}