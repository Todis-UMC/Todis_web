import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import FriendAccept from './FriendAccept';

const FriendRequestList = ({ name }: { name: string }) => {
  // 모달창 애니메이션
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
      const fadeInTimer = setTimeout(() => {
        setIsShown(false);
        console.log('false');
      }, 2000);
      return () => clearTimeout(fadeInTimer);
    }
  }, [isShown]);

  const handleClick = () => {
    setIsShown(true);
    console.log('true');
  };

  return (
    <Box>
      <Profile></Profile>
      <Name>{name}</Name>
      <No style={FONT.L5}>거절</No>
      <Yes style={FONT.L5} onClick={handleClick}>
        수락
      </Yes>
      <hr />
      {isShown && <FriendAccept name={name} />}
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
  }
`;

const Profile = styled.div`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.SkyBlue_03};
`;

const Name = styled.div`
  width: 42px;
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
`;
