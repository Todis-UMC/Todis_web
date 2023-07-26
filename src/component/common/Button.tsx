import React from 'react';
import Color from '../../styles/Color';
import styled from 'styled-components';
import FONT from '../../styles/Font';

interface ButtonProps {
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    fontWeight?: number;
}

const Button = styled.button<ButtonProps>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 55px;
    background-color: ${(props) => props.backgroundColor || Color.Blue_Main};
    color: ${(props) => props.textColor || Color.Typo_Black};
    font-size: ${(props) => props.fontSize || FONT.M1.fontSize};
    font-weight: ${(props) => props.fontWeight || FONT.M1.fontWeight};
    line-height: ${FONT.M1.lineHeight};
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

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
