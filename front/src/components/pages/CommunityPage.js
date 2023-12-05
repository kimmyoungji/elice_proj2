import React, { useEffect, useState, useRef } from 'react';
import api from "../utils/axiosConfig";
import HabitCard from "../features/HabitContents/HabitCard";
import { Row, Container } from "react-bootstrap";
import { CardWrapperDiv } from "../features/CommunityContents/CardScollStyled";
import LoadingCard from "../features/CommunityContents/LoadingCard";
import useIntersect from "../../hooks/useIntersect";


export default function CommunityPage() {
  const [turtleCards, setTurtleCards] = useState();
  const lastCusor = useRef();

  const getTurtleCards = () =>
    api.get(lastCusor.current ? `/users?cursor=${lastCusor.current}&limit=6` : "/users?limit=6", {
      withCredentials: true,
    })
      .then(res => {
        console.log("응답데이터:", res.users);
        turtleCards === undefined ? setTurtleCards(res.users) : setTurtleCards((prev) => [...prev].concat(res.users));
        console.log("카드데이터:", turtleCards);
        lastCusor.current = res.users[res.users.length - 1].cursors;
        console.log("커서데이터:", lastCusor.current);
      })
      .catch(err => console.log("거북이를 불러오지 못했어요! 페이지를 새로고침 해주세요 🐢", err));
  
  const { ref, isInViewport } = useIntersect();

  useEffect(() => {
      getTurtleCards();
  }, [isInViewport]);

  console.log("ref값은?:",ref);
  console.log("ref가 뷰포트 안에 있는가?:",isInViewport);


  return (
    <Container className="justify-content-center mt-5 ">
      <Row className="mb-5">
        <h3 className="text-center">🐢 거북이 구경하기 🐢</h3>
      </Row>
      <CardWrapperDiv>
        {turtleCards && turtleCards.map((turtleCard, idx) =>
              <HabitCard
                key={idx}
                turtleCard={turtleCard}
          />
          )
        }
        <div ref={ref}></div>
        { isInViewport && <LoadingCard/> }
      </CardWrapperDiv>
    </Container> 
  );
} 