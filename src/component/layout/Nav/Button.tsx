import React from 'react';
import styled from 'styled-components';
import FONT from '../../../styles/Font';
import { Link } from 'react-router-dom';

export const SignUpButton = () => {
  return (
    <Link to='/signup'>
      <SignUp style={FONT.M3}>회원가입</SignUp>
    </Link>
  );
};
export const SignInButton = () => {
  const handleSignin = () => {
    window.location.href = '/login';
  };
  return (
    <SignIn style={FONT.M3} onClick={() => handleSignin()}>
      로그인
    </SignIn>
  );
};
export const LanguageButton: React.FC = () => {
  return <Language style={FONT.M3}>KR</Language>;
};

export const Buttons = () => {
  return (
    <ButtonContainer>
      <SignUpButton />
      <ButtonSpacer />
      <SignInButton />
    </ButtonContainer>
  );
};

export default Buttons;

const SignUp = styled.button`
  background-color: ${(props) => props.theme.SkyBlue_02};
  color: #437df6;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  border: none;
  outline: none;
  width: 7.5rem;
`;

const SignIn = styled.button`
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  border: none;
  outline: none;
  width: 7.5rem;
`;

const Language = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e6e6e6;
  background-color: transparent;
  border-radius: 30px;
  padding: 5px 18px;
  color: #437df6;
`;

const ButtonSpacer = styled.div`
  margin-right: 0.5rem;
`;

const ButtonContainer = styled.div`
  margin-right: 5.5rem;
  display: flex;
  align-items: center;
`;
