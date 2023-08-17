import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../../styles/Font';
import { Link } from 'react-router-dom';

const SignUpButton = () => {
  return (
    <Link to='/signup'>
      <Button style={FONT.M3}>회원가입</Button>
    </Link>
  );
};
export default SignUpButton;

const Button = styled.button`
  background-color: ${(props) => props.theme.SkyBlue_02};
  color: #437df6;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  border: none;
  outline: none;
  width: 7.5rem;
`;
