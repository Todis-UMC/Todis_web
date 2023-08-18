import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface SideMenuProps {
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onClose }) => {
  const [close, setClose] = useState<boolean>(false);
  const handleSlideout = () => {
    setClose(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <Container>
      <Menu close={close}></Menu>
      <Background
        close={close}
        onClick={() => {
          handleSlideout();
        }}
      />
    </Container>
  );
};
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
`;

const Menu = styled.div<{ close: boolean }>`
  width: 80%;
  max-width: 332px;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 300;
  animation: ${(props) => (props.close ? slideOut : slideIn)} 0.5s ease-in-out;
`;

const Background = styled.div<{ close: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${(props) => (props.close ? fadeOut : fadeIn)} 0.5s ease-in-out;
`;

export default SideMenu;
