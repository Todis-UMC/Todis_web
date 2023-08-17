import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../../styles/Font';
import { ReactComponent as Logo } from '../../../assets/icon/SmallLogo.svg';
import DropDown from './DropDown'
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
  margin-left: 5.6rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  margin: 4rem;
  color: ${(props) => props.theme.Black_Main};
`;

const DropDownContainer = styled.div`
margin-top: 4rem;
margin-bottom: 4rem;
margin-right: 5.5rem;
display: flex;
justify-content: center;
cursor: pointer;
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

  useEffect(() => {
    setActiveLink(location.pathname);

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

  }, [location.pathname]);

  return (
    <NavBarContainer style={FONT.M3}>
      {isLoggedIn && (
      <>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <NavBar>
        <NavLink to={'/Home'} style={activeLink === '/Home' ? { color: '#437df6' } : {}}>
          홈
        </NavLink>
        <NavLink to={'/MyPage'} style={activeLink === '/MyPage' ? { color: '#437df6' } : {}}>
          마이페이지
        </NavLink>
        <NavLink to={'/Friend'} style={activeLink === '/Friend' ? { color: '#437df6' } : {}}>
          친구
        </NavLink>
        <NavLink to={'/Lank'} style={activeLink === '/Lank' ? { color: '#437df6' } : {}}>
          더보기
        </NavLink>
      </NavBar>
      <LanguageButtonContainer>
        <LanguageButton />
      </LanguageButtonContainer>
      <DropDownContainer>
        <DropDown />
      </DropDownContainer>
      </>
      )}
    </NavBarContainer>
  );
};

export default Nav;