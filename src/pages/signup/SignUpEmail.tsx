import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../component/common/InputComponent';
import AuthContainer from '../../component/login/AuthContainer';
import { ReactComponent as SmallUnCheck } from '../../assets/icon/SmallUnCheck.svg';
import { ReactComponent as SmallCheck } from '../../assets/icon/SmallCheck.svg';
import FONT from '../../styles/Font';

const SignUpEmailPage = () => (
  <AuthContainer title='이메일로 가입하기' component={<SignUpEmail />} />
);

export default SignUpEmailPage;

function isValidEmail(email: string) {
  // 이메일 주소 형식을 확인하는 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 정규식과 일치하는지 확인하여 유효한 이메일인지 여부를 반환
  return emailRegex.test(email);
}

const SignUpEmail = () => {
  const [check, setCheck] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [warn, setWarn] = useState<boolean>(false);

  const EmailCheck = () => {
    setWarn(isValidEmail(email));
  };
  const NextPageHandler = () => {
    isValidEmail(email) && password === passwordCheck && check
      ? console.log('다음 페이지로 이동')
      : console.log('다음 페이지로 이동 불가');
  };
  return (
    <>
      <InputBox>
        <Input
          label='이메일 주소'
          type='email'
          placeholder='이메일 주소 입력'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          warn={warn}
        />
        <ShortButton onClick={() => EmailCheck()}>인증</ShortButton>
      </InputBox>
      <Blank />
      <Input
        label='비밀번호'
        type='password'
        placeholder='비밀번호 입력(6자리 이상)'
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Blank />
      <Input
        label='비밀번호 확인'
        type='password'
        placeholder='비밀번호 확인'
        minLength={6}
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
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

      <Button
        onClick={() => {
          NextPageHandler();
        }}
      >
        다음
      </Button>
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
