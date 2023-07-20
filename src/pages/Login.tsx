import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SmallLogo } from '../assets/icon/SmallLogo.svg';
import Input from '../component/common/InputComponent';
import SocialGoogle from '../component/login/SocialGoogle';
import SocialKakao from '../component/login/SocialKakao';
import FONT from '../styles/Font';
import { ReactComponent as SmallUnCheck } from '../assets/icon/SmallUnCheck.svg';
import { ReactComponent as SmallCheck } from '../assets/icon/SmallCheck.svg';
const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [memory, setMemory] = useState<boolean>(false);

  const handleLoginBtn = () => {
    if (memory) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      console.log('localstorage에 저장됨');
    }
    console.log('로그인 버튼 클릭');
  };
  return (
    <Container>
      <Box>
        <SmallLogo />
        <Title style={FONT.H5}>로그인</Title>
        <Input
          label='이메일'
          type='email'
          placeholder='이메일 주소 입력'
          value={localStorage.getItem('email') || email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <div style={{ height: 15 }} />
        <Input
          label='비밀번호'
          type='password'
          placeholder='비밀번호 입력'
          value={localStorage.getItem('password') || password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <Button onClick={() => handleLoginBtn()}>로그인</Button>
        <Setting>
          <div style={FONT.L6} onClick={() => setMemory(!memory)}>
            {memory ? <SmallCheck /> : <SmallUnCheck />}
            로그인 정보 기억하기
          </div>
          <div>
            <span style={FONT.L6}>아이디 찾기</span>
            <span style={FONT.L6}> | </span>
            <span style={FONT.L6}>비밀번호 찾기</span>
          </div>
        </Setting>
        <SocialGoogle />
        <SocialKakao />
        <SignUp style={FONT.L6}>
          계정이 없으신가요?
          <a href='/signup'> 회원가입</a>
        </SignUp>
      </Box>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Box = styled.div`
  max-width: 569px;
  width: 80%;
  height: 730px;
  background-color: #fff;
  border-radius: 47px;
  justify-content: center;
  padding: 44px 65px 50px 65px;
  text-align: center;
`;
const Title = styled.div`
  margin-top: 19px;
  margin-bottom: 42px;
`;
const SignUp = styled.div`
  margin-top: 22px;
  color: ${(props) => props.theme.Typo_Black};
  a {
    color: ${(props) => props.theme.Blue_Main};
  }
`;
const Setting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  div {
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${(props) => props.theme.Gray_01};
    span {
      color: ${(props) => props.theme.Gray_01};
      margin-left: 10px;
    }
  }
`;
const Button = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 58px;
  border: none;
  border-radius: 14px;
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
