import styled, { keyframes } from "styled-components";
import useScrollAni from "./useScrollAnimation";

const FadeinAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }

  100%{
    opacity: 1;
    transform: translateZ(0);
  }
`;

export const Article = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 110vh;

  &.frame-in {
    position: relative;
    animation: ${FadeinAnimation} 2s forwards;
  }
`;

export const ScrollAniDiv = ({ children }) => {
  const { ref, isInViewport } = useScrollAni();
  return (
    <Article ref={ref} className={isInViewport ? "frame-in" : ""}>
      {children}
    </Article>
  );
};