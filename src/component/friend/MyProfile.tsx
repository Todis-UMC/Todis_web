import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as ProfilePlus } from '../../assets/icon/ProfilePlus.svg';
import MyMessage from './MyMessage';
import avatar from '../../assets/img/avatar/M_Avatar.png';

interface DataItem {
  name: string;
  profileImageUrl: string | null;
  codyImage: string | null;
  comment: string | null;
}

const MyProfile = ({ name, codyImage, profileImageUrl, comment }: DataItem) => {
  // 글쓰기 모달창 열기
  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
    setIsOpen(true);
  };

  return (
    <Box>
      <Avatar>
        {codyImage === null ? (
          <img id='avatar' src={avatar} alt='avatar' height='100%' />
        ) : (
          <img id='mypage' src={codyImage} alt='mypage-avatar' height='109%' />
        )}
      </Avatar>
      <MessageBox>
        <Name style={FONT.H5}>{name}</Name>
        <Message style={FONT.L5}>{comment}</Message>
      </MessageBox>
      <ProfileLine />
      <Profile>
        {profileImageUrl === null ? (
          <img id='avatar' src={avatar} alt='avatar-profile' />
        ) : (
          <img id='mypage' src={profileImageUrl} alt='mypage-profile' />
        )}
      </Profile>
      <ProfileCircle />
      <ProfileBlueCircle onClick={onClickButton}>
        <span id='plus'>
          <ProfilePlus />
        </span>
      </ProfileBlueCircle>
      {isOpen && (
        <MyMessage
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            console.log('close버튼');
          }}
        />
      )}{' '}
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
const Avatar = styled.div`
  width: 415px;
  height: 274.31px;
  background-color: ${(props) => props.theme.SkyBlue_03};
  border-top-left-radius: 47px;
  border-top-right-radius: 47px;
  overflow: hidden;
  #mypage {
    top: -20px;
  }
`;
const ProfileLine = styled.div`
  width: 96px;
  height: 96px;
  border: 2px solid ${(props) => props.theme.Blue_Gradient_02};
  border-radius: 50%;
  position: absolute;
  top: 198px;
  left: 158px;
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
