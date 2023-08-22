import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import LankBox from '../component/Lank/LankBox';
import axios from 'axios';

type MoreButtonProps = {
  expanded: boolean;
};

type DataItem = {
  id: number;
  name: string;
  codyImage: string | null;
  comment: string;
  lankNum: string;
  data: DataItem[];
};

const baseURL =
  'http://ec2-13-209-15-210.ap-northeast-2.compute.amazonaws.com:8080';

const Lank = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const MoreButtonText = expanded ? '접기' : '더보기 +';
  const ButtonHandler = () => {
    setExpanded(!expanded);
  };
  const isMobile = window.innerWidth < 768;

  const [lankList, setlankList] = useState<DataItem[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get<DataItem>(baseURL+'/cody/getall');
      setlankList(response.data.data);
    } catch (error) {
      console.error('데이터 로딩 오류:', error);
    }
  };

  const lankData1 = lankList.slice(0, 4);
  const lankData2 = lankList.slice(7);

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
          {lankData1.map((data, index) => (
            <LankBox
              key={index}
              id={data.id}
              name={data.name}
              comment={data.comment}
              codyImage={data.codyImage}
              lankNum={data.lankNum}
            />
          ))}
          {expanded && (
          <>
          {lankData2.map((data, index) => (
            <LankBox
              key={index}
              id={data.id}
              name={data.name}
              comment={data.comment}
              codyImage={data.codyImage}
              lankNum={data.lankNum}
            />
          ))}
          </>
          )}
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
