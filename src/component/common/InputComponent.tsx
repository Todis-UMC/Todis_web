import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as EyeClosed } from '../../assets/icon/EyeClosed.svg';
import { ReactComponent as EyeClosedBlue } from '../../assets/icon/EyeClosedBlue.svg';

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type InputValue = string | number | ReadonlyArray<string>;
interface InputProps {
  placeholder?: string;
  label?: string;
  minLength?: number;
  type: string;
  value?: InputValue;
  onChange?: (ev: InputChangeEvent) => void;
}

export const Input = ({
  placeholder = '',
  label = '',
  minLength = 0,
  type = '',
  value = '',
  onChange
}: InputProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<InputValue>(value);

  const changeHandler = (ev: InputChangeEvent) => {
    setInputValue(ev.target.value);
    onChange && onChange(ev);
  };

  return (
    <>
      <Title style={FONT.H7}>{label}</Title>
      <InputBox>
        <StyledInput
          type={type == 'password' ? (show ? 'text' : 'password') : type}
          style={FONT.L5}
          value={value}
          onChange={changeHandler}
          placeholder={placeholder}
          minLength={minLength}
        />
        {type == 'password' ? (
          <Secret onClick={() => setShow(!show)}>
            {show ? <EyeClosed /> : <EyeClosedBlue />}
          </Secret>
        ) : (
          <></>
        )}
      </InputBox>
    </>
  );
};

export default Input;

const Title = styled.div`
  color: ${(props) => props.theme.Black_Main};
  margin-bottom: 12px;
  padding-left: 3px;
`;
const InputBox = styled.div`
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 14px;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.Black_Main};
  background-color: ${(props) => props.theme.Gray_04};
`;
const StyledInput = styled.input`
  width: 90%;
  height: 100%;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: cursor;
  }
  &::placeholder {
    color: ${(props) => props.theme.Gray_2};
  }
`;
const Secret = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
