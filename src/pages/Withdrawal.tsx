import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Input from '../component/common/InputComponent';
import SmallModal from '../component/common/SmallModal';
import AuthContainer from '../component/login/AuthContainer';
import FONT from '../styles/Font';
import { deleteUserLeave, postPasswordCompare } from '../api/User';
import { ToastContainer, toast } from 'react-toastify';

const WithdrawalPage = () => (
  <AuthContainer title='계정 탈퇴' component={<Withdrawal />} />
);

export default WithdrawalPage;

export const Withdrawal = () => {
  const [password, setPassword] = useState<string>('');
  const [notice, setNotice] = useState<boolean>(false);

  // 회원 탈퇴 API 연동
  const handleUserLeaveButton = async () => {
    const data = { password: password };
    const response = await postPasswordCompare(data);

    if (response.code === 200) {
      try {
        const response2 = await deleteUserLeave();
        if (response2.success) {
          console.log('회원 탈퇴 성공:', response2.message);
          localStorage.removeItem('token');
          setNotice(true);
        } else {
          console.error('회원 탈퇴 실패:', response2.message);
        }
      } catch (error) {
        console.error('회원 탈퇴 오류:', error);
      }
    } else if (response.code === 400) {
      toast(response.message, {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true,
        pauseOnHover: false,
        progress: undefined,
        className: 'custom-toast1'
      });
    }
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
      <Button onClick={() => handleUserLeaveButton()}>탈퇴하기</Button>

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
      <ToastContainer />
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
