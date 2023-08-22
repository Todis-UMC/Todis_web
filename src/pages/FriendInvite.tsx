import React, { ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import FONT from '../styles/Font';
import { ReactComponent as GoBack } from '../assets/icon/GoBack.svg';
import FriendRequestComponent from '../component/friendInvite/FriendRequestComponent';
import FriendRequest from '../component/friendInvite/FriendRequest';
import avatar from '../assets/img/avatar/M_Avatar.png';
import { useMediaQuery } from 'react-responsive';
import { getInfo } from '../api/User';
import { getFriendRequestList } from '../api/FriendInvite';
import { ToastContainer, toast } from 'react-toastify';
import { getUserDetail } from '../api/Friend';

type FriendRequest = {
  request_id: number;
  name: string;
  profileImageUrl: string;
};

const FriendInvite = () => {
  // 회원 정보 API 연동(성공)
  const [profile, setProfile] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const response = await getInfo();
      setEmail(response.data.email);
      setName(response.data.name);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserDetail();
        setProfile(response.data.profileImageUrl);
      } catch (error) {
        console.error('사용자 프로필 이미지 가져오기 오류:', error);
      }
    };
    fetchUserData();
  }, []);

  // 아이디 검색 모달창 열기 & 이메일 유효성 검사
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [id, setId] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  const handleSearchButton = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(id);
    setIsValid(isValidEmail);
    setIsOpen(isValidEmail);
  };
  const saveUserId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    setIsValid(true);
  };

  // 친구 요청 목록 API 연동(성공)
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  useEffect(() => {
    fetchFriendRequestList();
  }, []);

  const fetchFriendRequestList = async () => {
    try {
      const response = await getFriendRequestList();
      setFriendRequests(response.data);
    } catch (error) {
      console.error('친구 요청 오류:', error);
    }
  };

  return (
    <Container>
      <TitleBox>
        <SubTitle style={FONT.L4}>친구 초대</SubTitle>
        <Title style={isMobile ? FONT.H6 : FONT.H1}>
          <span>친구를 초대해보세요!</span>
          <br />
          <span>더 다양한 코디를 즐길 수 있어요:)</span>
        </Title>
      </TitleBox>
      <MainBox>
        <span
          id='goBack'
          onClick={() => {
            window.location.href = '/friend';
          }}
        >
          <GoBack />
        </span>
        <Profile>
          {profile === null ? (
            <img id='avatar' src={avatar} alt='avatar' />
          ) : (
            <img id='mypage' src={profile} alt='profile' />
          )}
        </Profile>
        <MyInfo>
          <table>
            <tbody>
              <tr>
                <td>아이디</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>닉네임</td>
                <td>{name}</td>
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
          <Search style={FONT.L5} onClick={handleSearchButton}>
            검색
          </Search>
        </IdBox>
        {isOpen && (
          <FriendRequest
            friendEmail={id}
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
              setId('');
            }}
          />
        )}
        <RequestText>받은 친구 요청</RequestText>
        <span id='message' style={isMobile ? { ...FONT.L6 } : { ...FONT.L4 }}>
          도착한 친구 요청이 없습니다.
          <br />
          친구를 초대해보세요!
        </span>
        <ListBox>
          {friendRequests.map((request, index) => (
            <FriendRequestComponent
              key={index}
              request_id={request.request_id}
              name={request.name}
              profileImageUrl={request.profileImageUrl}
            />
          ))}
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
  @media (max-width: 500px) {
    width: 90%;
  }
`;
const SubTitle = styled.div`
  margin-bottom: 10px;
`;
const Title = styled.div`
  span {
    padding: 15px;
    line-height: 41.77px;
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
  #message {
    line-height: 20px;
    width: 437px;
    position: absolute;
    top: 486px;
    left: 71px;
    @media (max-width: 500px) {
      line-height: 15px;
      width: 65%;
      top: 550px;
      margin: 0 auto;
    }
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 800px;
    overflow: hidden;
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
  overflow: hidden;
  #avatar {
    position: absolute;
    top: -10px;
    left: -25px;
    height: 290%;
    width: 150%;
    object-fit: cover;
    border-radius: 50%;
  }
  #mypage {
    position: absolute;
    top: -30px;
    left: -30px;
    height: 330%;
    width: 150%;
    object-fit: cover;
    border-radius: 50%;
  }
  @media (max-width: 500px) {
    top: 38px;
    left: 130px;
  }
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
  @media (max-width: 500px) {
    top: 188px;
    left: 35px;
    width: 80%;
  }
`;
const IdText = styled.span`
  position: absolute;
  top: 321px;
  left: 68px;
  @media (max-width: 500px) {
    top: 321px;
    left: 38px;
  }
`;
const IdBox = styled.span`
  margin: 0 auto;
  position: absolute;
  top: 353px;
  left: 65px;
  @media (max-width: 500px) {
    top: 353px;
    left: 35px;
    width: 80%;
  }
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
  @media (max-width: 500px) {
    width: 100%;
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
  @media (max-width: 500px) {
    width: 50%;
    margin-top: 10px;
  }
`;
const RequestText = styled.span`
  position: absolute;
  top: 437px;
  left: 68px;
  @media (max-width: 500px) {
    top: 500px;
    left: 38px;
  }
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
  @media (max-width: 500px) {
    top: 550px;
    left: 38px;
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
  @media (max-width: 500px) {
    width: 100%;
    left: 0;
  }
`;
