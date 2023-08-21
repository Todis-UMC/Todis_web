import React, { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons'; // moon icon
import Color from '../../styles/Color';
import Font from '../../styles/Font';
import styled from 'styled-components';

const StyledSunsetCard = styled.div`
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
}
`;

const Weather = () => {
  const styles: { [key: string]: CSSProperties } = {
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

  const sunsetTime = '7:19PM';
  const sunriseTime = '일출 : 5:54AM';

  return (
    <StyledSunsetCard className="Sunset-card">
      <div style={styles.sunsetInfo}>
        <FontAwesomeIcon icon={faMoon} />
        <div style={styles.sunsetLabel}>일몰</div>
      </div>
      <div style={styles.sunsetValue}>{sunsetTime}</div>
      <div style={styles.sunriseValue}>{sunriseTime}</div>
    </StyledSunsetCard>
  );
};

export default Weather;
