import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: block;
  padding: 6px 10px;
  color: #fff;
  font-size: 18px;
  border-radius: 3px;
  background-color: crimson;
  border: 0;
 
	&:hover {
    background-color: teal;
  }
`;

interface ButtonProps {
  children: ReactNode;
}

function Button({ children, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;