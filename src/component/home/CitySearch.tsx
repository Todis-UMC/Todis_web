import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as GoBack } from '../../assets/icon/GoBack.svg';
import { ReactComponent as Search } from '../../assets/icon/Search.svg';
import ModalContainer from './modal/ModalContainer';
import useOutSideClick from './modal/useOutSideClick';
import sky1Background from '../../assets/img/Sky1.png';
import sky2Background from '../../assets/img/Sky2.png';
import sky3Background from '../../assets/img/Sky3.png';


interface WeatherDataType {
  name?: string;
  main?: {
    temp?: number;
    temp_max?: number;
    temp_min?: number;
  };
  message?: string;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const getBackgroundImageByTemperature = (temp: number | undefined) => {
  if (!temp) return sky2Background; // default

  if (temp <= 24) return sky1Background;
  if (temp > 24 && temp <= 30) return sky2Background;
  return sky3Background;
};

const CitySearch = ({ onClose }: ModalProps) => {
  const KOREAN_CITIES = ['Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju'];
  const API_KEY = '4d4c41dc06bbf1741b3a628d64934b98';
  const [weatherData, setWeatherData] = useState<(WeatherDataType | null)[]>([]);
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    const cities = ['Seoul', 'Daegu', 'Busan'];
    Promise.all(cities.map(city => fetchWeatherData(city)))
      .then(data => {
        setWeatherData(data);
      });
  }, []);
  
  const handleClose = () => {
    onClose?.();
  };
  const [isCityBoxVisible, setIsCityBoxVisible] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);
  useOutSideClick(modalRef, handleClose);
  
  useEffect(() => {
    const $body = document.querySelector('body') as HTMLBodyElement;
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
  
    if (value) {
      setIsCityBoxVisible(false);
      if (KOREAN_CITIES.includes(value)) {
        fetchWeatherData(value).then(data => {
          if (data === null || (data.name && data.name.toLowerCase() !== value.toLowerCase())) {
            setWeatherData([]);
          } else {
            setIsCityBoxVisible(true); 
            setWeatherData([data]);
          }
        });
      }
    } else {
      setIsCityBoxVisible(true);  
      const cities = ['Seoul', 'Daegu', 'Busan'];
      Promise.all(cities.map(city => fetchWeatherData(city))).then(data => {
        setWeatherData(data);
      });
    }
  };
  
  const fetchWeatherData = async (cityName: string): Promise<WeatherDataType | null> => {
    const UNITS = 'metric';
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${UNITS}`;
  
    try {
      const response = await fetch(endpoint);
      if (response.status === 404) {
        return null;  
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed fetching weather data:', error);
      return null;
    }
  };


return (
  <ModalContainer>
    <Container className="container">
      <Box ref={modalRef}>
        <GoBackButton id="goBack" onClick={handleClose} />
        <SearchBox>
          <SearchIcon id='search'>
            <Search />
          </SearchIcon>
          <SearchInput
            style={FONT.L3}
            placeholder="도시 검색..."
            color="${(props) => props.theme.Gray_02}"
            onChange={handleSearchChange} 
            value={searchInput}
          />
        </SearchBox>
        <GradientTop />

        {weatherData === null && (
          <p style={{ textAlign: 'center', marginTop: '50px', ...FONT.H4, color: '#ff0000' }}>
            도시를 찾을 수 없습니다.
          </p>
        )}
        {weatherData.length === 0 && searchInput && (
      <p style={{ textAlign: 'center', marginTop: '50px', ...FONT.H4, color: '#ff0000' }}>
        도시를 찾을 수 없습니다.
      </p>
    )}
    
    {isCityBoxVisible && weatherData?.map((data, index) => (
  data && (
    <CitySearchBox key={index} topOffset={130 + index * 200} temperature={data.main?.temp}>
      <div>
      {data && (
        <>
          <div style={{ textAlign: 'left', paddingLeft: '40px', paddingTop: '20px' }}>
            <p style={{ ...FONT.H4, color: '#ffffff', marginBottom: '10px' }}>
              {data.name}
            </p>

            <p style={{ ...FONT.H7, color: '#ffffff' }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div style={{ textAlign: 'right', paddingRight: '40px', paddingBottom: '20px' }}>
            <p style={{ ...FONT.L1, color: '#ffffff', marginBottom: '0px' }}>
              {data.main?.temp ? Math.floor(data.main.temp) : 'N/A'}°
            </p>
            <p style={{ ...FONT.H7, color: '#ffffff', paddingTop: '40px' }}>
              최고 {data.main?.temp_max ? Math.floor(data.main.temp_max) : 'N/A'}° 최저{' '}
              {data.main?.temp_min ? Math.floor(data.main.temp_min) : 'N/A'}°
            </p>
          </div>
        </>
      )}
    </div>
  </CitySearchBox>
)
))}

          <GradientBottom />
        </Box>
      </Container>
    </ModalContainer>
  );  
};

export default CitySearch;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  border: none;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
`;
const GoBackButton = styled(GoBack)` 
  cursor: pointer;
  position: absolute;
  top: 55px;
  left: 45px;
`;
const SearchIcon = styled.span` 
  margin-right: 10px; 
`;

const Box = styled.div`
  background-color: #fff;
  width: 1031px;
  height: 778px;
  border-radius: 47px;
  border: none;
  text-align: center;
  padding: 30px 40px;
  z-index: 999;
  position: relative;
  padding-top: 20px;
  overflow-y: visible;

  #goBack {
    cursor: pointer;
    position: absolute;
    top: 55px;
    left: 45px;
  }
  #friends {
    color: ${(props) => props.theme.Blue_Main};
    position: absolute;
    top: 105px;
    left: 461px;
  }
`;

const CitySearchBox = styled.div<{ topOffset?: number, temperature?: number }>`
  z-index: 500;  
  width: 745px;
  height: 154; 
  border: none;
  border-radius: 49px;
  background-image: ${(props) => {
    if (props.temperature !== undefined && props.temperature <= 24) return `url(${sky3Background})`;
    if (props.temperature !== undefined && props.temperature > 24 && props.temperature <= 30) return `url(${sky1Background})`;
    if (props.temperature !== undefined && props.temperature > 30) return `url(${sky2Background})`;
    return `url(${sky2Background})`; // default
  }};
  background-size: cover; 
  background-repeat: no-repeat;
  position: absolute;
  top: ${(props) => props.topOffset || 130}px; 
  left: 140px;
  text-align: left;
  &:focus {
    outline: 3px solid ${(props) => props.theme.Blue_Main};
  }
`;

const SearchInput = styled.input`
  width: 640px;
  height: 50px;
  border: none;
  border-radius: 49px;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  position: relative; 
  text-align: left;
  padding-left: 40px;  

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.Gray_02};
  }
`;
const SearchBox = styled.div`
position: absolute;
top: 58px;
left: 185px;
display: flex;
align-items: center;
`;

const ListBox = styled.div`
  width: 437px;
  height: 412px;
  position: absolute;
  top: 141px;
  left: 123px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    //display: none;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 42%, 0.49);
    border-radius: 100px;
  }
`;
const GradientTop = styled.div`
  z-index: 1;
  width: 437px;
  height: 40px;
  position: absolute;
  top: 141px;
  left: 123px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;
const GradientBottom = styled.div`
  width: 437px;
  height: 40px;
  position: absolute;
  top: 513px;
  left: 123px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;
function setCity(value: string) {
  throw new Error('Function not implemented.');
}

