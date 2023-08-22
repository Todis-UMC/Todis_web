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
    <>
      {/* PC 디자인 */}
      <PC>
        <PcContainer style={FONT.M3}>
          <Logo />
          <NavBar>
            {Routes.map((route, index) => (
              <NavLink
                key={index}
                onClick={() => {
                  token
                    ? (window.location.href = route.path)
                    : window.location.href === '/login';
                }}
                style={activeLink === route.path ? { color: '#437df6' } : {}}
              >
                {route.text}
              </NavLink>
            ))}
          </NavBar>
          <LanguageButtonContainer onClick={() => changeLanguage()}>
            <LanguageButton />
          </LanguageButtonContainer>
          {!token ? <Buttons /> : <DropDown />}
        </PcContainer>{' '}
      </PC>
      {/* 모바일 디자인 */}
      <MobileContainer>
        <Mobile>
          <Logo />
          <MenuBox onClick={() => setMenu(!menu)}>
            <Menu />
          </MenuBox>
        </Mobile>
      </MobileContainer>
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

const MenuBox = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
