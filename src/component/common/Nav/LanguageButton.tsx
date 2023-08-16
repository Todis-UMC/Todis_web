import React from 'react';
import styled from 'styled-components';
import FONT from '../../../styles/Font';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e6e6e6;
  background-color: transparent;
  border-radius: 30px;
  padding: 5px 18px;
  color: #437df6;
`;

const LanguageButton: React.FC = () => {
  return <Button style={FONT.M3}>KR
  </Button>;
};

export default LanguageButton;
