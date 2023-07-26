import React from 'react';
import styled from 'styled-components';
import TERMS, { ContentProps, TermsProps } from '../../constants/Terms';
import FONT from '../../styles/Font';

export interface ModalProps {
  id: number;
  onClose: () => void;
}

export const TermItem = ({ title, content }: ContentProps) => {
  return (
    <div>
      <ItemTitle style={FONT.H7}>{title}</ItemTitle>
      <ItemContent style={FONT.L5}>{content}</ItemContent>
    </div>
  );
};

const TermsModal = ({ id, onClose }: ModalProps) => {
  const term = TERMS[id];
  console.log(term);
  return (
    <Container onClick={onClose}>
      <Box>
        <Title style={FONT.H4}>{term.title}</Title>
        <Guide style={FONT.L4}>
          아래 약관에 동의하시고 다음 단계로 이동하세요
        </Guide>
        <Content>
          <Scroll>
            <div style={FONT.H6}>
              [{term.isEssential ? '필수' : '선택'}] {term.title}
            </div>
            {term.content?.map((item, index) => (
              <TermItem key={index} title={item.title} content={item.content} />
            ))}
          </Scroll>
        </Content>
      </Box>
    </Container>
  );
};

export default TermsModal;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
`;

const Box = styled.div`
  width: 569px;
  height: fit-content;
  padding: 55px 1px 61px 11px;
  background-color: #fff;
  border-radius: 47px;
  z-index: 101;
`;

const Title = styled.div`
  margin-bottom: 18px;
  color: ${(props) => props.theme.Black_Main};
`;

const Guide = styled.div`
  color: ${(props) => props.theme.Gray_01};
  border-bottom: 1px solid ${(props) => props.theme.Gray_01};
  padding-bottom: 39.5px;
  margin-bottom: 49px;
`;

const Content = styled.div`
  color: ${(props) => props.theme.Black_Main};
  text-align: left;
  padding: 0 25px;
`;

const Scroll = styled.div`
  overflow-y: scroll;
  height: 500px;
  padding-right: 10px;
  &::-webkit-scrollbar {
    width: 10px;
    height: 33px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.Gray_03};
    border-radius: 32px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.Gray_02};
  }
`;

const ItemTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  color: ${(props) => props.theme.Black_Main};
`;

const ItemContent = styled.p`
  white-space: pre-line;
  color: ${(props) => props.theme.Gray_00};
`;
