import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as ProfilePlus } from '../../assets/icon/ProfilePlus.svg';

const MyProfile = ({ name, message }: { name: string; message: string }) => {
  return (
    <Box>
      <Abatar></Abatar>
      <MessageBox>
        <Name style={FONT.H5}>{name}</Name>
        <Message style={FONT.L5}>{message}</Message>
      </MessageBox>
      <ProfileLine />
      <Profile />
      <ProfileCircle />
      <ProfileBlueCircle>
        <span id='plus'>
          <ProfilePlus />
        </span>
      </ProfileBlueCircle>
    </Box>
  );
};
export default MyProfile;
const Box = styled.div`
  width: 415px;
  height: 388px;
  border-radius: 47px;
  border: none;
  position: relative;
`;
const Abatar = styled.div`
  width: 415px;
  height: 274.31px;
  background-color: ${(props) => props.theme.SkyBlue_03};
  border-top-left-radius: 47px;
  border-top-right-radius: 47px;
`;
const ProfileLine = styled.div`
  width: 96px;
  height: 96px;
  border: 2px solid ${(props) => props.theme.Blue_Gradient_02};
  border-radius: 50%;
  position: absolute;
  top: 198px;
  left: 160px;
`;
const Profile = styled.div`
  width: 86px;
  height: 86px;
  background-color: ${(props) => props.theme.BlueBray_01};
  border-radius: 50%;
  position: absolute;
  top: 203px;
  left: 165px;
`;
const ProfileCircle = styled.div`
  width: 22px;
  height: 22px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 272px;
  left: 227px;
`;
const ProfileBlueCircle = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.theme.Blue_Main};
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 275px;
  left: 230px;
  #plus {
    top: 278px;
    left: 240px;
  }
  cursor: pointer;
`;
const Name = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
`;
const Message = styled.div``;
const MessageBox = styled.div`
  width: 415px;
  height: 113.69px;
  background-color: #fff;
  border-bottom-left-radius: 47px;
  border-bottom-right-radius: 47px;
  position: absolute;
  top: 274.31px;
`;
