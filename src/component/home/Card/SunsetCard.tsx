import React, { useEffect, useState, CSSProperties, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons'; // moon icon
import Color from '../../../styles/Color';
import Font from '../../../styles/Font';

interface Sys {
  sunset: number;
  sunrise: number;
}

interface WeatherData {
  sys: Sys;
}
const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const styles: { [key: string]: CSSProperties } = {
    SunsetCard: {
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
    sunsetInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '37px',
    },
    sunsetLabel: {
      ...Font.H6,
      color: Color.Gray_01,
    },
    sunsetValue: {
      ...Font.M1,
      color: Color.Gray_00,
      marginTop: '26.5px',
    },
    sunriseValue: {
      ...Font.L3,
      color: Color.Gray_01,
      marginTop: '26.5px',
    },
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=4d4c41dc06bbf1741b3a628d64934b98`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((err) => console.error(err));
    });
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const convertUnixToHourMinute = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    
    hours %= 12;
    hours = hours ? hours : 12;
    
    return hours + ':' + minutes.substr(-2) + ' ' + period;
  };

  const sunsetTime = convertUnixToHourMinute(weatherData.sys.sunset);
  const sunriseTime = '일출 : ' + convertUnixToHourMinute(weatherData.sys.sunrise);

  return (
    <div style={styles.SunsetCard}>
      <div style={styles.sunsetInfo}>
        <FontAwesomeIcon icon={faMoon} />
        <div style={styles.sunsetLabel}>일몰</div>
      </div>
      <div style={styles.sunsetValue}>{sunsetTime}</div>
      <div style={styles.sunriseValue}>{sunriseTime}</div>
    </div>
  );
};

export default Weather;
