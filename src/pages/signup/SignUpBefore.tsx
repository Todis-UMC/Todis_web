import React from 'react';
import AuthContainer from '../../component/login/AuthContainer';
import SignUpBeforeLogo from '../../assets/img/SignUpBeforeLogo.png';
import SocialGoogle from '../../component/login/SocialGoogle';
import SocialKakao from '../../component/login/SocialKakao';
import EmailSignUp from '../../component/login/EmailSignup';
import styled from 'styled-components';
const SignUpBeforePage = () => (
  <AuthContainer title='회원가입' component={<SignUpBefore />} />
);

export default SignUpBeforePage;

const SignUpBefore = () => {
  return (
    <>
      <ResponsiveImage src={SignUpBeforeLogo} alt='SignUpBefore' />
      <EmailSignUp />
      <SocialGoogle />
      <SocialKakao />
    </>
  );
};
const ResponsiveImage = styled.img`
  width: 302px;
  height: 302px;

  @media (max-width: 490px) {
    width: 200px;
    height: 200px;
  }
`;
