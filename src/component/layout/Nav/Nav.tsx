import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../../styles/Font';
import { ReactComponent as Logo } from '../../../assets/icon/SmallLogo.svg';
import DropDown from './DropDown';
import Buttons, { SignUpButton, SignInButton, LanguageButton } from './Button';
import { toast, ToastContainer } from 'react-toastify';
import { Mobile, PC } from '../../common/Responsive';
import { ReactComponent as Menu } from '../../../assets/icon/Hamburger.svg';
import Routes from '../../../constants/Route';
import SideMenu from './SideMenu';

const Nav: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>('');
  const [menu, setMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const changeLanguage = () => {
    toast('열심히 개발중인 기능입니다!', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true,
      pauseOnHover: false,
      progress: undefined,
      className: 'custom-toast'
    });
  };
  return (
    <NavBarContainer style={FONT.M3}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <NavBar>
        <NavLink
          to={token ? '/home' : '/login'}
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
      <LanguageButtonContainer onClick={() => changeLanguage()}>
        <LanguageButton />
      </LanguageButtonContainer>
      {!token ? (
        <ButtonContainer1>
          <SignUpButton />
          <ButtonSpacer />
          <SignInButton />
        </ButtonContainer1>
      ) : (
        <DropDownContainer>
          <DropDown />
        </DropDownContainer>
      )}
      <ToastContainer />
      {menu && <SideMenu onClose={() => setMenu(false)} />}
    </>
  );
};

export default Nav;

const PcContainer = styled.div`
  margin-bottom: -50px;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  display: flex;
  justify-content: space-between;
  align-items: center;
  > svg {
    margin-top: 4rem;
    margin-bottom: 4rem;
    margin-left: 5.5rem;
    display: flex;
    justify-content: center;
  }
`;

const MobileContainer = styled.div`
  padding: 2rem 1.5rem;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  display: flex;
  justify-content: space-between;
  align-items: center;
  > svg {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NavBar = styled.div`
  max-width: 800px;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
  flex: 1;
  margin-left: 5rem;
  padding: 0 6rem;
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled.div`
  text-decoration: none;
  color: ${(props) => props.theme.Black_Main};
  width: fit-content;
  padding-right: min(5rem, 10px);
`;

const LanguageButtonContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
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
