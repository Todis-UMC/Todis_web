import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Input from '../component/common/InputComponent';
import SmallModal from '../component/common/SmallModal';
import AuthContainer from '../component/login/AuthContainer';
import FONT from '../styles/Font';

const WithdrawalPage = () => (
  <AuthContainer title='계정 탈퇴' component={<Withdrawal />} />
);

export default WithdrawalPage;

export const Withdrawal = () => {
  const [password, setPassword] = useState<string>('');
  const [notice, setNotice] = useState<boolean>(false);

  const handleButton = () => {
    setNotice(true);
  };
  const startButton = () => {
    setNotice(false);
    window.location.href = '/home'; // 처음(홈)으로 이동
  };
  return (
    <>
      <Content>계정 탈퇴를 위해 비밀번호를 입력해주세요.</Content>
      <Input
        label='비밀번호'
        type='password'
        placeholder='비밀번호 입력'
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <Button onClick={() => handleButton()}>탈퇴하기</Button>

      {notice && (
        <SmallModal
          title={'계정 탈퇴 완료'}
          content={
            '계정 탈퇴가 완료되었습니다<br/>그 동안 TODIS를 이용해주셔서 감사합니다'
          }
          onClose={startButton}
          btn='처음으로'
          onStart={startButton}
        />
      )}
    </>
  );
};

const Content = styled.div`
  height: 25px;
  width: 90%;
  color: ${(props) => props.theme.Gray_01};
  margin: 0 auto;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Button = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 22px;
  margin-bottom: 19px;
  border: none;
  border-radius: 14px;
  background-color: ${(props) => props.theme.Gray_03};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.Blue_Main};
  }
`;
