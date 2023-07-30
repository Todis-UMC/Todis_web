import React from 'react';
import styled from 'styled-components';
import Color from '../../styles/Color';
import FONT from '../../styles/Font';

interface ButtonProps {
    backgroundColor?: string;
    font?: typeof FONT[keyof typeof FONT];
}

const Button = styled.button<ButtonProps>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 55px;
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
        background-color: ${Color.Gray_02};
        color: ${Color.Gray_01};
        cursor: not-allowed;
    }
`;

export default Button;
