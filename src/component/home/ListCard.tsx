import React, { CSSProperties, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import color from '../../styles/Color';
import FONT from '../../styles/Font';

import sun from '../../assets/img/Sun.png';
import cloudSun from '../../assets/img/Cloud&Sun.png';
import cloud from '../../assets/img/Cloud.png';
import rain from '../../assets/img/Rain.png';
import styled from 'styled-components';

type ListCardProps = {
  className?: string;
};

const ListCardStyles = styled.div`
  width: 416px;
  height: 678px;
  background-color: white;
  border-radius: 40px;
  padding: 20px;
  overflow: hidden;
  color: ${color.Gray_01};
  font-size: ${FONT.H6.fontSize}; // FONT.H6에서 필요한 속성만 적용하세요
  font-weight: ${FONT.H6.fontWeight}; // 예시로 적었습니다. 실제 속성을 확인하고 적용하십시오
  @media screen and (max-width: 768px) {
    width: 390px;
    height: 419px;
    > * {  // 직접적인 자식 요소들 선택
      transform: scale(0.75);
      transform-origin: center; // 축소될 때의 기준점 설정 (여기서는 좌측 상단)
    }
    > *:not(:last-child) {
      margin-bottom: -5px; // 원하는 간격으로 조절
    }
`;

const weatherIcons = {
  sun,
  cloudSun,
  cloud,
  rain,
};

interface WeatherData {
  index: number;
  day: string;
  weather: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
}

const getWeatherIcon = (temp: number, weather: string) => {
  if (weather === 'Rain') return weatherIcons.rain;
  if (temp >= 31) return weatherIcons.sun;
  if (temp <= 19) return weatherIcons.cloud;
  return weatherIcons.cloudSun;
};

interface WeatherResponse {
  list: {
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: {
      main: string;
    }[];
  }[];
}
interface WeatherItemProps {
  index: number;
}

const WeatherItemStyles = styled.div<WeatherItemProps>`
z-index: 0.1;  // 수정된 부분
display: flex;
flex-direction: column;  // 수정된 부분
align-items: center;  // 수정된 부분
padding: 20px 0;
color: ${color.Gray_01};
font-size: ${FONT.H6.fontSize};
font-weight: ${FONT.H6.fontWeight};
margin-bottom: ${props => (props.index === 4 ? '0' : '5px')};  // 수정된 부분

div.graph {
  position: relative;
  z-index: 1;  // 수정된 부분 // 추가된 부분
}

div.graph-background,
div.max-temp-bar {
  z-index: 1;  // 수정된 부분
}


@media screen and (max-width: 768px) {
    padding: 3px 0;
    font-size: ${FONT.H5.fontSize};
  }

  img.icon {
    width: 45px;
    height: 45px;
    marginRight: 5px;

    @media screen and (max-width: 768px) {
      width: 35px;
      height: 35px;
    }
  }
`;

const WeatherItem: React.FC<WeatherData> = ({ index, day, weather, minTemp, maxTemp }) => (
  <WeatherItemStyles index={index}>
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <span className="day" style={{ marginRight: '5px' }}>{day}</span>
      <img 
        className="icon"
        src={getWeatherIcon(maxTemp, weather)} 
        alt="weather icon"
        style={{ width: '45px', height: '45px', marginRight: '5px' }}  
      />
      <span className="min-temp" style={{ marginRight: '5px' }}>{minTemp}°C</span>
      <div className="graph" style={{ flexGrow: 1, marginRight: '5px', borderRadius: '20px', position: 'relative', height: '14px' }}>
        <div className="graph-background" style={{ width: '100%', height: '100%', backgroundColor: color.Gray_03, position: 'absolute', zIndex: 1, borderRadius: '20px' }} />
        <div className="max-temp-bar" style={{ 
  width: `${(maxTemp - 0) * 100 / 40}%`, 
  backgroundImage: 'linear-gradient(to right, red, orange)', 
  borderRadius: '20px', 
  height: '100%', 
  position: 'absolute', 
  marginBottom: '10px',
  zIndex: 1 
}}>
  {index === 0 && <div className="circle" style={{width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', marginTop: 'px', position: 'absolute', right: '-8px', top: '-4px', zIndex: 2 }} />}
</div>
      </div>
      <span className="max-temp">{maxTemp}°C</span>
    </div>
    <hr style={{ color: color.Gray_01, width: '100%', margin: '5px auto' }} />
    </WeatherItemStyles>
);


const ListCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=4d4c41dc06bbf1741b3a628d64934b98`
      );
  
      const data: WeatherResponse = await response.json();
      console.log('API response:', data);
      
      if (data && data.list) {
        const mappedData: WeatherData[] = data.list.reduce((acc: WeatherData[], forecast, index) => {
          let day = new Date(forecast.dt * 1000).toLocaleDateString('ko-KR', { weekday: 'long' }).slice(0, 1);
          if (index === 0) {
            day = '오늘';
          }
          const existing = acc.find(item => item.day === day);
          if (existing) {
            existing.minTemp = Math.min(existing.minTemp, Math.round(forecast.main.temp_min));
            existing.maxTemp = Math.max(existing.maxTemp, Math.round(forecast.main.temp_max));
            existing.weather = forecast.weather[0].main;
          } else if (acc.length < 5) { 
            acc.push({
              index: acc.length,
              day,
              weather: forecast.weather[0].main,
              minTemp: Math.round(Math.max(forecast.main.temp_min, 0)),
              maxTemp: Math.round(Math.min(forecast.main.temp_max, 40)),
              temp: Math.round(forecast.main.temp),
            });
          }
          return acc;
        }, []);
        console.log('Mapped data:', mappedData);
        setWeatherData(mappedData);
      } else {
        console.error('API response is not as expected.', data);
      }
    }, function (error) {
      console.error('Geolocation API error:', error);
    });
  }, []);
  
  return (
    <ListCardStyles>
      <div className="header" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <FontAwesomeIcon icon={faCalendar} style={{ marginRight: '20px', marginTop: '1px' }}/>
          <h1>5일간의 일기 예보</h1>
        </div>
      </div>
      {weatherData.map((data, index) => (
        <WeatherItem key={index} index={index} day={data.day} weather={data.weather} minTemp={data.minTemp} maxTemp={data.maxTemp} temp={0} />
      ))}
    </ListCardStyles>
  );
};

export default ListCard;
