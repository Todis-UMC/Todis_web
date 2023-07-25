import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import { ReactComponent as Search } from '../assets/icon/Search.svg';
import MyProfile from '../component/friend/MyProfile';
import FriendProfile from '../component/friend/FriendProfile';
import FriendInviteButton from '../component/friend/FriendInviteButton';
import FriendSearch from '../component/friend/FriendSearch';

type ToggleBtnProps = {
  expanded: boolean;
};

const Friend = () => {
  // 더보기 토글 버튼
  const [expanded, setExpanded] = useState<boolean>(false);
  const toggleBtnText = expanded ? '접기' : '더보기 +';
  const ToggleHandler = () => {
    setExpanded(!expanded);
  };

  // 친구 검색 모달창 열기
  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      <TitleBox>
        <SubTitle style={FONT.L4}>날씨에 따른</SubTitle>
        <Title style={FONT.H1}>나의 친구는 이렇게 입었어요!</Title>
      </TitleBox>
      <SearchBox onClick={onClickButton}>
        <span>
          <Search />
        </span>
        <SearchInput style={FONT.L3}>친구 검색</SearchInput>
      </SearchBox>
      {isOpen && (
        <FriendSearch
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
      <MainBox>
        <MyProfile name='나' message='...' />
        <FriendProfile name='이름1' message='...' />
        <FriendProfile name='이름2' message='...' />
        <FriendProfile name='이름3' message='...' />
        <FriendProfile name='이름4' message='...' />
        <FriendProfile name='이름5' message='...' />
        <FriendProfile name='이름6' message='...' />
        <FriendProfile name='이름7' message='...' />
        <FriendProfile name='이름8' message='...' />
        {expanded === true ? (
          <>
            <FriendProfile name='이름9' message='...' />
            <FriendProfile name='이름10' message='...' />
            <FriendProfile name='이름11' message='...' />
            <FriendProfile name='이름12' message='...' />
            <FriendProfile name='이름13' message='...' />
          </>
        ) : null}
      </MainBox>
      <ToggleBox>
        <ToggleBtn onClick={ToggleHandler} expanded={expanded} style={FONT.L3}>
          {toggleBtnText}
        </ToggleBtn>
      </ToggleBox>
      <FriendInviteButton />
    </Container>
  );
};
export default Friend;

const Container = styled.div`
  color: ${(props) => props.theme.Black_Main};
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`;
const TitleBox = styled.div`
  width: 500px;
  margin: 0 auto;
  padding-top: 50px;
`;
const SubTitle = styled.div`
  margin-bottom: 10px;
`;
const Title = styled.div``;
const SearchBox = styled.div`
  margin: 50px auto;
  margin-bottom: 80px;
  width: 714px;
  height: 56px;
  border-radius: 49px;
  background-color: #fff;
  border: none;
  padding-bottom: 50px;
  position: relative;
  span {
    position: absolute;
    top: 18px;
    left: 23px;
  }
  cursor: pointer;
`;
const SearchInput = styled.div`
  width: 500px;
  height: 31px;
  border: none;
  position: absolute;
  top: 12px;
  left: 58px;
  text-align: left;
  color: ${(props) => props.theme.Gray_02};
`;
const MainBox = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, 420px);
  grid-gap: 2vw;
  text-align: center;
  justify-content: center;
`;
const ToggleBox = styled.div`
  padding: 70px 0;
`;
const ToggleBtn = styled.button<ToggleBtnProps>`
  color: ${(props) => props.theme.Gray_01};
  background-color: transparent;
  width: 160px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.Gray_01};
  border-radius: 35px;
  cursor: pointer;
`;
