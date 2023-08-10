import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as Google } from '../../assets/icon/Google.svg';
import { getGoogleLogin } from '../../api/Auth';
import { useNavigate } from 'react-router-dom';
const SocialGoogle = () => {
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [code, setCode] = useState<string>('');
  const navigate = useNavigate();

  // client_id가 설정되어 있는지 확인
  if (!client_id) {
    console.error(
      'Google Client ID가 설정되지 않았습니다. .env 파일에 REACT_APP_GOOGLE_CLIENT_ID를 설정하세요.'
    );
    return null;
  }
  const googleSocialLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setCode(codeResponse.code);
      const response = await getGoogleLogin(codeResponse.code);
      // console.log('??', response);
      navigate('/');
    },
    flow: 'auth-code'
  });

  // console.log(code);
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
