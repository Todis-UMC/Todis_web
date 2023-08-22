import React, { useEffect, useState, CSSProperties, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import Color from '../../styles/Color';
import Font from '../../styles/Font';
import { Chart, LinearScale, PointElement, CategoryScale, BarController, BarElement, LineController, LineElement, ScatterController, ChartData, Point } from 'chart.js';
import styled from 'styled-components';

const SunCardStyles = styled.div`
  background: ${Color.SkyBlue_03}; 
  width: 877px; 
  height: 327px;
  padding: 20px;
  paddingLeft: 30px;
  color: ${Color.Black_Main};
  border-radius: 40px;
  box-shadow: 0px 0px 10px ${Color.Gray_03};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    transform: scale(0.55);

    > div:last-child {
      margin-top: auto;
    }

    .graph {
      display: none; 
    }
  }
`;

interface Main {
  uvi: number;
}

interface WeatherData {
  list: {
    main: Main;
  }[];
}
const fixedUVI = 7;

const Weather = () => {
    const chartContainer = useRef<HTMLCanvasElement | null>(null);
    const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  
    const styles = {
      SunInfo: {
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '37px',
      },
      SunLabel: {
          ...Font.H6,
          color: Color.Gray_01,
      },
      SunValue: {
          ...Font.M1,
          color: Color.Gray_00,
          marginTop: '26.5px',
      },
      SunLevel: {
          ...Font.L3,
          color: Color.Gray_01,
          marginTop: '26.5px',
      },
      graph: {
          width: '100%',
          marginTop: '-150px',  
      }
    };
    
  
    /*useEffect(() => {
        const fetchData = async (position: GeolocationPosition) => {
          try {
            const response = await fetch(
              `http://api.openweathermap.org/data/2.5/uvi?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=4d4c41dc06bbf1741b3a628d64934b98`
            );
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
      
          
            if (!data.list) {
              data.list = [{ main: { uvi: 0 } }];
            } else if (!data.list[0]?.main) {
              data.list[0].main = { uvi: 0 };
            }
      
            setWeatherData(data);
          } catch (error) {
            console.error(error);
          }
        };
      
        navigator.geolocation.getCurrentPosition(fetchData);
      }, []);*/
  
  useEffect(() => {
    if (!chartContainer.current || !weatherData) {
      return;
    }

    const ctx = chartContainer.current.getContext('2d');

    if (!ctx) {
      return;
    }

    if (chartInstance) {
      chartInstance.destroy();
    }
    const gradientWidth = 780;
    const gradient = ctx.createLinearGradient(0, 0, gradientWidth, 0);

    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.4, 'orange');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(0.6, 'green');
    gradient.addColorStop(0.8, 'blue');
    gradient.addColorStop(1, 'violet');

    const lineData = Array.from({ length: 780 }, (_, i) => ({
      x: i,
      y: 0
    }));

    const pointData = [
      {
        x: weatherData.list[0].main.uvi || 0,
        y: 0
      }
    ];

    const chartData: ChartData<'scatter', Point[], number> = {
      datasets: [
        {
          data: pointData,
          pointRadius: 10,
          pointBackgroundColor: 'white'
        },
        {
          data: lineData,
          borderColor: gradient,
          backgroundColor: gradient,
          borderWidth: 8,
          showLine: true,
          pointRadius: 0
        }
    
     
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
                    min: 0, 
                    max: 15, 
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
          }, []); 

  if (!fixedUVI) {
    return <div>Loading...</div>;
  }

  const SunLevel = (index: number) => {
    if (index <= 2.9) return '매우 낮음';
    if (index <= 4.9) return '낮음';
    if (index <= 6.9) return '보통';
    if (index <= 8.9) return '매우 강함';
    return '극도로 강함';
  };

  const sunLevel = SunLevel(fixedUVI);

    return (
        <SunCardStyles>
            <div style={styles.SunInfo}>
                <FontAwesomeIcon icon={faSun} />
                <div style={styles.SunLabel}>자외선 지수</div>
            </div>
            <div style={styles.SunValue}>{fixedUVI}</div>
            <div style={styles.SunLevel}>{sunLevel}</div>
            <div className="graph" style={styles.graph}>
    <canvas ref={chartContainer} />
</div>
        </SunCardStyles>
    );
};

export default Weather;
