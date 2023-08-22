import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as CloseButton } from '../../../assets/icon/Close.svg';
import Routes from '../../../constants/Route';
import FONT from '../../../styles/Font';
import Button from '../../common/Button';
import { LanguageButton } from './Button';
interface SideMenuProps {
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onClose }) => {
  const token = localStorage.getItem('token');
  const activeLink = window.location.pathname;
  const navigate = useNavigate();
  const [close, setClose] = useState<boolean>(false);
  const handleSlideout = () => {
    setClose(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };
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
  const handleLogin = () => {
    onClose();
    navigate('/login');
  };
  const handleLogout = () => {
    onClose();
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Container>
      <Menu close={close}>
        <Top>
          <div onClick={() => changeLanguage()}>
            <LanguageButton />
          </div>
          <CloseButton onClick={() => handleSlideout()} />
        </Top>
        {!token ? (
          <>
            <Notice style={FONT.L6}>
              로그인 후 다양한 서비스를 이용하세요.
            </Notice>
            <Button height={45} onClick={() => handleLogin()}>
              로그인
            </Button>
          </>
        ) : (
          <div style={{ marginTop: 30 }}>
            <Button height={45} onClick={() => handleLogout()}>
              로그아웃
            </Button>
          </div>
        )}

        <div style={{ marginTop: 40 }}>
          {Routes.map((route, index) => (
            <MenuLink
              onClick={() => {
                token ? navigate(route.path) : navigate('/login');
                onClose();
              }}
              key={index}
              style={activeLink === route.path ? { color: '#437df6' } : {}}
            >
              <div style={FONT.H7}>{route.text}</div>
            </MenuLink>
          ))}
          {token && (
            <MenuLink
              onClick={() => {
                navigate('/user/edit');
                onClose();
              }}
            >
              <div style={FONT.H7}>회원정보 수정</div>
            </MenuLink>
          )}
        </div>
      </Menu>
      <Background
        close={close}
        onClick={() => {
          handleSlideout();
        }}
      />
      <ToastContainer />
    </Container>
  );
};

export default SideMenu;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;
const slideOut = keyframes`
  from {
    transform: translateX(0);
    }
    to {
    transform: translateX(100%);
    }
`;
const fadeIn = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const fadeOut = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0.5);
  }
  to {
    background-color: rgba(0, 0, 0, 0);
  }
`;
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const Menu = styled.div<{ close: boolean }>(
  ({ close }) => css`
    /* 스타일 설정 */
    padding: 0 27px;
    width: 80%;
    max-width: 332px;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1002;
    animation: ${close ? slideOut : slideIn} 0.5s ease-in-out;
  `
);

const Background = styled.div<{ close: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${(props) => (props.close ? fadeOut : fadeIn)} 0.5s ease-in-out;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 67px;
  svg {
    cursor: pointer;
  }
`;

const Notice = styled.div`
  color: ${(props) => props.theme.Black_Main};
  margin-top: 30px;
  margin-bottom: 33px;
`;
const MenuLink = styled.div`
  display: block;
  text-decoration: none;
  color: ${(props) => props.theme.Gray_00};
  width: fit-content;
  padding-right: min(5rem, 10px);
  border-bottom: 0.5px solid ${(props) => props.theme.Gray_02};
  width: 100%;
  padding: 20px 0;
`;
