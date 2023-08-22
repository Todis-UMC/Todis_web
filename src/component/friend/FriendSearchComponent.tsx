import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import FriendDelete from './FriendDelete';
import avatar from '../../assets/img/avatar/M_Avatar.png';

const FriendSearchComponent = ({
  name,
  email,
  profileImageUrl,
  onFriendRefresh
}: {
  name: string;
  email: string;
  profileImageUrl: string;
  onFriendRefresh: (keyword: string) => void;
}) => {
  // 친구 삭제 모달창 열기
  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
    setIsOpen(true);
  };

  return (
    <Box>
      <Profile>
        {profileImageUrl === null ? (
          <img src={avatar} alt='avatar-profile' />
        ) : (
          <img src={profileImageUrl} alt='profile' />
        )}
      </Profile>
      <Name>{name}</Name>
      <Delete style={FONT.L5} onClick={onClickButton}>
        삭제
      </Delete>
      <hr />
      {isOpen && (
        <FriendDelete
          name={name}
          friend_email={email}
          open={isOpen}
          profileImageUrl={profileImageUrl}
          onFriendRefresh={onFriendRefresh}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </Box>
  );
};
export default FriendSearchComponent;

const Box = styled.div`
  margin: 0px auto;
  margin-bottom: 36px;
  margin-top: 25px;
  color: ${(props) => props.theme.Black_Main};
  width: 430px;
  height: 39px;
  background-color: #fff;
  position: relative;
  justify-content: center;
  align-items: center;
  hr {
    height: 0.5px;
    border: 0;
    background: ${(props) => props.theme.Gray_02};
    margin: 18px 0px;
  }
  @media (max-width: 500px) {
    max-width: 400px;
    width: 80%;
    height: 30px;
  }
`;
const Profile = styled.div`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.SkyBlue_03};
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    top: -3px;
    left: -8px;
    height: 300%;
    width: 150%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const Name = styled.div`
  width: fit-content;
  height: 19px;
  position: absolute;
  top: 11px;
  left: 53px;
`;
const Delete = styled.button`
  width: 91px;
  height: 37px;
  position: absolute;
  top: 0px;
  left: 339px;
  background-color: ${(props) => props.theme.Blue_Main};
  border-radius: 14px;
  border: none;
  color: #fff;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 40px;
    height: 30px;
    top: 10px;
    left: 150px;
  }
`;
