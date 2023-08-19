import React, { useEffect, useState, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import Color from '../../styles/Color';
import Font from '../../styles/Font';

interface WeatherData {
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
}

const Rain = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [rainfall, setRainfall] = useState<number | null>(null);

  const styles: { [key: string]: CSSProperties } = {
    RainCard: {
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
    RainCardInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '37px',
    },
    RainCardLabel: {
      ...Font.H6,
      color: Color.Gray_01,
    },
    RainCardValue: {
      ...Font.M1,
      color: Color.Gray_00,
      marginTop: '26.5px',
    },
    RainCardLevel: {
      ...Font.L3,
      color: Color.Gray_01,
      marginTop: '26.5px',
      marginLeft: '-50px', 
    },
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=4d4c41dc06bbf1741b3a628d64934b98`
      )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setRainfall(data.rain && data.rain['3h'] ? data.rain['3h'] : 0);
      })
      .catch((err) => console.error(err));
    });
  }, []);

  if (rainfall === null) {
    return <div>Loading...</div>
  }

  return (
    <div style={styles.RainCard}>
      {rainfall !== null && (
        <div>
          <div style={styles.RainCardInfo}>
            <FontAwesomeIcon icon={faCloudRain} />
            <p style={styles.RainCardLabel}>강수량</p>
          </div>
          <p style={styles.RainCardValue}>{rainfall} mm</p>
          <p style={styles.RainCardLevel}>지난 3시간</p>
        </div>
      )}
    </div>
  );
};

export default Rain;
