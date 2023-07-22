import styled from 'styled-components';
import { ReactComponent as SmallLogo } from '../../assets/icon/SmallLogo.svg';
import React from 'react';
import FONT from '../../styles/Font';

const AuthContainer = ({
  title,
  component
}: {
  title: string;
  component: React.ReactElement;
}) => {
  return (
    <Container>
      <Box>
        <SmallLogo />
        <Title style={FONT.H5}>{title}</Title>
        {component}
      </Box>
    </Container>
  );
};

export default AuthContainer;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Box = styled.div`
  max-width: 569px;
  width: 80%;
  height: 730px;
  background-color: #fff;
  border-radius: 47px;
  justify-content: center;
  padding: 44px 65px 50px 65px;
  text-align: center;
`;
const Title = styled.div`
  margin-top: 19px;
  margin-bottom: 42px;
`;
