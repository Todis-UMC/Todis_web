import React, { CSSProperties, useEffect, useState } from 'react';
import FONT from '../../styles/Font';
import color from '../../styles/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import sun from '../../assets/img/Sun.png';
import cloudSun from '../../assets/img/Cloud&Sun.png';
import cloud from '../../assets/img/Cloud.png';
import rain from '../../assets/img/Rain.png';

const convertWeatherToKorean = (weather: string | undefined) => {
    switch(weather) {
      case 'Clouds':
        return '흐릴 것';
      case 'Rain':
        return '비가 올 것';
      case 'Clear':
        return '맑을 것';
      case 'Snow':
        return '눈이 올 것';
      default:
        return weather ?? '정보 없음';  // undefined 경우 '정보 없음' 반환
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

const getWeatherIcon = (temp: number, weather: string) => {
    if (weather === 'Rain') return weatherIcons.rain;
    if (temp >= 31) return weatherIcons.sun;
    if (temp <= 19) return weatherIcons.cloud;
    return weatherIcons.cloudSun;
};

const MainCard = () => {
const [weatherData, setWeatherData] = useState<MainCardWeatherData | null>(null);
const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
const [forecastData, setForecastData] = useState<ForecastData | null>(null);
const [locationName, setLocationName] = useState<string | null>(null);

  const styles: { [key: string]: CSSProperties } = {
    mainCard: {
        backgroundColor: '#88CBFF',
        width: '877px',  // Updated width
        height: '678px', 
        position: 'relative',
        borderRadius: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px', // Add some padding to avoid items sticking to the edges
      },
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
        position: 'absolute',   // Added to fix the position
        top: '15px',  // Adjust to your preference
        left: '10px', // Adjusted to place the header on the same Y axis as the WeatherBox
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
        flexDirection: 'column',  // Change flexDirection to column to place "1 hour later expected status" at the top
        alignItems: 'center', 
        justifyContent: 'flex-start',  // Change justifyContent to center to align items in the middle
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '40px',
        marginBottom: '30px',
        boxSizing: 'border-box',
        paddingLeft: '20px',
        overflow: 'auto', 
        opacity: 0.8,borderTop: '1px solid #ffffff',  // 가로로 얇은 선 추가
    },
    nextHourForecast: {
        ...FONT.L3,
        color: '#ffffff',
        fontSize: '19px',
        display: 'flex',
        justifyContent: 'flex-start', 
        marginTop: '20px',  // Add marginTop to add space at the top
        marginBottom: '5px',
        marginLeft: '-450px',
      },
      forecastItem: { 
        display: 'flex',
        flexDirection: 'column',  // Change flexDirection to column to align forecast items vertically
            alignItems: 'center',  // Align the items in the center
            marginRight: '40px', 
        marginTop: '5px',
        marginBottom: '20px',
    },
    currentWeather: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 2,
        paddingLeft: '10px', // Reverted the padding to original
        paddingRight: '10px',
        marginLeft: '-50px', // Added this line
    },
      locationTemp: {
        ...FONT.H3,
        color: color.Typo_White,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'auto', 
        marginTop: '10px', // Set height to auto to allow internal items to take the space
        marginBottom: '30px', // 도시와 온도 데이터 사이 간격 5px 추가
        gap: '40px',  // Add gap to add space between items vertically
      },

      verticalDivider: {
        borderLeft: '2px solid #FFF',
        height: '80%',
        alignSelf: 'center',
        marginLeft: '10px',
        marginRight: '30px', // Increase marginRight to pull the vertical line further to the left
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
      marginRight: '5px', // 바람, 강수량, 습도, 대기질 데이터 사이 간격 반으로 줄임
    },
    weatherDetailData: {
        ...FONT.H7,
        color: color.Typo_White,
      },
      forecastTime: {
        ...FONT.L3, // Update style to L3, color to white
        color: '#ffffff',
    },

    forecastTemp: {
        ...FONT.H2, // Update style to H2, color to white
        color: '#ffffff',
    },
  };

  useEffect(() => {
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
}, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.mainCard}>
      <div style={styles.header}>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.locationIcon} />
        <span style={styles.headerSpan}>{locationName || '위치를 설정해주세요'}</span>
      </div>
      <div style={styles.cardsContainer}>
        <div style={styles.weatherBox}>
        <div style={styles.currentWeather}>
          <img 
            src={getWeatherIcon(weatherData.main.temp, weatherData.weather[0].main)} 
            alt="Weather icon" 
            style={styles.weatherIcon}  // Style 추가
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
  1시간 뒤에 {convertWeatherToKorean(forecastData?.list[1]?.weather[0]?.main)} 으로 예상됩니다
</div>
        <hr style={{ width: '95%', border: '1px solid white' }} />  {/* Add a line under the text "1 hour later expected status" */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>  {/* Add a wrapper div with flex display */}
            {forecastData &&
            forecastData.list.map((item, index) => (
                <div key={index} style={styles.forecastItem}>
                    <div style={styles.forecastTime}>
                        {new Date(item.dt * 1000).getHours()}:00
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
    </div>
  );
};
export default MainCard;