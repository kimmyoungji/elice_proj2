import React, { useState, useRef, useCallback } from "react";
import api from "../utils/axiosConfig";
import HabitCard from "../features/HabitContents/HabitCard";
import { Row, Container } from "react-bootstrap";
import { CardWrapperDiv } from "../features/CommunityContents/CardScollStyled";
import LoadingCard from "../features/CommunityContents/LoadingCard";
import {useIntersectionObserver} from "../../hooks/useIntersectionObserver";

export default function CommunityPage() {
  const [turtleCards, setTurtleCards] = useState();
  const lastCusor = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const onIntersect = useCallback(([{isIntersecting}]) => {
    if (isIntersecting) {
      console.log(isIntersecting);
      setIsLoading(true);
      api
      .get(
        lastCusor.current
          ? `/users?userId=${lastCusor.current}&limit=6`
          : "/users?limit=6"
      )
      .then((res) => {
        console.log("응답데이터:", res.users);
        turtleCards === undefined
          ? setTurtleCards(res.users)
          : setTurtleCards((prev) => [...prev].concat(res.users));
        console.log("카드데이터:", turtleCards);
        lastCusor.current = res.users[res.users.length - 1].userId;
        console.log("커서데이터:", lastCusor.current);
      })
      .catch((err) =>
        console.log(
          "거북이를 불러오지 못했어요! 페이지를 새로고침 해주세요 🐢",
          err
        )
      );
    } else {
      setIsLoading(false);
    }
  },[turtleCards]);

  const [setTarget] = useIntersectionObserver({onIntersect});

  return (
    <Container className="justify-content-center mt-5 ">
      <Row className="mb-5">
        <h3 className="text-center">🐢 거북이 구경하기 🐢</h3>
      </Row>
      <CardWrapperDiv>
        {turtleCards &&
          turtleCards.map((turtleCard, idx) => (
            <HabitCard key={idx} turtleCard={turtleCard} />
          ))}
        <div ref={setTarget}></div>
        {setIsLoading && <LoadingCard />}
      </CardWrapperDiv>
    </Container>
  );
}