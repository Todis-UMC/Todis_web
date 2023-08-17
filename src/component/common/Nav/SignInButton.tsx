import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../../styles/Font';
import { Link } from 'react-router-dom';

const SigninButton = () => {
  const handleSignin = () => {
    window.location.href = '/login';
  };
  return (
    <Button style={FONT.M3} onClick={() => handleSignin()}>
      로그인
    </Button>
  );
};
export default SigninButton;

const Button = styled.button`
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  border: none;
  outline: none;
  width: 7.5rem;
`;
