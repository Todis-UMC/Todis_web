import React from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
  btn?: string; // 버튼 text
  onStart?: () => void; // 처음으로 이동
}

const SmallModal = ({
  title = '',
  content = '',
  onClose,
  btn = '확인',
  onStart
}: ModalProps) => {
  return (
    <Container onClick={onClose}>
      <Box
        onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
      >
        <div style={FONT.H5}>{title}</div>
        <Content>
          {content.split('<br/>').map((txt) => (
            <>
              <div style={FONT.L5}>{txt}</div>
            </>
          ))}
        </Content>
        <Button onClick={btn === '처음으로' ? onStart : onClose}>{btn}</Button>
      </Box>
    </Container>
  );
};

export default SmallModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  max-width: 413px;
  width: 80%;
  height: 254px;
  border-radius: 34px;
  background-color: #fff;
  position: fixed;
  z-index: 300;
  padding: 42px 67px 37px 66px;
  color: ${(props) => props.theme.Black_Main};
`;
const Content = styled.div`
  margin-top: 23px;
  margin-bottom: 30px;
  color: ${(props) => props.theme.Gray_01};
`;
const Button = styled.button`
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 14px;
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
