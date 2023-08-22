import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as GoBack } from '../../assets/icon/GoBack.svg';
import { ReactComponent as Search } from '../../assets/icon/Search.svg';
import FriendSearchComponent from './FriendSearchComponent';
import ModalContainer from './modal/ModalContainer';
import useOutSideClick from './modal/useOutSideClick';
import { getFriendList, getFriendList2 } from '../../api/Friend';
import { useMediaQuery } from 'react-responsive';


interface ModalProps {
  open: boolean;
  onClose: () => void;
}

type FriendSearch = {
  count: number;
  friendList: FriendSearchResult;
};
type FriendSearchResult = {
  name: string;
  email: string;
  profileImageUrl: string;
};

const FriendSearch = ({ onClose }: ModalProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  // 친구 검색 모달창 닫기
  const handleClose = () => {
    onClose?.();
  };
  // 모달창 외부 클릭시 닫기
  const modalRef = useRef<HTMLDivElement>(null);
  useOutSideClick(modalRef, handleClose);
  // 모달창 열렸을 때 외부 스크롤 막기
  useEffect(() => {
    const $body = document.querySelector('body') as HTMLBodyElement;
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  // 친구 검색 API 연동(성공)
  const [friendCount, setFriendCount] = useState<number>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<FriendSearchResult[]>([]);

  /** 초기 친구 목록  */
  useEffect(() => {
    const keyword = null;
    const fetchData = async (keyword: string | null) => {
      try {
        const response = await getFriendList2(keyword);
        if (response.success) {
          console.log('초기 친구 검색 성공:', response.message);
          setSearchResults(response.data.friendList); // 검색 결과 설정
          setFriendCount(response.data.count);
        } else {
          console.error('초기 친구 검색 실패:', response.message);
        }
      } catch (error) {
        console.error('초기 친구 검색 오류:', error);
      }
    };
    fetchData(keyword);
  }, []);
  /** keyword 입력받을 때 */
  const handleSearch = async (keyword: string) => {
    try {
      const response = await getFriendList(keyword);
      if (response.success) {
        console.log('친구 검색 성공:', response.message);
        setSearchResults(response.data.friendList); // 검색 결과 설정
        setFriendCount(response.data.count);
      } else {
        console.error('친구 검색 실패:', response.message);
      }
    } catch (error) {
      // keyword == '' 일 때
      const response = await getFriendList2(keyword);
      if (response.success) {
        console.log('초기 친구 검색 성공:', response.message);
        setSearchResults(response.data.friendList); // 검색 결과 설정
        setFriendCount(response.data.count);
      } else {
        console.error('초기 친구 검색 실패:', response.message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    handleSearch(keyword); // 입력값 변경 시 검색 요청 실행
  };

  /** 친구 삭제 후 친구 목록 초기화 */
  const handleFriendRefresh = async (keyword: string) => {
    try {
      const response = await getFriendList2(keyword);
      if (response.success) {
        console.log('친구 검색 목록 초기화 성공:', response.message);
        setSearchResults(response.data.friendList); // 검색 결과 설정
        setFriendCount(response.data.count);
      } else {
        console.error('친구 검색 목록 초기화 실패:', response.message);
      }
    } catch (error) {
      console.error('친구 검색 목록 초기화 오류:', error);
    }
  };

  return (
    <ModalContainer>
      <Container className='container'>
        <Box ref={modalRef}>
          <SearchBox>
            <FriendSearchBox style={FONT.M2} />
            <SearchInput
              style={FONT.L3}
              placeholder='친구 검색...'
              color='${(props) => props.theme.Gray_02}'
              value={searchKeyword}
              onChange={handleInputChange}
            />
            <span id='search'>
              <Search />
            </span>
            <span id='goBack' onClick={handleClose}>
              {!isMobile && <GoBack />}
            </span>
          </SearchBox>
          <span id='friends' style={FONT.M3}>
            전체 친구 : {friendCount}명
          </span>
          <GradientTop />
          <ListBox>
            {searchResults.map((request, index) => (
              <FriendSearchComponent
                key={index}
                name={request.name}
                email={request.email}
                profileImageUrl={request.profileImageUrl}
                onFriendRefresh={handleFriendRefresh}
              />
            ))}
          </ListBox>
          <GradientBottom />
        </Box>
      </Container>
    </ModalContainer>
  );
};
export default FriendSearch;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  border: none;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
`;
const Box = styled.div`
  background-color: #fff;
  width: 683px;
  height: 589px;
  border-radius: 47px;
  border: none;
  justify-content: center;
  text-align: center;
  padding: 30px 40px;
  z-index: 999;
  position: relative;
  #search {
    position: absolute;
    top: 60px;
    left: 153px;
  }
  #goBack {
    cursor: pointer;
    position: absolute;
    top: 55px;
    left: 45px;
  }
  #friends {
    color: ${(props) => props.theme.Blue_Main};
    position: absolute;
    top: 105px;
    left: 461px;
  }
  @media (max-width: 500px) {
    width: 80%;
    height: 80%;
    #search {
      top: 40px;
      left: 80%;
    }
    #friends {
      left: 60%;
    }
`;
const FriendSearchBox = styled.div`
  width: 456px;
  height: 46px;
  border: none;
  border-radius: 49px;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  position: absolute;
  top: 45px;
  left: 113px;
  text-align: left;
  &:focus {
    outline: 3px solid ${(props) => props.theme.Blue_Main};
  }
  @media (max-width: 500px) {
    width: 80%;
    top: 30px;
    left: 40px;
  }
`;
const SearchInput = styled.input`
  width: 350px;
  height: 25px;
  border: none;
  border-radius: 49px;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  position: absolute;
  top: 58px;
  left: 185px;
  text-align: left;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.Gray_02};
  }
  @media (max-width: 500px) {
    width: 60%;
    height: 45px;
    top: 30px;
    left: 40px;
    padding-left: 10px;
  }
`;
const SearchBox = styled.div``;
const ListBox = styled.div`
  width: 437px;
  height: 412px;
  position: absolute;
  top: 141px;
  left: 123px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    //display: none;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 42%, 0.49);
    border-radius: 100px;
  }
  @media (max-width: 500px) {
    width: 90%;
    position: absolute;
    top: 150px;
    left: 15px;
  }
`;
const GradientTop = styled.div`
  z-index: 1;
  width: 437px;
  height: 40px;
  position: absolute;
  top: 141px;
  left: 123px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  @media (max-width: 500px) {
    width: 90%;
    position: absolute;
    top: 150px;
    left: 15px;
  }
`;
const GradientBottom = styled.div`
  width: 437px;
  height: 40px;
  position: absolute;
  top: 513px;
  left: 123px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  @media (max-width: 500px) {
    width: 90%;
    position: absolute;
    top: 500px;
    left: 15px;
  }
`;
