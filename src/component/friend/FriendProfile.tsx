import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import avatar from '../../assets/img/avatar/M_Avatar.png';

interface DataItem {
  name: string;
  id: number;
  profileImageUrl: string | null;
  codyImage: string | null;
  comment: string | null;
}

const FriendProfile = ({
  name,
  id,
  codyImage,
  profileImageUrl,
  comment
}: DataItem) => {
  return (
    <Box>
      <Avatar>
        {codyImage === null ? (
          <img src={avatar} alt='avatar' height='100%' />
        ) : (
          <img src={codyImage} alt='mypage-avatar' height='109%' />
        )}
      </Avatar>
      <MessageBox>
        <Name style={FONT.H5}>{name}</Name>
        <Message style={FONT.L5}>{comment}</Message>
      </MessageBox>
      <Profile>
        {profileImageUrl === null ? (
          <img id='avatar' src={avatar} alt='avatar-profile' />
        ) : (
          <img id='mypage' src={profileImageUrl} alt='mypage-profile' />
        )}
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
  overflow: hidden;
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
  #mypage {
    position: absolute;
    top: -20px;
    left: -22px;
    height: 330%;
    width: 150%;
    object-fit: cover;
  }
  #avatar {
    position: absolute;
    top: -5px;
    left: -18px;
    height: 290%;
    width: 150%;
    object-fit: cover;
    border-radius: 50%;
  }
  @media (max-width: 500px) {
    #mypage{
      height: 350%;
      width: 320%;
      top: -10px;
      left: -4px;
    }
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
