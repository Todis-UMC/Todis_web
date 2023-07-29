import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../component/common/InputComponent';
import AuthContainer from '../../component/login/AuthContainer';
import FONT from '../../styles/Font';
import { UserProps } from '../../types/Auth';

const user = {
  id: 0,
  name: '김민수',
  email: 'Todis@gmail.com',
  password: '1234'
};

const EditProfilePage = () => {
  return (
    <AuthContainer
      title='회원정보 수정'
      component={<EditProfile user={user} />}
    />
  );
};

export default EditProfilePage;

const EditProfile: React.FC<{ user: UserProps }> = ({ user }) => {
  const [name, setName] = useState<string>(user.name);
  const [password, setPassword] = useState<string>('');
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
      <Input label='아이디' type='email' value={user.email} disabled={true} />
      <div style={{ height: 17 }} />
      <InputBox>
        <Input
          label='비밀번호'
          type='password'
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder='비밀번호를 입력하세요'
        />
        <ShortButton>변경</ShortButton>
      </InputBox>
      <Button>수정완료</Button>
      <A href='/user/delete' style={FONT.L6}>
        계정 삭제하기
      </A>
    </>
  );
};
const A = styled.a`
  color: ${(props) => props.theme.Black_Main};
`;

const Button = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 78px;
  margin-bottom: 19px;
  border: none;
  border-radius: 14px;
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;
const ShortButton = styled.button`
  width: 30%;
  height: 55px;
  border-radius: 14px;
  border: none;
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 28px;
`;
