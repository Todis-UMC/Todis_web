import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { putChangePassword } from '../../api/User';
import Button from '../../component/common/Button';
import Input from '../../component/common/InputComponent';
import AuthContainer from '../../component/login/AuthContainer';
import { ToastContainer, toast } from 'react-toastify';

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
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    const data = { password: password };
    if (password.length < 6) {
      toast('비밀번호는 6자리 이상으로 설정해주세요.', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true,
        pauseOnHover: false,
        progress: undefined,
        className: 'custom-toast'
      });
    } else {
      const response = await putChangePassword(data);
      navigate('/user/edit');
    }
  };
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
        <Button onClick={() => handleChangePassword()}>변경하기</Button>
      </ButtonBox>
      <ToastContainer />
    </>
  );
};

const ButtonBox = styled.div`
  margin-top: 22px;
  margin-bottom: 19px;
`;
