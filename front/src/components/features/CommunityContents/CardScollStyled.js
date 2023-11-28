import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
`

export const CardWrapperDiv = ({ children }) => {

  return (
    <CardWrapper>
      {children}
    </CardWrapper>
  );
};
