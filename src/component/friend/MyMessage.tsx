import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as GoBack } from '../../assets/icon/GoBack.svg';
import ModalContainer from './modal/ModalContainer';
import useOutSideClick from './modal/useOutSideClick';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const MyMessage = ({ onClose }: ModalProps) => {
  // 글쓰기 모달창 닫기
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

  return (
    <ModalContainer>
      <Container className='container'>
        <Box ref={modalRef}>
          <Title style={FONT.M2}>
            <span id='goBack'>
              <GoBack onClick={handleClose} />
            </span>
            <span id='title'>글쓰기</span>
          </Title>
          <Message
            style={FONT.L5}
            placeholder='오늘의 날씨는 어떤가요?...'
          ></Message>
          <Ok style={FONT.L5}>완료</Ok>
        </Box>
      </Container>
    </ModalContainer>
  );
};
export default MyMessage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
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
  width: 569px;
  height: 404px;
  border-radius: 47px;
  border: 1px solid black;
  border: none;
  justify-content: center;
  text-align: center;
  padding: 30px 40px;
`;
const Title = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
  display: flex;
  position: relative;
  #title {
    margin: 0 auto;
    padding-right: 15px;
  }
  #goBack {
    cursor: pointer;
  }
`;
const Message = styled.textarea`
  width: 463px;
  height: 98px;
  background-color: ${(props) => props.theme.Gray_04};
  vertical-align: top;
  border-radius: 14px;
  padding: 20px 30px;
  border: none;
  resize: none;
  font-family: 'Pretendard';
  &:focus {
    outline: none;
  }
`;
const Ok = styled.button`
  width: 460px;
  height: 55px;
  background-color: ${(props) => props.theme.Gray_03};
  border-radius: 14px;
  margin-top: 80px;
  border: none;
  cursor: pointer;
  color: #fff;
  &:hover {
    background-color: ${(props) => props.theme.Blue_Main};
  }
`;
