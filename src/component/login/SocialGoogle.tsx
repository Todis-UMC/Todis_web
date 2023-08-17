import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as Google } from '../../assets/icon/Google.svg';
import { getGoogleLogin } from '../../api/Auth';
import { useNavigate } from 'react-router-dom';
const SocialGoogle = () => {
  const Client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const rediect_url = 'http://localhost:3000/google';
  const googleURL = `https://accounts.google.com/o/oauth2/auth?client_id=${Client_id}&redirect_uri=${rediect_url}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  const googleSocialLogin = async () => {
    window.location.href = googleURL;
  };
  return (
    <Button onClick={() => googleSocialLogin()}>
      <Google />
      <div style={FONT.M3}>Google로 시작하기</div>
    </Button>
  );
};

export default SocialGoogle;

const Button = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 15px;
  border-radius: 14px;
  border: 0.5px solid ${(props) => props.theme.Gray_01};
  font-size: 16px;
  background-color: #fff;
  color: ${(props) => props.theme.Black_Main};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  > div {
    margin-left: 5px;
  }
`;
