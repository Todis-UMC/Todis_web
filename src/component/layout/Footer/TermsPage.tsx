import React from 'react';
import { useParams } from 'react-router-dom';
import { TERMS, TermsProps } from '../../../constants/Terms';
import styled from 'styled-components';
import FONT from '../../../styles/Font';

interface Params {
  id: string;
  [key: string]: string | undefined;
}

const Container = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 150px;
  padding-right: 150px;
  background-color: ${(props) => props.theme.Sky_Blue_04};
`;

const Title = styled.div`
  margin-bottom: 50px;
  color: ${(props) => props.theme.Typo_Black};
`;

const ContentTitle = styled.div`
  margin: 10px 0;
  color: ${(props) => props.theme.Typo_Black};
`;

const Content = styled.div`
  margin-bottom: 20px;
  color: ${(props) => props.theme.Typo_Black};
  line-height: 1.5;
  letter-spacing: 1px;
`;

const TermsPage: React.FC = () => {
  const { id } = useParams<Params>();

  // id 값이 undefined인 경우 처리
  if (!id) {
    return <div>약관 페이지를 찾을 수 없습니다.</div>;
  }

  const termId = parseInt(id, 10);
  const term: TermsProps | undefined = TERMS.find((term) => term.id === termId);

  if (!term) {
    return <div>약관 페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <Title style={FONT.H1}>{term.title}</Title>
      {term.content?.map((contentItem, index) => (
        <div key={index}>
          <ContentTitle style={FONT.M2}>{contentItem.title}</ContentTitle>
          <Content style={FONT.L5}>{contentItem.content}</Content>
        </div>
      ))}
    </Container>
  );
};

export default TermsPage;

