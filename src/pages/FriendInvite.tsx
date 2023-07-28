import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import { ReactComponent as GoBack } from '../assets/icon/GoBack.svg';
import FriendRequestComponent from '../component/friendInvite/FriendRequestComponent';
import FriendRequest from '../component/friendInvite/FriendRequest';

const FriendInvite = () => {
  // 아이디 검색 모달창 열기 & 이메일 유효성 검사
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [id, setId] = useState('');

  const onClickButton = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(id);
    setIsValid(isValidEmail);
    setIsOpen(isValidEmail);
  };
  const saveUserId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    setIsValid(true);
  };

  return (
    <Container>
      <TitleBox>
        <SubTitle style={FONT.L4}>친구 초대</SubTitle>
        <Title style={FONT.H1}>
          <span>친구를 초대해보세요!</span>
          <br />
          <span>더 다양한 코디를 즐길 수 있어요:)</span>
        </Title>
      </TitleBox>
      <MainBox>
        <span id='goBack'>
          <GoBack />
        </span>
        <Profile />
        <MyInfo>
          <table>
            <tbody>
              <tr>
                <td>아이디</td>
                <td>Todis@gmail.com</td>
              </tr>
              <tr>
                <td>닉네임</td>
                <td>TodaySunny</td>
              </tr>
            </tbody>
          </table>
        </MyInfo>
        <IdText>아이디 검색</IdText>
        <IdBox>
          <Id
            type='email'
            value={id}
            onChange={saveUserId}
            placeholder='아이디 입력'
            style={FONT.L5}
          ></Id>
          <Search style={FONT.L5} onClick={onClickButton}>
            검색
          </Search>
        </IdBox>
        {isOpen && (
          <FriendRequest
            name={id}
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
              console.log('close버튼');
            }}
          />
        )}
        <RequestText>받은 친구 요청</RequestText>
        <ListBox>
          <FriendRequestComponent name='김우진' />
          <FriendRequestComponent name='1' />
          <FriendRequestComponent name='2' />
          <FriendRequestComponent name='3' />
          <FriendRequestComponent name='4' />
          <FriendRequestComponent name='5' />
        </ListBox>
        <GradiBottom />
      </MainBox>
    </Container>
  );
};
export default FriendInvite;

const Container = styled.div`
  color: ${(props) => props.theme.Black_Main};
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  padding-bottom: 5em;
`;
const TitleBox = styled.div`
  width: 500px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 30px;
`;
const SubTitle = styled.div`
  margin-bottom: 10px;
`;
const Title = styled.div`
  span {
    padding: 15px;
  }
`;

const MainBox = styled.div`
  background-color: #fff;
  width: 569px;
  height: 683px;
  margin: 0 auto;
  border: none;
  border-radius: 50px;
  position: relative;
  #goBack {
    position: absolute;
    top: 42px;
    left: 49px;
    cursor: pointer;
  }
`;
const Profile = styled.div`
  position: absolute;
  top: 38px;
  left: 225px;
  margin: 0 auto;
  width: 119px;
  height: 119px;
  background-color: ${(props) => props.theme.SkyBlue_03};
  border-radius: 50%;
  border: none;
  /*#edit {
    position: absolute;
    bottom: 3px;
    right: 4px;
    cursor: pointer;
  }*/
`;
const MyInfo = styled.div`
  position: absolute;
  top: 188px;
  left: 65px;
  margin: 0 auto;
  width: 443px;
  height: 94px;
  background-color: ${(props) => props.theme.Gray_04};
  border-radius: 14px;
  border: none;
  text-align: left;
  padding: 10px 30px;
  td {
    padding: 10px;
  }
`;
const IdText = styled.span`
  position: absolute;
  top: 321px;
  left: 68px;
`;
const IdBox = styled.span`
  margin: 0 auto;
  position: absolute;
  top: 353px;
  left: 65px;
`;
const Id = styled.input`
  width: 298px;
  height: 55px;
  background-color: ${(props) => props.theme.Gray_04};
  border: none;
  border-radius: 14px;
  padding: 0 20px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${(props) => props.theme.Gray_02};
  }
`;
const Search = styled.button`
  width: 139px;
  height: 55px;
  color: #fff;
  background-color: ${(props) => props.theme.Gray_03};
  border: none;
  border-radius: 14px;
  margin-left: 6px;
  &:hover {
    background-color: ${(props) => props.theme.Blue_Main};
  }
`;
const RequestText = styled.span`
  position: absolute;
  top: 437px;
  left: 68px;
`;
const ListBox = styled.div`
  width: 437px;
  height: 181px;
  position: absolute;
  top: 486px;
  left: 71px;
  padding-bottom: 35px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    //display: none;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 42%, 0.49);
    border-radius: 100px;
  }
`;
const GradiBottom = styled.div`
  width: 437px;
  height: 96px;
  position: absolute;
  bottom: 0px;
  left: 71px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
`;
