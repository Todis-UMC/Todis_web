import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../../styles/Font';
import { ReactComponent as Logo } from '../../../assets/icon/SmallLogo.svg';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';
import LanguageButton from './LanguageButton';

const LogoContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-left: 5.5rem;
  display: flex;
  justify-content: center;
`;

const NavBarContainer = styled.div`
  padding: 1rem;
  background-color: #f3f6fc;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;

const NavBar = styled.div`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
  flex: 1;
  margin-left: 15rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  margin: 4rem;
  color: ${(props) => props.theme.Black_Main};
`;

const ButtonContainer1 = styled.div`
  margin-right: 5.5rem;
  display: flex;
  align-items: center;
`;

const ButtonSpacer = styled.div`
  margin-right: 0.5rem;
`;

const LanguageButtonContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const Nav: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setActiveLink(location.pathname);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  return (
    <NavBarContainer style={FONT.M3}>
      {!isLoggedIn && (
        <>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <NavBar>
            <NavLink
              to={'/'}
              style={activeLink === '/home' ? { color: '#437df6' } : {}}
            >
              홈
            </NavLink>
            <NavLink
              to={token ? '/mypage' : '/login'}
              style={activeLink === '/mypage' ? { color: '#437df6' } : {}}
            >
              마이페이지
            </NavLink>
            <NavLink
              to={token ? '/friend' : '/login'}
              style={activeLink === '/friend' ? { color: '#437df6' } : {}}
            >
              친구
            </NavLink>
            <NavLink
              to={token ? '/lank' : '/login'}
              style={activeLink === '/lank' ? { color: '#437df6' } : {}}
            >
              더보기
            </NavLink>
          </NavBar>
          <LanguageButtonContainer>
            <LanguageButton />
          </LanguageButtonContainer>
          <ButtonContainer1>
            <SignUpButton />
            <ButtonSpacer />
            <SignInButton />
          </ButtonContainer1>
        </>
      )}
    </NavBarContainer>
  );
};

export default Nav;
