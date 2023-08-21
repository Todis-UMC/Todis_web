import React, { useEffect, useState, CSSProperties, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmog } from '@fortawesome/free-solid-svg-icons';
import Color from '../../styles/Color';
import Font from '../../styles/Font';
import styled from 'styled-components';
import { Chart, LinearScale, PointElement, CategoryScale, BarController, BarElement, LineController, LineElement, ScatterController, ChartData, Point } from 'chart.js';

const StyledAirQualityCard = styled.div`
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
    transform: scale(0.5);
    
    .graph {
      display: none; 
    }
  }
`;


Chart.register(LinearScale, PointElement, CategoryScale, BarController, BarElement, LineController, LineElement, ScatterController, PointElement);

interface Main {
  aqi: number;
}

interface WeatherData {
  list: {
    main: Main;
  }[];
}

const Weather = () => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  const fixedAQI = 56;

  const styles: { [key: string]: CSSProperties } = {
    qualityInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '37px',
    },
    qualityLabel: {
      ...Font.H6,
      color: Color.Gray_01,
    },
    qualityValue: {
      ...Font.M1,
      color: Color.Gray_00,
      marginTop: '26.5px',
    },
    qualityLevel: {
      ...Font.L3,
      color: Color.Gray_01,
      marginTop: '26.5px',
    },
    graph: {
      width: '100%',
      marginTop: '-25px',
    },
  };

  /*useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=4d4c41dc06bbf1741b3a628d64934b98`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.list[0]?.main) {
            data.list[0].main = { aqi: 0 };
          }
          setWeatherData(data);
        })
        .catch((err) => console.error(err));
    });
  }, []);*/

  useEffect(() => {
    if (!chartContainer.current) return; 
  
    const ctx = chartContainer.current.getContext('2d');
    if (!ctx) return; 
  
    if (chartInstance) {
      chartInstance.destroy();
    }

        const gradient = ctx.createLinearGradient(0, 0, chartContainer.current.width, 0);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(0.2, 'orange');
  gradient.addColorStop(0.4, 'yellow');
  gradient.addColorStop(0.6, 'green');
  gradient.addColorStop(0.8, 'blue');
  gradient.addColorStop(1, 'violet');

  const lineData = Array.from({ length: 251 }, (_, i) => ({
    x: i,
    y: 0,
  }));

  const pointData = [
    {
      x: fixedAQI,
      y: 0,
    },
  ];

  const chartData = {
    datasets: [
      {
        data: pointData,
        pointRadius: 10,
        pointBackgroundColor: 'white',
      },
      {
        data: lineData,
        borderColor: gradient,
        backgroundColor: gradient,
        borderWidth: 8,
        showLine: true,
        pointRadius: 0,
      },
    ],
  };

  const newChartInstance = new Chart(ctx, {
    type: 'scatter',
    data: chartData,
    options: {
      layout: {
        padding: {
          left: 15,
          right: 15,
          top: 20,
          bottom: 20,
        },
      },
      scales: {
        x: {
          min: -10,
          max: 260,
          display: false,
        },
        y: {
          min: -1,
          max: 1,
          display: false,
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
      },
    },
  });

  setChartInstance(newChartInstance);
  return () => {

    newChartInstance.destroy();
  };
}, [fixedAQI]);
  const getQualityLevel = (index: number) => {
    if (index <= 50) return '좋음';
    if (index <= 100) return '보통';
    if (index <= 150) return '나쁨';
    if (index <= 200) return '매우 나쁨';
    return '심각하게 나쁨';
  };

  const qualityLevel = getQualityLevel(fixedAQI);

  return (
    <StyledAirQualityCard className="AirQuality-card">
      <div style={styles.qualityInfo}>
        <FontAwesomeIcon icon={faSmog} />
        <div style={styles.qualityLabel}>대기질</div>
      </div>
      <div style={styles.qualityValue}>{fixedAQI}</div> 
      <div style={styles.qualityLevel}>{qualityLevel}</div>
      <div className="graph" style={styles.graph}>
    <canvas ref={chartContainer} />
</div>
    </StyledAirQualityCard>
  );
};

export default Weather;