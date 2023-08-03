import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../component/common/Button';
import Input from '../../component/common/InputComponent';
import AuthContainer from '../../component/login/AuthContainer';

const PasswordResetPage = () => (
  <AuthContainer
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
      <ButtonBox>
        <Button>변경하기</Button>
      </ButtonBox>
    </>
  );
};

const ButtonBox = styled.div`
  margin-top: 22px;
  margin-bottom: 19px;
`;
