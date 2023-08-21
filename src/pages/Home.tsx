import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import { ReactComponent as Search } from '../assets/icon/Search.svg';
import CitySearch from '../component/home/CitySearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import Button from '../component/common/Button';
import HumidityCard from '../component/home/HumidityCard';
import RainCard from '../component/home/RainCard';
import AirQualityCard from '../component/home/AirQualityCard';
import SunCard from '../component/home/SunCard';
import SunsetCard from '../component/home/SunsetCard';
import MainCard from '../component/home/MainCard';
import ListCard from '../component/home/ListCard';

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
      <SearchInput style={FONT.L3}>도시 검색...</SearchInput>
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
      <MainCard />
      <ListCard />

      {expanded === true && (
        <>
          
            <HumidityCard />
            <RainCard />
          
            <AirQualityCard />

            <SunCard />
            <SunsetCard />
          
          
        </>
      )}
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
`;

const TitleBox = styled.div`
  width: 500px;
  margin: 0 auto;
  padding-top: 50px;

  
`;

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
    top: 50%; 
    left: 15px;  
    transform: translateY(-50%); 
  }
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 348px;
    height: 41px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 40px; 
  }
  
`;

const SearchInput = styled.div`
  width: calc(100% - 80px); 
  height: 31px;
  border: none;
  position: absolute;
  top: 50%;
  left: 60px; 
  transform: translateY(-50%); 
  text-align: left;
  color: ${(props) => props.theme.Gray_02};
`;


const MainBox = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  text-align: center;
  justify-content: center;

  > div:nth-child(1) {
    margin-bottom: 50px;  
  }

  @media screen and (max-width: 768px) {
    margin-top: -200px;
    gap: 1px;
    
    > div:nth-child(1) {
      margin-bottom: 100px;
    }
    }
  }
`;



const ToggleBox = styled.div`
  padding: 70px 0;

  @media screen and (max-width: 768px) {
    padding: 40px 0;
  }
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
