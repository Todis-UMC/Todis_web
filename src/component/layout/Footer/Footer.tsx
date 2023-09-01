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
  height: 30vh;
`;

const Message = styled.div`
  color: #868686;
  margin-bottom: 40px;
`;

const Copyright = styled.div`
  color: #181818;
  margin-bottom: 10px;
`;

const FooterWrapper = styled.div`
  flex: 1;
`;

const Footer: React.FC = () => {
  const token = localStorage.getItem('token');
  return (
    <FooterContainer>
      <FooterWrapper>
        <div className='inner' style={FONT.L6}>
          <Message>
            {!token ? (
              <span
                onClick={() => {
                  window.location.href = '/login';
                }}
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                로그인
              </span>
            ) : (
              <span
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/';
                }}
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                로그아웃
              </span>
            )}
            {' | '}
            <Link
              to='/signup'
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              회원가입
            </Link>
            {' | '}
            <Link
              to='/terms/0'
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              이용약관
            </Link>
            {' | '}
            <Link
              to='/terms/1'
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              개인정보처리방침
            </Link>
            {' | @TODIS Corp.'}
          </Message>
          <Copyright>저작권 ⓒ Todis. All rights reserved</Copyright>
        </div>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
