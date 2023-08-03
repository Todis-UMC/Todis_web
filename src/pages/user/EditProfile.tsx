import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../component/common/Button';
import Input from '../../component/common/InputComponent';
import AuthContainer from '../../component/login/AuthContainer';
import FONT from '../../styles/Font';
import { UserProps } from '../../types/User';

const user = {
  id: 0,
  nickname: '김민수',
  email: 'Todis@gmail.com',
  password: '1234',
  gender: '남자'
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
  const [name, setName] = useState<string>(user.nickname);
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate('/user/edit/password');
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
        <ShortButtonBox>
          {password ? (
            <Button onClick={() => handleChangePassword()}>변경</Button>
          ) : (
            <Button disabled>변경</Button>
          )}
        </ShortButtonBox>
      </InputBox>
      <ButtonBox>
        <Button>수정완료</Button>
      </ButtonBox>
      <A href='/user/delete' style={FONT.L6}>
        계정 삭제하기
      </A>
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
