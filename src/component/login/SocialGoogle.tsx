import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as Google } from '../../assets/icon/Google.svg';
const SocialGoogle = () => {
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // client_id가 설정되어 있는지 확인
  if (!client_id) {
    console.error(
      'Google Client ID가 설정되지 않았습니다. .env 파일에 REACT_APP_GOOGLE_CLIENT_ID를 설정하세요.'
    );
    return null;
  }
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code'
  });

  return (
    <Button onClick={() => googleSocialLogin()}>
      <Google />
      <div style={FONT.M3}>구글로 시작하기</div>
    </Button>
  );
};

export default SocialGoogle;

const Button = styled.button`
  width: 100%;
  height: 55px;
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
