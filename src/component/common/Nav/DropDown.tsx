import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineDown } from 'react-icons/ai';
import FONT from '../../../styles/Font';
import { Link } from 'react-router-dom';

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
  top: 100%;
  right: 0;
  width: 120px; /* 가로 크기 조정 */
  height: 69.5px; /* 세로 크기 조정 */
  background-color: white;
  border: none;
  border-radius: 7px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

const MenuItem = styled.div`
  color: black;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e9f0fb;
    
  }
`;

const DownIcon = styled(AiOutlineDown)`
  color: #437df6;
`;

const DropDownButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
  
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
            <MenuItem key={index}>
              <Link to={item === '회원정보 수정' ? '/MyPage' : '/Main'}>{item}</Link>
            </MenuItem>
          ))}
        </MenuContainer>
      </ButtonContainer>
    );
  };
  
  export default DropDownButton;