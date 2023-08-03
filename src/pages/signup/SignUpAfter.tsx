import React from 'react';
import AuthContainer from '../../component/login/AuthContainer';
import SignUpAfterLogo from '../../assets/img/SignUpAfterLogo.png';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import Button from '../../component/common/Button';
import { useNavigate } from 'react-router-dom';

const SignUpAfterPage = () => (
  <AuthContainer title='회원가입에 성공했어요!' component={<SignUpAfter />} />
);

export default SignUpAfterPage;

const SignUpAfter = () => {
  const navigate = useNavigate();
  return (
    <>
      <Title style={FONT.H1}>반가워요, 이름님! </Title>
      <img src={SignUpAfterLogo} alt='SignUpAfter' width={302} height={302} />
      <BlueButton>
        <Button
          onClick={() => {
            navigate('/mypage');
          }}
          style={FONT.H7}
        >
          아바타 설정하기
        </Button>
      </BlueButton>
      <WhiteButton onClick={() => navigate('/')} style={FONT.H7}>
        메인으로 가기
      </WhiteButton>
    </>
  );
};
const Title = styled.div`
  margin-bottom: 23px;
`;
const BlueButton = styled.div`
  margin-top: 18px;
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
