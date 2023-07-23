import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../..//styles/Font';

const FriendInviteButton = () => {
  return <Button style={FONT.L4}>친구 초대하기</Button>;
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
`;
