import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import CodiPoint from '../component/mypage/CodiPoint';
import Avatar from '../component/mypage/Avatar';
import { useMediaQuery } from 'react-responsive';

const MyPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  return (
    <Container>
      <Title>
        <div style={{ ...FONT.L4, paddingBottom: '13px' }}>날씨에 따른</div>
        <div style={isMobile ? FONT.H6 : FONT.H1}>
          오늘의 코디 추천 포인트는?
        </div>
      </Title>
      <CodiContainer>
        <Avatar />
        <CodiPoint />
      </CodiContainer>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  color: ${(props) => props.theme.Black_Main};
  background-color: ${(props) => props.theme.Sky_Blue_04};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  flex-direction: column;
  text-align: center;
  padding-top: 50px;
`;

const CodiContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 80px;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;
