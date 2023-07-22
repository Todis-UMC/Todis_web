import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const Box = styled.div`
  max-width: 569px;
  width: 80%;
  height: 730px;
  background-color: #fff;
  border-radius: 47px;
  justify-content: center;
  padding: 44px 65px 50px 65px;
  text-align: center;
`;
