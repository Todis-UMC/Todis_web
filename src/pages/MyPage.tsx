import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import CodiPoint from '../component/mypage/CodiPoint';
import Avatar from '../component/mypage/Avatar';

const MyPage = () => {
  return (
    <Container>
      <Title>
        <div style={{ ...FONT.L4, paddingBottom: '13px' }}>날씨에 따른</div>
        <div style={FONT.H1}>오늘의 코디 추천 포인트는?</div>
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
  min-height: 100vh;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0px;
`;

const Title = styled.div`
  flex-direction: column;
  text-align: center;
`;

const CodiContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 80px;
`;
