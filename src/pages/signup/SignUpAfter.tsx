import React from 'react';
import AuthContainer from '../../component/login/AuthContainer';
import SignUpAfterLogo from '../../assets/img/SignUpAfterLogo.png';
import styled from 'styled-components';
import FONT from '../../styles/Font';

const SignUpAfterPage = () => (
  <AuthContainer title='회원가입에 성공했어요!' component={<SignUpAfter />} />
);

export default SignUpAfterPage;

const SignUpAfter = () => {
  return (
    <>
      <Title style={FONT.H1}>반가워요, 이름님! </Title>
      <img src={SignUpAfterLogo} alt='SignUpAfter' width={302} height={302} />
      <Button style={FONT.H7}>아바타 설정하기</Button>
      <WhiteButton style={FONT.H7}>메인으로 가기</WhiteButton>
    </>
  );
};
const Title = styled.div`
  margin-bottom: 23px;
`;

const Button = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 18px;
  border: none;
  border-radius: 14px;
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
const WhiteButton = styled.button`
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
