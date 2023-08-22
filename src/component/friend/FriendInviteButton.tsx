import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../..//styles/Font';
import { useMediaQuery } from 'react-responsive';

const FriendInviteButton = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  return (
    <Button style={isMobile ? { ...FONT.L5 } : { ...FONT.L4 }}>
      친구 초대하기
    </Button>
  );
};
export default FriendInviteButton;

const Button = styled.button`
  background-color: ${(props) => props.theme.Blue_Main};
  display: inline-block;
  width: 241px;
  height: 53px;
  border-radius: 36px;
  position: fixed;
  bottom: 50px;
  right: 70px;
  color: #fff;
  border: none;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 160px;
    height: 50px;
    bottom: 50px;
    position: sticky;
    margin-bottom: 50px;
  }
`;
