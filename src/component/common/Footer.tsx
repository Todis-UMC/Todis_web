import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import FONT from '../../styles/Font';

const FooterContainer = styled.footer`
  background-color: white;
  padding: 80px;
  text-align: center;
`;

const Message = styled.div`
  color: #868686;
  margin-bottom: 40px;
`;

const Copyright = styled.div`
  color: #181818;
  margin-bottom: 10px;
`;

const Number = styled.div`
  color: #181818;
  margin-bottom: 10px;
`;

const Information = styled.div`
  color: #181818;
  margin-bottom: 10px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div className="inner" style={FONT.L6}>
        <Message>로그인 | 회원가입 | 이용안내 | 개인정보처리방침 | 고객센터 | @TODIS Corp.</Message>
        <Copyright>Copyright ⓒ Todis. All rights reserved</Copyright>
        <Number>사업자 등록 번호 : 123-12-12345  대표전화 : 1234-5678  팩스 : 02-123-4567</Number>
        <Information>대표자 : 김이름  대표메일 : Todayis@weather.co.kr  서울특별시 도봉구 삼양로 144길 33 TODIS 2023, 1234</Information>
      </div>
    </FooterContainer>
  );
};

export default Footer;