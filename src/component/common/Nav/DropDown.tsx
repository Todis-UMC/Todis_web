import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineDown } from 'react-icons/ai';
import FONT from '../../../styles/Font';
import { Link, useLocation } from 'react-router-dom';

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

const MenuItem = styled.div<{ active: boolean }>`
  color: black;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e9f0fb;
  }
  a {
    text-decoration: none;
    color: ${(props) => (props.active ? '#437df6' : 'inherit')};
    font-size: inherit;
  }
`;

const DownIcon = styled(AiOutlineDown)`
  color: #437df6;
`;

const DropDownButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();
  
    const items = ['회원정보 수정', '로그아웃'];
  
    const handleButtonClick = () => {
      setIsVisible(!isVisible);
    };
  
    return (
      <ButtonContainer>
        <Button onClick={handleButtonClick}>
          <ButtonText style={FONT.M3}>김이름 님</ButtonText>
          <DownIcon />
        </Button>
        <MenuContainer isVisible={isVisible}>
          {items.map((item, index) => (
            <MenuItem key={index}
            active={location.pathname === (item === '회원정보 수정' ? '/user/edit' : '/main')}>
              <Link to={item === '회원정보 수정' ? '/user/edit' : '/main'}>{item}</Link>
            </MenuItem>
          ))}
        </MenuContainer>
      </ButtonContainer>
    );
  };
  
  export default DropDownButton;