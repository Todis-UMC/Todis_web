import React, { useEffect, useState, CSSProperties } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import Color from '../../../styles/Color';
import Font from '../../../styles/Font';

interface WeatherData {
  main: {
    humidity: number;
  };
}
const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const styles: { [key: string]: CSSProperties } = {
    humidityCard: {
      background: Color.Typo_White,
      width: '416px',
      height: '327px',
      padding: '20px',
      paddingLeft: '30px',
      color: Color.Black_Main,
      borderRadius: '40px',
      boxShadow: `0px 0px 10px ${Color.Gray_03}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    humidityInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '37px',
    },
    humidityLabel: {
      ...Font.H6,
      color: Color.Gray_01,
    },
    humidityValue: {
      ...Font.M1,
      color: Color.Gray_00,
      marginTop: '26.5px',
    },
    humidityLevel: {
      ...Font.L3,
      color: Color.Gray_01,
      marginTop: '26.5px',
      marginLeft: '-95px', 
    },
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=4d4c41dc06bbf1741b3a628d64934b98`
      )
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(err));
    });
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>
  }

  const humidityLevel = weatherData.main.humidity > 50 ? '높음' : '낮음';

  return (
    <div style={styles.humidityCard}>
      {weatherData.main && weatherData.main.humidity && (
        <div>
          <div style={styles.humidityInfo}>
            <FontAwesomeIcon icon={faTint} />
            <p style={styles.humidityLabel}>습도</p>
          </div>
          <p style={styles.humidityValue}>{weatherData.main.humidity} %</p>
          <p style={styles.humidityLevel}>{humidityLevel}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
