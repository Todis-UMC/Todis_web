import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import useOutSideClick from '../friend/modal/useOutSideClick';
import ModalContainer from '../friend/modal/ModalContainer';
import { postFriendRequest } from '../../api/FriendInvite';
import { getInfo } from '../../api/User';
import { ToastContainer, toast } from 'react-toastify';
import avatar from '../../assets/img/avatar/M_Avatar.png';

interface ModalProps {
  friendEmail: string;
  open: boolean;
  onClose: () => void;
}

const FriendRequest = ({ friendEmail, onClose }: ModalProps) => {
  // 친구 수락 모달창 닫기
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    onClose?.();
  };

  // 모달창 외부 클릭시 닫기
  useOutSideClick(modalRef, handleClose);
  useEffect(() => {
    const $body = document.querySelector('body') as HTMLBodyElement;
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);
  // 회원 정보 API 연동
  const [email, setEmail] = useState(localStorage.getItem('email'));
  useEffect(() => {
    const fetchData = async () => {
      const response = await getInfo();
      localStorage.setItem('email', response.data.email);
    };
    fetchData();
  }, []);

  // 친구 요청 API 연동
  const handleFriendRequest = async () => {
    if (friendEmail === email) {
      toast('초대는 자신에게 보낼 수 없습니다.', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true,
        pauseOnHover: false,
        progress: undefined,
        className: 'custom-toast'
      });
      return;
    }
    try {
      const response = await postFriendRequest(friendEmail);
      console.log('친구 요청 성공.', response);
    } catch (error) {
      console.error('친구 요청 보내기 오류:', error);
    }
    onClose?.(); // 창 닫기
  };

  return (
    <ModalContainer>
      <Container className='container'>
        <Box ref={modalRef}>
          <Profile>
            <img src={avatar} />
          </Profile>
          <Name style={FONT.M2}>
            <span>{friendEmail}</span>님께
          </Name>
          <Message style={FONT.M2}>친구요청하시겠습니까?</Message>
          <Cancel style={FONT.L4} onClick={handleClose}>
            취소
          </Cancel>
          <Request style={FONT.L4} onClick={handleFriendRequest}>
            요청
          </Request>
        </Box>
      </Container>
      <ToastContainer />
    </ModalContainer>
  );
};

export default FriendRequest;
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /*까만색(0,0,0) 20% 불투명도*/
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  border: none;
  position: fixed;
  top: 0px;
  left: 0px;
`;
const Box = styled.div`
  background-color: #fff;
  width: 362px;
  height: 225px;
  background-color: ${(props) => props.theme.Sky_Blue_03};
  border-radius: 47px;
  border: 1px solid black;
  position: relative;
  border: none;
  justify-content: center;
  text-align: center;
`;
const Profile = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.BlueBray_01};
  border-radius: 50%;
  border: 1px solid black;
  position: absolute;
  top: -52.5px;
  left: 128.5px;
  border: none;
  overflow: hidden;
  img {
    position: absolute;
    top: -13px;
    left: -21px;
    height: 320%;
    width: 150%;
    object-fit: cover;
    border: 1px solid #111;
  }
`;
const Name = styled.div`
  margin-top: 70px;
  span {
    color: ${(props) => props.theme.Blue_Main};
  }
`;
const Message = styled.div`
  margin-bottom: 30px;
`;
const Cancel = styled.button`
  width: 137px;
  height: 37px;
  border-radius: 14px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.Blue_Main};
  color: ${(props) => props.theme.Blue_Main};
  cursor: pointer;
  margin-right: 5px;
`;
const Request = styled.button`
  width: 137px;
  height: 37px;
  background-color: ${(props) => props.theme.Blue_Main};
  border-radius: 14px;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-left: 5px;
`;
