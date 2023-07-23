import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import FriendDelete from './FriendDelete';

const FriendSearchComponent = ({ name }: { name: string }) => {
  // 친구 삭제 모달창 열기
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(!modal);
  };

  return (
    <Box>
      <Profile></Profile>
      <Name>{name}</Name>
      <Delete style={FONT.L5} onClick={openModal}>
        삭제
      </Delete>
      <hr />
      {modal === true ? <FriendDelete name={name} /> : null}
    </Box>
  );
};
export default FriendSearchComponent;

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
`;
