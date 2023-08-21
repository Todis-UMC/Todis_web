import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import FONT from '../../styles/Font';
import useOutSideClick from '../friend/modal/useOutSideClick';
import ModalContainer from '../friend/modal/ModalContainer';
import avatar from '../../assets/img/avatar/M_Avatar.png';

const FriendAccept = ({
  name,
  profileImageUrl
}: {
  name: string;
  profileImageUrl: string;
}) => {
  /* 모달창 백그라운드 스크롤 방지
  useEffect(() => {
    const $body = document.querySelector('body') as HTMLBodyElement;
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);
  */

  return (
    <Container className='container'>
      <Box>
        <Profile>
          {profileImageUrl === null ? (
            <img src={avatar} />
          ) : (
            <img src={profileImageUrl} />
          )}
        </Profile>
        <Name style={FONT.M2}>
          <span>{name}</span>님과
        </Name>
        <Message style={FONT.M2}>친구가 되었어요!</Message>
      </Box>
    </Container>
  );
};

export default FriendAccept;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const Container = styled.div`
  animation: ${() => fadeOut} 2s ease-in-out;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2); /*까만색(0,0,0) 20% 불투명도*/
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
`;
const Box = styled.div`
  z-index: 999;
  background-color: #fff;
  width: 362px;
  height: 187px;
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
