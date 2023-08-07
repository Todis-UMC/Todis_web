import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../component/common/InputComponent';
import AuthContainer from '../../component/login/AuthContainer';
import FONT from '../../styles/Font';
import { UserProps } from '../../types/User';
import { postSignup } from '../../api/user';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../component/common/Button';

const SignUpInfoPage = () => (
  <AuthContainer title='마지막 단계에요!' component={<SignUpInfo />} />
);

export default SignUpInfoPage;

const SignUpInfo = () => {
  const [sex, setSex] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const handleButtonClick = (selectedSex: number) => {
    setSex(selectedSex);
  };
  const location = useLocation();
  const navigate = useNavigate();

  const handleButton = async () => {
    const data: UserProps = {
      name: name,
      email: location.state.email,
      password: location.state.password,
      gender: sex === 1 ? '남자' : '여자'
    };
    const response = await postSignup(data);
    console.log(response);
    navigate('/signup/complete');
  };

  return (
    <>
      <Input
        label='이름'
        type='text'
        placeholder='이름 입력'
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <Title style={FONT.H7}>성별</Title>
      <Sex>
        <GenderButton
          isSelected={sex === 1}
          onClick={() => handleButtonClick(1)}
        >
          남자
        </GenderButton>
        <GenderButton
          isSelected={sex === 2}
          onClick={() => handleButtonClick(2)}
        >
          여자
        </GenderButton>
      </Sex>
      <ButtonBox>
        {name && sex ? (
          <Button
            onClick={() => {
              handleButton();
            }}
          >
            가입 완료하기
          </Button>
        ) : (
          <Button disabled={true}>가입 완료하기</Button>
        )}
      </ButtonBox>
    </>
  );
};

const Sex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const Title = styled.div`
  color: ${(props) => props.theme.Black_Main};
  margin-bottom: 12px;
  padding-left: 3px;
  text-align: left;
  margin-top: 23px;
`;
const GenderButton = styled.button<{ isSelected: boolean }>`
  width: 48%;
  height: 50px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  ${(props) =>
    props.isSelected
      ? `
        background-color: ${props.theme.Blue_Main};
        color: #fff;
      `
      : `
        background-color: ${props.theme.Gray_04};
        color: ${props.theme.Gray_01};
      `};

  &:hover {
    background-color: ${(props) => props.theme.Gray_03};
  }
  //
`;

const ButtonBox = styled.div`
  margin-top: 268px;
`;
