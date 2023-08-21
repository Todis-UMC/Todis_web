import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import { ReactComponent as Search } from '../assets/icon/Search.svg';
import MyProfile from '../component/friend/MyProfile';
import FriendProfile from '../component/friend/FriendProfile';
import FriendInviteButton from '../component/friend/FriendInviteButton';
import FriendSearch from '../component/friend/FriendSearch';
import { getFriendListDetail, getUserDetail } from '../api/Friend';

type ToggleBtnProps = {
  expanded: boolean;
};
type DataItem = {
  id: number;
  name: string;
  profileImageUrl: string | null;
  codyImage: string | null;
  comment: string | null;
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

  // 내 프로필 API 연동
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [cody, setCody] = useState('');
  const [profile, setProfile] = useState('');
  const [comment, setComment] = useState('');
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const response = await getUserDetail();
      setId(response.data.id);
      setName(response.data.name);
      setCody(response.data.codyImage);
      setProfile(response.data.profileImageUrl);
      setComment(response.data.comment);
    } catch (error) {
      console.error('사용자 프로필 가져오기 오류:', error);
    }
  };

  // 친구 프로필 리스트 API 연동
  const [friendList, setFriendList] = useState<DataItem[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getFriendListDetail(10);
      setFriendList(response.data);
    } catch (error) {
      console.error('친구 프로필 목록 가져오기 오류:', error);
    }
  };
  const fiveFriendList = friendList.slice(0, 5); // 처음부터 5개까지 자르기
  const toggleFriendList = friendList.slice(5);

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
        <MyProfile
          key={id}
          name={name}
          profileImageUrl={profile}
          codyImage={cody}
          comment={comment}
        />

        {fiveFriendList.map((request, index) => (
          <FriendProfile
            key={index}
            id={request.id}
            name={request.name}
            profileImageUrl={request.profileImageUrl}
            codyImage={request.codyImage}
            comment={request.comment}
          />
        ))}

        {expanded && (
          <>
            {toggleFriendList.map((request, index) => (
              <FriendProfile
                key={index}
                id={request.id}
                name={request.name}
                profileImageUrl={request.profileImageUrl}
                codyImage={request.codyImage}
                comment={request.comment}
              />
            ))}
          </>
        )}
      </MainBox>
      <ToggleBox>
        <ToggleBtn onClick={ToggleHandler} expanded={expanded} style={FONT.L3}>
          {toggleBtnText}
        </ToggleBtn>
      </ToggleBox>
      <span
        onClick={() => {
          window.location.href = '/friend/invite';
        }}
      >
        <FriendInviteButton />
      </span>
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
