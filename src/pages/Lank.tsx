import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import LankBox from '../component/Lank/LankBox';

type MoreButtonProps = {
  expanded: boolean;
};

const Lank = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const MoreButtonText = expanded ? '접기' : '더보기 +';
  const [loading, setLoading] = useState<boolean>(false);
  const [lankData, setLankData] = useState<any[]>([]);
  const ButtonHandler = () => {
    setExpanded(!expanded);
  };
  const isMobile = window.innerWidth < 768;

  // 처음에 API 호출
  useEffect(() => {
    fetchRecommendStatus();
  }, []);

  // API 호출 함수
  const fetchRecommendStatus = async () => {
    setLoading(true)

    try {
      const response = await fetch(
        'http://13.209.15.210:8080/cody/recommend'
      );
      const data = await response.json();

      if (data.success) {
        // 응답 성공하면 likes를 기준으로 정렬해서 lankData에 저장
        // lankData: [{'userId': userId, 'lankNum': 1}, ...]
        const gotData = data.data
        var sortedLankData = [...gotData].sort((a, b) => b.likes - a.likes);
        sortedLankData = sortedLankData.map((d, idx)=> {
            d.lankNum = idx+1
            return d
        })
        setLankData(sortedLankData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(true);
    }
  };

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
            id={data.id}
            key={index}
            name={data.userId}
            lankNum={data.lankNum}
            codyImage={data.image}
          />
        ))}
        {expanded === true
          ? lankData
              .slice(3)
              .map((data, index) => (
                <LankBox
                  id={data.id}
                  key={index}
                  name={data.userId}
                  lankNum={data.lankNum}
                  codyImage={data.image}
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
  padding-top: 50px;
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
