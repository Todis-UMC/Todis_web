import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import avatar from '../../assets/img/avatar/M_Avatar.png';

const FriendProfile = ({
  name,
  message
}: {
  name: string;
  message: string;
}) => {
  return (
    <Box>
      <Avatar>
        <img src={avatar} alt='avatar' height='100%' />
      </Avatar>
      <MessageBox>
        <Name style={FONT.H5}>{name}</Name>
        <Message style={FONT.L5}>{message}</Message>
      </MessageBox>
      <Profile>
        <img src={avatar} alt='avatar-face' />
      </Profile>
    </Box>
  );
};
export default FriendProfile;

const Box = styled.div`
  width: 415px;
  height: 388px;
  border-radius: 47px;
  border: none;
  position: relative;
  @media (max-width: 500px) {
    margin-top: 36px;
  }
`;
const Avatar = styled.div`
  width: 415px;
  height: 274.31px;
  background-color: ${(props) => props.theme.SkyBlue_03};
  border-top-left-radius: 47px;
  border-top-right-radius: 47px;
`;
const Profile = styled.div`
  width: 86px;
  height: 86px;
  background-color: ${(props) => props.theme.BlueBray_01};
  border-radius: 50%;
  position: absolute;
  top: 203px;
  left: 163px;
  overflow: hidden;
  img {
    position: absolute;
    top: -5px;
    left: -18px;
    height: 290%;
    width: 150%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const Name = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
`;
const Message = styled.div`
  cursor: pointer;
`;
const MessageBox = styled.div`
  width: 415px;
  height: 113.69px;
  background-color: #fff;
  border-bottom-left-radius: 47px;
  border-bottom-right-radius: 47px;
  position: absolute;
  top: 274.31px;
`;
