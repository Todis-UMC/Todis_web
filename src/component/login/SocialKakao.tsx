import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Kakao } from '../../assets/icon/Kakao.svg';
import FONT from '../../styles/Font';

const SocialKakao = () => {
  const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirect_uri = 'http://localhost:3000/auth';

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      <Button onClick={handleLogin}>
        {' '}
        <Kakao />
        <div style={FONT.M3}>카카오로 시작하기</div>
      </Button>
    </>
  );
};
export default SocialKakao;

const Button = styled.button`
  width: 100%;
  height: 55px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  background-color: #fee500;
  color: ${(props) => props.theme.Black_Main};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
