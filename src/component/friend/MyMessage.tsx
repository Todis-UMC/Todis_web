import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as GoBack } from '../../assets/icon/GoBack.svg';
import ModalContainer from './modal/ModalContainer';
import useOutSideClick from './modal/useOutSideClick';
import { postMyComment } from '../../api/Friend';

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
  // 글쓰기 정보
  const [comment, setComment] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setComment(value);
  };
  // 글쓰기 API 연동(..)
  const handleComment = async () => {
    try {
      const response = await postMyComment(comment);
      console.log('글쓰기 성공', response);
    } catch (error) {
      console.error('글쓰기 오류:', error);
    }
    onClose?.(); // 창 닫기
    window.location.reload(); // 새로고침 실행
  };

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
            value={comment}
            onChange={handleInputChange}
            style={FONT.L5}
            placeholder='오늘의 날씨는 어떤가요?...'
          ></Message>
          <Ok style={FONT.L5} onClick={handleComment}>
            완료
          </Ok>
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
  @media (max-width: 500px) {
    width: 80%;
  }
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
  @media (max-width: 500px) {
    width: 100%;
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
  @media (max-width: 500px) {
    width: 100%;
  }
`;
