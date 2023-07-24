import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../component/common/InputComponent';
import PasswordContainer from '../component/login/PasswordContainer';

const PasswordResetPage = () => (
  <PasswordContainer
    title='비밀번호 재설정'
    component={<PasswordReset />}
    content='새로운 비밀번호를 입력해주세요.'
  />
);

export default PasswordResetPage;

export const PasswordReset = () => {
  const [password, setPassword] = useState<string>('');
  return (
    <>
      <Input
        label='비밀번호'
        type='password'
        placeholder='새로운 비밀번호 입력'
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <Button>변경하기</Button>
    </>
  );
};

const Button = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 22px;
  margin-bottom: 19px;
  border: none;
  border-radius: 14px;
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
