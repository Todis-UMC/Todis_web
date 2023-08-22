import React, { CSSProperties, useEffect, useState } from 'react';
import FONT from '../../styles/Font';
import color from '../../styles/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import sun from '../../assets/img/Sun.png';
import cloudSun from '../../assets/img/Cloud&Sun.png';
import cloud from '../../assets/img/Cloud.png';
import rain from '../../assets/img/Rain.png';
import styled from 'styled-components';

const StyledMainCard = styled.div`
  background-color: #88CBFF;
  width: 877px;
  height: 678px;
  position: relative;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  @media screen and (max-width: 768px) {
    transform: scale(0.45);
  }
`;

const convertWeatherToKorean = (weather: string | undefined) => {
    switch(weather) {
      case 'Cloud':
        return '흐릴 것';
      case 'Rain':
        return '비가 올 것';
      case 'Clear':
        return '맑을 것';
      case 'Snow':
        return '눈이 올 것';
      default:
        return weather ?? '정보 없음'; 
    }
  };

const weatherIcons = {
    sun,
    cloudSun,
    cloud,
    rain,
};
interface ForecastMain {
    temp: number;
  };
  
  interface ForecastWeather {
    main: string;
    icon: string;
  };
  
  interface ForecastListItem {
    dt: number;
    main: ForecastMain;
    weather: ForecastWeather[];
  };
  
  interface ForecastData {
    list: ForecastListItem[];
  };
  
interface AirQualityMain {
    aqi: number;
  }
  
  interface AirQualityListItem {
    main: AirQualityMain;
  }
  
  interface AirQualityData {
    list: AirQualityListItem[];
  }
  
interface MainCardWeatherData {
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    rain?: {
      '3h'?: number;
    };
    name: string;
    weather: [{
        main: string;
    }];
}
//임시 데이터를 위해 수정함. 이후 재수정 필요
const getWeatherIcon = (temp: number, weather: string) => {
  if (weather === 'Rain') return weatherIcons.rain;
  if (temp <= 24) return weatherIcons.cloud;
  if (temp <= 27) return weatherIcons.cloudSun; 
};

const MainCard = () => {
/*const [weatherData, setWeatherData] = useState<MainCardWeatherData | null>(null);
const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
const [forecastData, setForecastData] = useState<ForecastData | null>(null);
const [locationName, setLocationName] = useState<string | null>(null);*/

const [weatherData, setWeatherData] = useState<MainCardWeatherData | null>({
  main: {
      temp: 26, 
      humidity: 70,
  },
  wind: {
      speed: 5,
  },
  name: '서울시',  
  weather: [{
      main: 'Cloud',  
  }],
});

const [airQualityData, setAirQualityData] = useState<AirQualityData | null>({
  list: [
      {
          main: {
              aqi: 2
          }
      }
  ]
});
const [forecastData, setForecastData] = useState<ForecastData | null>({
  list: [
      {
          dt: Date.now() / 1000,  
          main: { temp: 26 },
          weather: [{ main: 'Rain', icon: '' }]
      },
      {
          dt: (Date.now() + 21600) / 1000,  
          main: { temp: 26 },
          weather: [{ main: 'cloudSun', icon: '' }]
      },
      {
          dt: (Date.now() + 43200) / 1000,  
          main: { temp: 25 },
          weather: [{ main: 'cloudSun', icon: '' }]
      },
      {
        dt: Date.now() / 1000, 
        main: { temp: 24 },
        weather: [{ main: 'Cloud', icon: '' }]
    },
    {
        dt: (Date.now() + 21600) / 1000,  
        main: { temp: 23 },
        weather: [{ main: 'Clear', icon: '' }]
    },
    {
        dt: (Date.now() + 43200) / 1000, 
        main: { temp: 22 },
        weather: [{ main: 'Clear', icon: '' }]
    }
  ]
});




  const styles: { [key: string]: CSSProperties } = {

      weatherIcon: {
        width: '211px',
        height: '211px',
    },
    
      forecastIcon: {
        width: '77px',
        height: '77px',
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '20px',  
        paddingLeft: '40px',
        paddingRight: '40px',
        position: 'absolute',   
        top: '15px',  
        left: '10px', 
    },
    locationIcon: {
        marginRight: '5px',  
        color: '#ffffff',
      },
    headerSpan: {
        ...FONT.H6,
        color: '#ffffff',
      },
      weatherBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: '800px',
        alignItems: 'stretch',
        height: '232px',
        marginTop: '60px',
        boxSizing: 'border-box',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '40px',
        marginBottom: '40px',
        paddingLeft: '80px',  
      },
      cardsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },

    forecastBox: {
        backgroundColor: 'rgba(85, 163, 235, 0.8)',
        width: '800px',
        height: '270px',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start',  
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '40px',
        marginBottom: '30px',
        boxSizing: 'border-box',
        paddingLeft: '20px',
        overflow: 'auto', 
        opacity: 0.8,borderTop: '1px solid #ffffff',  
    },
    nextHourForecast: {
        ...FONT.L3,
        color: '#ffffff',
        fontSize: '19px',
        display: 'flex',
        justifyContent: 'flex-start', 
        marginTop: '20px',  
        marginBottom: '5px',
        marginLeft: '-450px',
      },
      sixHourForeCast: {
        ...FONT.L3,
        color: '#ffffff',
        fontSize: '19px',
        display: 'flex',
        justifyContent: 'flex-start', 
        marginTop: '7px',  
        marginBottom: '5px',
        marginRight: '560px',
      },
      forecastItem: { 
        display: 'flex',
        flexDirection: 'column', 
            alignItems: 'center',  
            marginRight: '40px', 
        marginTop: '-15px',
        marginBottom: '20px',
    },
    currentWeather: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 2,
        paddingLeft: '10px', 
        paddingRight: '10px',
        marginLeft: '-50px', 
    },
      locationTemp: {
        ...FONT.H3,
        color: color.Typo_White,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'auto', 
        marginTop: '10px', 
        marginBottom: '30px',
        gap: '40px',  
      },

      verticalDivider: {
        borderLeft: '2px solid #FFF',
        height: '80%',
        alignSelf: 'center',
        marginLeft: '10px',
        marginRight: '30px', 
      },
    weatherDetails: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '10px',
        flexWrap: 'wrap',
      },
    weatherDetailColumn: {
      ...FONT.H6,
      color: color.Typo_White,
      display: 'flex',
      flexDirection: 'column',
      width: '45%',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '5px', 
    },
    weatherDetailData: {
        ...FONT.H7,
        color: color.Typo_White,
      },
      forecastTime: {
        ...FONT.L3, 
        color: '#ffffff',
    },

    forecastTemp: {
        ...FONT.H2, 
        color: '#ffffff',
    },
  };

  /*useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=4d4c41dc06bbf1741b3a628d64934b98&lang=kr`
            )
            .then((res) => res.json())
            .then((data) => {
                setWeatherData(data);
                setLocationName(data.name);
            })
            .catch((err) => console.error(err));

            fetch(
                `http://api.openweathermap.org/data/2.5/air_pollution?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=4d4c41dc06bbf1741b3a628d64934b98&lang=kr`
            )
            .then((res) => res.json())
            .then((data) => {
                setAirQualityData(data);
            })
            .catch((err) => console.error(err));
            
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=4d4c41dc06bbf1741b3a628d64934b98&lang=kr`
            )
            .then((res) => res.json())
            .then((data) => {
                const filteredData = data.list.filter((_: never, index: number) => index % 2 === 0).slice(0, 6);
                setForecastData({ list: filteredData });
            })
            .catch((err) => console.error(err));
        },
        function (error) {
            console.error(error);
        }
    );
}, []);*/

  if (!weatherData) {
    return <div>Loading...</div>;
  }

//예상 데이터 {convertWeatherToKorean(forecastData?.list[1]?.weather[0]?.main)}
  return (
    <StyledMainCard className="main-card">
      <div style={styles.header}>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.locationIcon} />
        <span style={styles.headerSpan}>서울시 공덕</span>
      </div>
      <div style={styles.cardsContainer}>
        <div style={styles.weatherBox}>
        <div style={styles.currentWeather}>
          <img 
            src={getWeatherIcon(weatherData.main.temp, weatherData.weather[0].main)} 
            alt="Weather icon" 
            style={styles.weatherIcon} 
          /> 
          <div style={styles.locationTemp}>
    <h1 style={FONT.H3}>{weatherData.name}</h1>
    <h2 style={FONT.M1}>{Math.round(weatherData.main.temp)}°C</h2>
</div>
        </div>

        <div style={styles.verticalDivider}></div>

        <div style={styles.weatherDetails}>
          <div style={styles.weatherDetailColumn}>
            <div>바람</div> 
            <div style={styles.weatherDetailData}>{weatherData.wind.speed} m/s</div>
          </div>
          <div style={styles.weatherDetailColumn}>
            <div>습도</div> 
            <div style={styles.weatherDetailData}>{weatherData.main.humidity}%</div>
          </div>
          <div style={styles.weatherDetailColumn}>
            <div>강수량</div> 
            <div style={styles.weatherDetailData}>{weatherData.rain?.['3h'] || 0} mm</div>
          </div>

          {
            airQualityData &&
            <div style={styles.weatherDetailColumn}>
              <div>대기질</div> 
              <div style={styles.weatherDetailData}>{airQualityData.list[0].main.aqi}</div>
            </div>
          }
        </div> 
      </div> 
      <div style={styles.forecastBox}>
        <div style={styles.nextHourForecast}>
  1시간 뒤에 흐릴 것 으로 예상됩니다
</div>
        <hr style={{ width: '95%', border: '1px solid white' }} />  
        <div style={styles.sixHourForeCast}>6시간간의 일기 예보
</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}> 
        <div></div>
            {forecastData &&
            forecastData.list.map((item, index) => (
              
                <div key={index} style={styles.forecastItem}>
                  
                    <div style={styles.forecastTime}>
                    <div></div>
                    <div style={styles.nextHourForecast}>
        
</div>   
                    </div>
                    <img
                        style={styles.forecastIcon}
                        src={getWeatherIcon(item.main.temp, item.weather[0].main)}
                        alt={item.weather[0].main}
                    />
                    <div style={styles.forecastTemp}>{Math.round(item.main.temp)}°C</div>
                </div>
            ))}
        </div>
    </div>
    </div>
    </StyledMainCard>
  );
};
export default MainCard;
