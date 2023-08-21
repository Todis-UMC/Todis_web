import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import LankBox from '../component/Lank/LankBox';

const lankData = [
  {
    name: '박소정',
    statusmessage: '난 오늘 핑크색 상의 입었다!',
    lankNum: '1'
  },
  {
    name: '강혜원',
    statusmessage: '와 너무 더워... 근데 실내는 에어컨 때문에 추움',
    lankNum: '2'
  },
  {
    name: '추민정',
    statusmessage:
      '오늘 체감 온도가 25도까지 올라가서 반팔에다가 얇은 가디건 걸쳐줬어요~',
    lankNum: '3'
  },
  {
    name: '김이름',
    statusmessage:
      '오늘 체감 온도가 25도까지 올라가서 반팔에다가 얇은 가디건 걸쳐줬어요~',
    lankNum: '4'
  },
  {
    name: '김이름',
    statusmessage:
      '오늘 체감 온도가 25도까지 올라가서 반팔에다가 얇은 가디건 걸쳐줬어요~',
    lankNum: '5'
  },
  {
    name: '김이름',
    statusmessage:
      '오늘 체감 온도가 25도까지 올라가서 반팔에다가 얇은 가디건 걸쳐줬어요~',
    lankNum: '6'
  }
];

type MoreButtonProps = {
  expanded: boolean;
};

const Lank = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const MoreButtonText = expanded ? '접기' : '더보기 +';
  const ButtonHandler = () => {
    setExpanded(!expanded);
  };
  const isMobile = window.innerWidth < 768;

  return (
    <Content>
      <Header>
        <HeaderContainer>
          <Text1 style={FONT.L4}>날씨에 따른</Text1>
          <Text2 style={isMobile ? FONT.H6 : FONT.H1}>
            다른 사람들은 이렇게 입었어요!
          </Text2>
        </HeaderContainer>
      </Header>
      <Body>
        {lankData.map((data, index) => (
          <LankBox
            key={index}
            name={data.name}
            statusmessage={data.statusmessage}
            lankNum={data.lankNum}
          />
        ))}
        {expanded === true
          ? lankData
              .slice(3)
              .map((data, index) => (
                <LankBox
                  key={index}
                  name={data.name}
                  statusmessage={data.statusmessage}
                  lankNum={data.lankNum}
                />
              ))
          : null}
      </Body>
      <MoreBox>
        <MoreButton onClick={ButtonHandler} expanded={expanded} style={FONT.L3}>
          {MoreButtonText}
        </MoreButton>
      </MoreBox>
    </Content>
  );
};

export default Lank;

const Header = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  color: ${(props) => props.theme.Black_Main};
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`;
const HeaderContainer = styled.div`
  width: 50rem;
  margin: 0 auto;
  padding-top: 5rem;
  padding-bottom: 6rem;
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 3rem;
  }
`;
const Text1 = styled.div`
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const Text2 = styled.div``;

const Body = styled.div`
  margin: 0 auto;
  width: 50rem;
  display: grid;
  grid-template-rows: repeat(auto-fill, 14.1rem);
  grid-gap: 2vw;
  text-align: left;
  justify-content: center;
  @media (max-width: 900px) {
    width: 100%;
    grid-template-rows: auto;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  color: ${(props) => props.theme.Black_Main};
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`;

const MoreBox = styled.div`
  padding: 9.5rem 0;
`;
const MoreButton = styled.button<MoreButtonProps>`
  color: ${(props) => props.theme.Gray_01};
  background-color: transparent;
  width: 160px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.Gray_01};
  border-radius: 35px;
  cursor: pointer;
`;
