import React, { useEffect, useState, CSSProperties } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import Color from '../../styles/Color';
import Font from '../../styles/Font';

const StyledhumidityCard = styled.div`
  background: ${Color.Typo_White};
  width: 416px;
  height: 327px;
  padding: 20px;
  padding-left: 30px;
  color: ${Color.Black_Main};
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px ${Color.Gray_03};
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    margin-top: -50px;
    transform: scale(0.5);
  }
`;

interface WeatherData {
  main: {
    humidity: number;
    aqi: number;
  };
}

const Weather = () => {
  const [humidity] = useState<number>(82);

  const styles: { [key: string]: CSSProperties } = {
    humidityInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '37px'
    },
    humidityLabel: {
      ...Font.H6,
      color: Color.Gray_01
    },
    humidityValue: {
      ...Font.M1,
      color: Color.Gray_00,
      marginTop: '26.5px'
    },
    humidityLevel: {
      ...Font.L3,
      color: Color.Gray_01,
      marginTop: '26.5px',
      marginLeft: '-95px'
    }
  };

  /*useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=4d4c41dc06bbf1741b3a628d64934b98`
      )
      .then((res) => res.json())
      .then((data) => {
        if (!data.main) {
          data.main = { humidity: 0, aqi: 0 };
        }

        data.main.aqi = 65;

        setWeatherData(data);
      })
      .catch((err) => console.error(err));
    });
  }, []);*/

  if (!humidity) {
    return <div>Loading...</div>;
  }

  const humidityLevel = humidity > 50 ? '높음' : '낮음';

  return (
    <StyledhumidityCard className='humidity-card'>
      <div>
        <div style={styles.humidityInfo}>
          <FontAwesomeIcon icon={faTint} />
          <p style={styles.humidityLabel}>습도</p>
        </div>
        <p style={styles.humidityValue}>{humidity} %</p>
        <p style={styles.humidityLevel}>{humidityLevel}</p>
      </div>
    </StyledhumidityCard>
  );
};

export default Weather;
