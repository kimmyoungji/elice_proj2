import styled, { keyframes } from "styled-components";
import useScrollAni from "./useScrollAnimation";

// Fadein 효과 
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

// 애니메이션 효과 확인 위해 임의로 작성한 div
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

// viewport 내에 해당 DOM이 있을 때, frame-in 클래스 추가
export const ScrollAniDiv = ({ children }) => {
  const { ref, isInViewport } = useScrollAni();
  return (
    <Article ref={ref} className={isInViewport ? "frame-in" : ""}>
      {children}
    </Article>
  );
};