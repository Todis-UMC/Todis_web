import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../component/common/InputComponent';
import AuthContainer from '../component/login/AuthContainer';
import { ReactComponent as SmallUnCheck } from '../assets/icon/SmallUnCheck.svg';
import { ReactComponent as SmallCheck } from '../assets/icon/SmallCheck.svg';
import FONT from '../styles/Font';

const SignUpEmailPage = () => (
  <AuthContainer title='이메일로 가입하기' component={<SignUpEmail />} />
);

export default SignUpEmailPage;

const SignUpEmail = () => {
  const [check, setCheck] = useState<boolean>(false);
  return (
    <>
      <InputBox>
        <Input
          label='이메일 주소'
          type='email'
          placeholder='이메일 주소 입력'
        />
        <ShortButton>인증</ShortButton>
      </InputBox>
      <Blank />
      <Input
        label='비밀번호'
        type='password'
        placeholder='비밀번호 입력(6자리 이상)'
        minLength={6}
      />
      <Blank />
      <Input
        label='비밀번호 확인'
        type='password'
        placeholder='비밀번호 확인'
        minLength={6}
      />

      <Terms>
        <div style={FONT.L6} onClick={() => setCheck(!check)}>
          {check ? <SmallCheck /> : <SmallUnCheck />}
          TODIS 가입 약관에 동의 합니다
        </div>
        <div style={FONT.L6}>가입 약관</div>
      </Terms>
      <TermsUnder style={FONT.L6}>
        TODIS 이용약관 (필수), 개인정보취급방침(필수), 이메일 정보 수집
        동의(필수)
      </TermsUnder>

      <Button>다음</Button>
    </>
  );
};

const Terms = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 52px;
  margin-bottom: 16px;
  > div {
    color: ${(props) => props.theme.Black_Main};
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 5px;
  }
`;
const TermsUnder = styled.div`
  color: ${(props) => props.theme.Gray_01};
  margin-bottom: 43px;
`;

const Blank = styled.div`
  height: 23px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;

const ShortButton = styled.button`
  width: 30%;
  height: 55px;
  border-radius: 14px;
  border: none;
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 28px;
`;

const Button = styled.button`
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 14px;
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
