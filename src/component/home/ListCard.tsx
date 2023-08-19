import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import color from '../../styles/Color';
import FONT from '../../styles/Font';

import sun from '../../assets/img/Sun.png';
import cloudSun from '../../assets/img/Cloud&Sun.png';
import cloud from '../../assets/img/Cloud.png';
import rain from '../../assets/img/Rain.png';


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

const WeatherItem: React.FC<WeatherData> = ({ index, day, weather, minTemp, maxTemp }) => (
  <div className="weather-item" style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', color: color.Gray_01, ...FONT.H6, marginBottom: index === 4 ? '0' : '5px' }}>
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
  zIndex: 1 
}}>
  {index === 0 && <div className="circle" style={{width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', marginTop: 'px', position: 'absolute', right: '-8px', top: '-4px', zIndex: 2 }} />}
</div>
      </div>
      <span className="max-temp">{maxTemp}°C</span>
    </div>
    <hr style={{ color: color.Gray_01, width: '100%', margin: '5px auto' }} />
  </div>
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
    <div className="list-card" style={{ width: '416px', height: '678px', backgroundColor: 'white', borderRadius: '40px', padding: '20px', color: color.Gray_01, ...FONT.H6 }}>
      <div className="header" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <FontAwesomeIcon icon={faCalendar} style={{ marginRight: '20px', marginTop: '1px' }}/>
          <h1>5일간의 일기 예보</h1>
        </div>
      </div>
      {weatherData.map((data, index) => (
        <WeatherItem key={index} index={index} day={data.day} weather={data.weather} minTemp={data.minTemp} maxTemp={data.maxTemp} temp={0} />
      ))}
    </div>
  );
};

export default ListCard;
