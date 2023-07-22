import React from 'react';
import AuthContainer from '../component/login/AuthContainer';
import SignUpBeforeLogo from '../assets/img/SignUpBeforeLogo.png';
import SocialGoogle from '../component/login/SocialGoogle';
import SocialKakao from '../component/login/SocialKakao';
import EmailSignUp from '../component/login/EmailSignup';
const SignUpBeforePage = () => (
  <AuthContainer title='회원가입' component={<SignUpBefore />} />
);

export default SignUpBeforePage;

const SignUpBefore = () => {
  return (
    <>
      <img src={SignUpBeforeLogo} alt='SignUpBefore' width={302} height={302} />
      <EmailSignUp />
      <SocialGoogle />
      <SocialKakao />
    </>
  );
};
