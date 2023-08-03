import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FONT from '../../../styles/Font';

const FooterContainer = styled.footer`
  background-color: white;
  padding: 80px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 38vh;
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

const FooterWrapper = styled.div`
  flex: 1;
`;


const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
      <div className="inner" style={FONT.L6}>
        <Message>
          <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
            로그인
          </Link>
          {' | '}
          <Link to="/signupbefore" style={{ color: 'inherit', textDecoration: 'none' }}>
            회원가입
          </Link>
          {' | '}
          <Link to="/terms/0" style={{ color: 'inherit', textDecoration: 'none' }}>
              이용약관
            </Link>
            {' | '}
            <Link to="/terms/1" style={{ color: 'inherit', textDecoration: 'none' }}>
              개인정보처리방침
            </Link>
            {' | 고객센터 | @TODIS Corp.'}
        </Message>
        <Copyright>저작권 ⓒ Todis. All rights reserved</Copyright>
        <Number>사업자 등록 번호 : 123-12-12345  대표전화 : 1234-5678  팩스 : 02-123-4567</Number>
        <Information>대표자 : 김이름  대표메일 : Todayis@weather.co.kr  서울특별시 도봉구 삼양로 144길 33 TODIS 2023, 1234</Information>
      </div>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;