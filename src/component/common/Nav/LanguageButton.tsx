import React from 'react';
import styled from 'styled-components';
import FONT from '../../../styles/Font';
import { AiOutlineDown } from 'react-icons/ai';

const Button = styled.button`
    display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e6e6e6; /* 테두리 스타일 및 색상 */
  background-color: transparent; /* 투명한 배경색 */
  border-radius: 30px; /* 테두리의 모서리를 둥글게 만듦 */
  padding: 5px 10px; /* 버튼 안의 내용과 테두리 사이 간격 */
  color: #437df6;
  cursor: pointer; /* 커서를 손가락 모양으로 변경하여 버튼임을 나타냄 */
`;

const DownIcon = styled(AiOutlineDown)`
  color: #437df6;
  margin-left: 5px;
`;

const LanguageButton: React.FC = () => {
  return <Button style={FONT.M3}>KR
    <DownIcon />
  </Button>;
};

export default LanguageButton;
