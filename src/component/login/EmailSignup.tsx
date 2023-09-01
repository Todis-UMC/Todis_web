import React from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as Email } from '../../assets/icon/Email.svg';
import { useNavigate } from 'react-router-dom';

const EmailSignUp = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button>
        {' '}
        <Email />
        <div onClick={() => navigate('/signup/email')} style={FONT.M3}>
          이메일로 시작하기
        </div>
      </Button>
    </>
  );
};

export default EmailSignUp;

const Button = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 38px;
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
