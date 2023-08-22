import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import ModalContainer from './modal/ModalContainer';
import useOutSideClick from './modal/useOutSideClick';
import { deleteFriendListDelete } from '../../api/Friend';
import avatar from '../../assets/img/avatar/M_Avatar.png';

interface ModalProps {
  name: string;
  open: boolean;
  profileImageUrl: string | null;
  friend_email: string;
  onFriendRefresh: (keyword: string) => void;
  onClose: () => void;
}

const FriendDelete = ({
  name,
  friend_email,
  profileImageUrl,
  onFriendRefresh,
  onClose
}: ModalProps) => {
  // 친구 삭제 모달창 닫기
  const handleClose = () => {
    onClose?.();
  };
  // 모달창 외부 클릭시 닫기
  const modalRef = useRef<HTMLDivElement>(null);
  useOutSideClick(modalRef, handleClose);

  // 친구 삭제 API 연동(성공)
  const handleFriendDelete = async () => {
    try {
      const response = await deleteFriendListDelete(friend_email);
      if (response.success) {
        console.log('친구 삭제 성공:', response.message);
        onFriendRefresh(''); // 친구 삭제 후 친구 리스트 다시 불러오기
        handleClose(); // 모달창 닫기
      } else {
        console.error('친구 삭제 실패:', response.message);
      }
    } catch (error) {
      console.error('친구 삭제 오류:', error);
    }
  };

  return (
    <Container className='container'>
      <Box ref={modalRef}>
        <Profile>
          {profileImageUrl === null ? (
            <img id='avatar' src={avatar} alt='avatar-profile' height='100%' />
          ) : (
            <img
              id='mypage'
              src={profileImageUrl}
              alt='profile'
              height='100%'
            />
          )}
        </Profile>
        <Name style={FONT.M2}>
          <span>{name}</span>님을
        </Name>
        <Message style={FONT.M2}>친구 목록에서 삭제하시겠습니까?</Message>
        <Cancel style={FONT.L4} onClick={handleClose}>
          취소
        </Cancel>
        <Delete style={FONT.L4} onClick={handleFriendDelete}>
          삭제
        </Delete>
      </Box>
    </Container>
  );
};
export default FriendDelete;

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
  z-index: 1;
  @media (max-width: 500px) {
    width: 65%;
  }
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
  z-index: 999;
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
  #avatar {
    position: absolute;
    top: -5px;
    left: -21px;
    height: 290%;
    width: 150%;
    object-fit: cover;
    border-radius: 50%;
  }
  #mypage {
    position: absolute;
    top: -20px;
    left: -26px;
    height: 330%;
    width: 150%;
    object-fit: cover;
    border-radius: 50%;
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
const Delete = styled.button`
  width: 137px;
  height: 37px;
  background-color: ${(props) => props.theme.Blue_Main};
  border-radius: 14px;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-left: 5px;
`;
