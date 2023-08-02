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
  padding: 150px;
  color: ${(props) => props.theme.Gray_Main};
`;

const Title = styled.div`
  margin-bottom: 10px;
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
      <Title style={FONT.H0}>{term.title}</Title>
      {term.content?.map((contentItem, index) => (
        <div key={index}>
          <ContentTitle style={FONT.H0}>{contentItem.title}</ContentTitle>
          <Content style={FONT.M3}>{contentItem.content}</Content>
        </div>
      ))}
    </Container>
  );
};

export default TermsPage;

