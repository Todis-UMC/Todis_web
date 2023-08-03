import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as GoBack } from '../../assets/icon/GoBack.svg';
import { ReactComponent as Search } from '../../assets/icon/Search.svg';
import FriendSearchComponent from './FriendSearchComponent';
import ModalContainer from './modal/ModalContainer';
import useOutSideClick from './modal/useOutSideClick';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const FriendSearch = ({ onClose }: ModalProps) => {
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
            />
            <span id='search'>
              <Search />
            </span>
            <span id='goBack' onClick={handleClose}>
              <GoBack />
            </span>
          </SearchBox>
          <span id='friends' style={FONT.M3}>
            전체 친구 : 00명
          </span>
          <GradientTop />
          <ListBox>
            <FriendSearchComponent name='김우진' />
            <FriendSearchComponent name='이민하' />
            <FriendSearchComponent name='강민경' />
            <FriendSearchComponent name='우소정' />
            <FriendSearchComponent name='이민하' />
            <FriendSearchComponent name='김우진' />
            <FriendSearchComponent name='이민하' />
            <FriendSearchComponent name='강민경' />
            <FriendSearchComponent name='우소정' />
            <FriendSearchComponent name='이민하' />
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
    top: 58px;
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
`;
