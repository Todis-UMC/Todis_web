import React from 'react';
import styled from 'styled-components';
import Color from '../../styles/Color';
import FONT from '../../styles/Font';

interface ButtonProps {
  backgroundColor?: string;
  font?: (typeof FONT)[keyof typeof FONT];
  disabled?: boolean;
  width?: number;
  height?: number;
}

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width + 'px' : '100%')};
  height: ${(props) => props.height || 55}px;
  background-color: ${(props) => props.backgroundColor || Color.Blue_Main};
  color: ${Color.Typo_White};
  font-size: ${(props) => props.font?.fontSize || FONT.H7.fontSize};
  font-weight: ${(props) => props.font?.fontWeight || FONT.H7.fontWeight};
  line-height: ${(props) => props.font?.lineHeight || FONT.H7.lineHeight};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 14px;

  &:hover {
    background-color: ${(props) => props.backgroundColor || Color.SkyBlue_01};
  }

  &:active {
    background-color: ${(props) => props.backgroundColor || Color.SkyBlue_02};
  }

  &:disabled {
    background-color: ${Color.Gray_03};
    color: #fff;
    cursor: not-allowed;
  }
`;

export default Button;
