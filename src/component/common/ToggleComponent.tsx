import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';

type ToggleBtnProps = {
  expanded: boolean;
};

export const Toggle = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleBtnText = expanded ? '접기' : '더보기 +';

  const ToggleHandler = () => {
    /* 컴포넌트 개수 조절 */
    setExpanded(!expanded);
  };

  return (
    <>
      <ToggleBtn onClick={ToggleHandler} expanded={expanded} style={FONT.L3}>
        {toggleBtnText}
      </ToggleBtn>
    </>
  );
};

export default Toggle;

const ToggleBtn = styled.button<ToggleBtnProps>`
  color: ${(props) => props.theme.Gray_01};
  background-color: transparent;
  width: 160px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.Gray_01};
  border-radius: 35px;
  cursor: pointer;
`;
