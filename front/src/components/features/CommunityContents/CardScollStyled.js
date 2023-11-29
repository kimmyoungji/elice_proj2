import styled from "styled-components";
import { useRef, useState } from 'react';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
`

export const CardWrapperDiv = ({ children }) => {

  const scrollDiv = useRef();
  const [slide, setSlide] = useState(true);

  const scrollConvert = (e) => {

    const { deltaY } = e;
    const el = scrollDiv.current;
    if (!el) return;

    if (deltaY > 0 && slide === true) {
      setSlide(false);
      el.scrollTo({
        left: el.scrollLeft + deltaY * 5,
        behavior: "smooth",
      });
      setSlide(true);
    }
    if (deltaY < 0 && slide === true) {
      setSlide(false);
      el.scrollTo({
        left: el.scrollLeft + deltaY * 5,
        behavior: "smooth",
      });
      setSlide(true);
    }
  }

  return (
    <CardWrapper ref={scrollDiv} onWheel={(e=>scrollConvert(e))}>
      {children}
    </CardWrapper>
  );
};
