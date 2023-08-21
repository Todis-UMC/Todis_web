import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as CodiCheck } from '../../assets/icon/CodiCheck.svg';
import { ReactComponent as CodiUnCheck } from '../../assets/icon/CodiUnCheck.svg';
import {
  TempRanges,
  UviTextData,
  HumidityData,
  ForecastData,
  AirTextData
} from './CodiText';

type CheckProps = {
  isChecked: boolean;
  text: string;
};

type CodiBoxData = {
  id: number;
  text: string;
  isChecked: boolean;
};

const CodiPoint = () => {
  const [coditexts, setCoditexts] = useState<CodiBoxData[]>([
    {
      id: 1,
      text: '오늘의 추천 코디 생각 중..',
      isChecked: false
    },
    {
      id: 2,
      text: '오늘의 추천 코디 생각 중..',
      isChecked: false
    },
    {
      id: 3,
      text: '오늘의 추천 코디 생각 중..',
      isChecked: false
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const latitude = 37;
      const longitude = 126;
      try {
        const [weatherResponse, airQualityResponse, uviResponse] =
          await Promise.all([
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4d4c41dc06bbf1741b3a628d64934b98&lang=kr`
            ),
            fetch(
              `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=4d4c41dc06bbf1741b3a628d64934b98&lang=kr`
            ),
            fetch(
              `http://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=4d4c41dc06bbf1741b3a628d64934b98`
            )
          ]);

        if (!weatherResponse.ok || !airQualityResponse.ok || !uviResponse.ok) {
          throw new Error('One or more API responses were not ok');
        }

        const weatherData = await weatherResponse.json();
        const airQualityData = await airQualityResponse.json();
        const uviData = await uviResponse.json();

        const temp = weatherData.main.temp; // 기온
        const humidity = weatherData.main.humidity; // 습도
        const forecastData = weatherData.weather[0].main; // Rain, Snow
        const airQuality = airQualityData.list[0].main.aqi; // 대기질
        const uvi = uviData.value; // 자외선
        console.log(
          '기온:',
          temp,
          '습도:',
          humidity,
          '예측:',
          forecastData,
          '대기질:',
          airQuality,
          '자외선:',
          uvi
        );

        let FirstText = '';
        let SecondText = '';
        let ThirdText = '';
        // 1. 기온
        for (const range of TempRanges) {
          if (temp >= range.min && temp <= range.max) {
            const randomIndex = Math.floor(Math.random() * range.text.length);
            FirstText = range.text[randomIndex];
            break;
          }
        }
        // 2. 습도, Rain, Snow
        if (
          humidity >= 50 ||
          forecastData === 'Rain' ||
          forecastData === 'Snow'
        ) {
          const randomHumIndex = Math.floor(
            Math.random() * HumidityData.length
          );
          const randomRainIndex = Math.floor(Math.random() * 4);
          const randomSnowIndex = Math.floor(Math.random() * 2) + 4;
          SecondText =
            humidity >= 50
              ? HumidityData[randomHumIndex]
              : forecastData === 'Rain'
              ? ForecastData[randomRainIndex]
              : ForecastData[randomSnowIndex];
        }
        // 3. 자외선, 대기질
        if (uvi >= 6 || airQuality >= 150) {
          const randomUviIndex = Math.floor(Math.random() * UviTextData.length);
          const randomAirIndex = Math.floor(Math.random() * 2);
          ThirdText =
            uvi >= 6
              ? UviTextData[randomUviIndex]
              : AirTextData[randomAirIndex];
        } else {
          ThirdText = AirTextData[2];
        }

        setCoditexts((prevCoditexts) => [
          {
            id: 1,
            text: FirstText,
            isChecked: false
          },
          {
            id: 2,
            text: SecondText,
            isChecked: false
          },
          {
            id: 3,
            text: ThirdText,
            isChecked: false
          }
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const CodiCheckHandler = (id: number) => {
    setCoditexts((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.id === id) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
      return updatedData;
    });
  };

  return (
    <div>
      {coditexts.map((item) => (
        <CodiBox
          key={item.id}
          style={FONT.L3}
          isChecked={item.isChecked}
          text={item.text}
        >
          {item.text}
          <CheckBtn
            onClick={() => CodiCheckHandler(item.id)}
            isChecked={item.isChecked}
          >
            {item.isChecked ? <CodiCheck /> : <CodiUnCheck />}
          </CheckBtn>
        </CodiBox>
      ))}
    </div>
  );
};

export default CodiPoint;

const CodiBox = styled.div<CheckProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.isChecked ? props.theme.Blue_Main : 'white'};
  color: ${(props) => (props.isChecked ? 'white' : props.theme.Gray_00)};
  letter-spacing: -0.41px;
  border: 2px solid ${(props) => props.theme.Blue_Main};
  border-radius: 40px;
  padding: ${(props) =>
    props.text === '오늘의 추천 코디 생각 중..'
      ? '40px 42px 30px 92px'
      : '30px 42px 30px 92px'};
  margin-bottom: 10px;
  width: 100vw;
  max-width: 531px;
  min-height: 130px;
  white-space: pre-line;
`;

const CheckBtn = styled.button<Pick<CheckProps, 'isChecked'>>`
  position: absolute;
  top: 37px;
  left: 25px;
  background-color: white;
  border-radius: 50px;
  border: ${(props) =>
    props.isChecked ? 'none' : '2px dashed ' + props.theme.Gray_02};
  width: 48px;
  height: 48px;
  cursor: pointer;
`;
