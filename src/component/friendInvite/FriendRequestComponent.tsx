import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import FriendAccept from './FriendAccept';
import avatar from '../../assets/img/avatar/M_Avatar.png';
import { deleteFriendDelete, putFriendAccept } from '../../api/FriendInvite';

const FriendRequestList = ({
  request_id,
  name,
  profileImageUrl
}: {
  request_id: number;
  name: string;
  profileImageUrl: string;
}) => {
  // 모달창 애니메이션
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    if (isShown) {
      const fadeInTimer = setTimeout(() => {
        setIsShown(false);
        console.log('false');
        window.location.reload(); // 새로고침 실행
      }, 2000);
      return () => clearTimeout(fadeInTimer);
    }
  }, [isShown]);

  const handleAcceptModal = () => {
    setIsShown(true);
    console.log('true');
  };

  // 친구 수락 API 연동(성공)
  const handleFriendYes = async () => {
    try {
      const response = await putFriendAccept(request_id);
      if (response.success) {
        console.log('친구 수락 성공:', response.message);
        handleAcceptModal();
      } else {
        console.error('친구 수락 실패:', response.message);
      }
    } catch (error) {
      console.error('친구 수락 오류:', error);
    }
  };

  // 친구 거절 API 연동(성공)
  const handleFriendNo = async () => {
    try {
      const response = await deleteFriendDelete(request_id);
      if (response.success) {
        console.log('친구 요청 거절 성공:', response.message);
      } else {
        console.error('친구 요청 거절 실패:', response.message);
      }
    } catch (error) {
      console.error('친구 요청 거절 오류:', error);
    }
    window.location.reload(); // 새로고침 실행
  };

  return (
    <Box>
      <Profile>
        {profileImageUrl === null ? (
          <img id='avatar' src={avatar} />
        ) : (
          <img id='mypage' src={profileImageUrl} />
        )}
      </Profile>
      <Name>{name}</Name>
      <No style={FONT.L5} onClick={handleFriendNo}>
        거절
      </No>
      <Yes style={FONT.L5} onClick={handleFriendYes}>
        수락
      </Yes>
      <hr />
      {isShown && (
        <FriendAccept name={name} profileImageUrl={profileImageUrl} />
      )}
    </Box>
  );
};
export default FriendRequestList;
const Box = styled.div`
  margin: 0px auto;
  margin-bottom: 36px;
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
    @media (max-width: 500px) {
      width: 70%;
    }
  }
  @media (max-width: 500px) {
    max-width: 400px;
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
  #avatar {
    position: absolute;
    top: -5px;
    left: -8.5px;
    height: 320%;
    width: 150%;
    object-fit: cover;
    border: 1px solid #111;
  }
  #mypage {
    position: absolute;
    top: -12px;
    left: -10.5px;
    height: 350%;
    width: 150%;
    object-fit: cover;
    border: 1px solid #111;
  }
`;

const Name = styled.div`
  text-align: left;
  width: 150px;
  height: 19px;
  position: absolute;
  top: 11px;
  left: 53px;
`;
const No = styled.button`
  width: 91px;
  height: 37px;
  position: absolute;
  top: 0px;
  left: 240px;
  background-color: #fff;
  color: ${(props) => props.theme.Blue_Main};
  border-radius: 14px;
  border: 1px solid ${(props) => props.theme.Blue_Main};
  cursor: pointer;
  @media (max-width: 500px) {
    width: 60px;
    height: 30px;
    left: 150px;
  }
`;
const Yes = styled.button`
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
    width: 60px;
    height: 30px;
    left: 220px;
  }
`;
