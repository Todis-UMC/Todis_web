import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postPasswordCompare, putChangeNickname } from '../../api/User';
import Button from '../../component/common/Button';
import Input from '../../component/common/InputComponent';
import AuthContainer from '../../component/login/AuthContainer';
import FONT from '../../styles/Font';
import { ToastContainer, toast } from 'react-toastify';

const EditProfilePage = () => {
  return <AuthContainer title='회원정보 수정' component={<EditProfile />} />;
};

export default EditProfilePage;

const EditProfile = () => {
  const [name, setName] = useState<string>(localStorage.getItem('name')!);
  const [email, setEmail] = useState<string>(localStorage.getItem('email')!);
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const data = { name: name };

  const handleChangePassword = async () => {
    const data = { password: password };
    const response = await postPasswordCompare(data);
    if (response.code === 200) {
      navigate('/user/edit/password');
    } else if (response.code === 400) {
      toast(response.message, {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true,
        pauseOnHover: false,
        progress: undefined,
        className: 'custom-toast'
      });
    }
  };
  const handleChangeName = async () => {
    const response = await putChangeNickname(data);
    console.log(response);
  };
  return (
    <>
      <Input
        label='이름'
        type='text'
        onChange={(ev) => setName(ev.target.value)}
        value={name}
        placeholder='이름을 입력하세요'
      />
      <div style={{ height: 17 }} />
      <Input label='아이디' type='email' value={email} disabled={true} />
      <div style={{ height: 17 }} />
      <InputBox>
        <Input
          label='비밀번호'
          type='password'
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder='비밀번호를 입력하세요'
        />
        <ShortButtonBox>
          {password ? (
            <Button onClick={() => handleChangePassword()}>변경</Button>
          ) : (
            <Button disabled>변경</Button>
          )}
        </ShortButtonBox>
      </InputBox>
      <ButtonBox>
        <Button onClick={() => handleChangeName()}>수정완료</Button>
      </ButtonBox>
      <A href='/user/delete' style={FONT.L6}>
        계정 삭제하기
      </A>
      <ToastContainer />
    </>
  );
};
const A = styled.a`
  color: ${(props) => props.theme.Black_Main};
`;

const ButtonBox = styled.div`
  margin-top: 78px;
  margin-bottom: 19px;
`;
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;
const ShortButtonBox = styled.div`
  width: 30%;
  margin-top: 28px;
`;
