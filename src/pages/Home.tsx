import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import { ReactComponent as Search } from '../assets/icon/Search.svg';
import CitySearch from '../component/home/CitySearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import Button from '../component/common/Button';
import HumidityCardContent from '../component/home/HumidityCard';
import RainCardContent from '../component/home/RainCard';
import AirQualityCardContent from '../component/home/AirQualityCard';
import SunCardContent from '../component/home/SunCard';
import SunsetCardContent from '../component/home/SunsetCard';
import MainCardContent from '../component/home/MainCard';
import ListCardContent from '../component/home/ListCard';


type ToggleBtnProps = {
  expanded: boolean;
};

const Home = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleBtnText = expanded ? '접기' : '더보기 +';
  const ToggleHandler = () => {
    setExpanded(!expanded);
  };

  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
    setIsOpen(true);
  };
  return (
    <Container>
      <TitleBox></TitleBox>
      <SearchBox onClick={onClickButton}>
        <span>
          <Search />
        </span>
        <SearchInput style={FONT.L3}>도시 검색</SearchInput>
      </SearchBox>
      {isOpen && (
        <CitySearch
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
      <MainBox>
    <MainCardContent />
    <ListCardContent />
    {expanded === true ? (
        <>
            <HumidityCardContent />
            <RainCardContent />
            <AirQualityCardContent />
            <SunCardContent />
            <SunsetCardContent />
        </>
    ) : null}
</MainBox>
      <ToggleBox>
        <ToggleBtn onClick={ToggleHandler} expanded={expanded} style={FONT.L3}>
          {toggleBtnText}
        </ToggleBtn>
      </ToggleBox>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  color: ${(props) => props.theme.Black_Main};
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;

const TitleBox = styled.div`
  width: 500px;
  margin: 0 auto;
  padding-top: 50px;
`;

const SubTitle = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.div``;

const SearchBox = styled.div`
  margin: 50px auto;
  margin-bottom: 80px;
  width: 714px;
  height: 56px;
  border-radius: 49px;
  background-color: #fff;
  border: none;
  padding-bottom: 50px;
  position: relative;
  span {
    position: absolute;
    top: 18px;
    left: 23px;
  }
  cursor: pointer;
`;

const SearchInput = styled.div`
  width: 500px;
  height: 31px;
  border: none;
  position: absolute;
  top: 12px;
  left: 58px;
  text-align: left;
  color: ${(props) => props.theme.Gray_02};
`;

const MainBox = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 47px;
  text-align: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
  }
`;

const MainCard = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ListCard = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const HumidityCard = styled.div`
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const RainCard = styled.div`
  /* 웹용 기본 스타일이 위치합니다. */
  
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const AirQualityCard = styled.div`
  /* 웹용 기본 스타일이 위치합니다. */
  
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const SunCard = styled.div`
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const SunsetCard = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ToggleBox = styled.div`
  padding: 70px 0;
`;

const ToggleBtn = styled.button<ToggleBtnProps>`
  color: ${(props) => props.theme.Gray_01};
  background-color: transparent;
  width: 160px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.Gray_01};
  border-radius: 35px;
  cursor: pointer;
`;

const Card = styled.div`
  width: 877px;
  height: 678px;
  background-color: ${(props) => props.theme.Gray_03};
  border-radius: 47px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List = styled.div`
  width: 416px;
  height: 678px;
  background-color: ${(props) => props.theme.Gray_03};
  border-radius: 47px;
`;

const MiniCard = styled.div`
  width: 416px;
  height: 327px;
  background-color: ${(props) => props.theme.Gray_03};
  border-radius: 47px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const MiniCardTitle = styled.h2`
  margin-bottom: 20px;
`;

const MiniCardContent = styled.p``;

type MiniCardProps = {
  title: string;
  content: string;
};

const WideCard = styled.div`
  width: 877px;
  height: 327px;
  background-color: ${(props) => props.theme.Gray_03};
  border-radius: 47px;
  margin-right: 10px;
`;

const MiniCardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;
