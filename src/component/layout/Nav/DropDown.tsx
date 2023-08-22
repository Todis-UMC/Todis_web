import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineDown } from 'react-icons/ai';
import FONT from '../../../styles/Font';
import { useLocation, useNavigate } from 'react-router-dom';

const Button = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ButtonText = styled.span`
  margin-right: 4px;
`;

const ButtonContainer = styled.div`
  position: relative;
  margin-right: 5.5rem;
  cursor: pointer;
`;

const MenuContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  text-align: center;
  top: 130%;
  right: 0;
  width: 120px;
  height: 77px;
  background-color: white;
  border: none;
  border-radius: 7px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  z-index: 10000;
`;

const MenuItem = styled.div`
  color: black;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e9f0fb;
  }
  a {
    text-decoration: none;

    font-size: inherit;
  }
`;

const DownIcon = styled(AiOutlineDown)`
  color: #437df6;
`;

const DropDownButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <ButtonContainer>
      <Button onClick={handleButtonClick}>
        <ButtonText style={FONT.M3}>{name} 님</ButtonText>
        <DownIcon />
      </Button>
      <MenuContainer isVisible={isVisible}>
        <MenuItem onClick={() => navigate('/user/edit')}>
          회원정보 수정
        </MenuItem>
        <MenuItem onClick={() => logout()}>로그아웃</MenuItem>
      </MenuContainer>
    </ButtonContainer>
  );
};

export default DropDownButton;
