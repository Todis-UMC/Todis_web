import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as GoBack } from '../../assets/icon/GoBack.svg';
import { ReactComponent as Search } from '../../assets/icon/Search.svg';
import ModalContainer from './modal/ModalContainer';
import useOutSideClick from './modal/useOutSideClick';
import Sky1 from '../../assets/img/Sky1.png';

const CityBox = styled.div`
  width: 550px;
  height: 120px;
  background-image: url(${Sky1});
  background-repeat: no-repeat; // Add this line
  background-size: 100% auto;   // 이미지가 CityBox를 꽉 채우도록 하되,
  background-position: center;  // 이미지가 잘리더라도 중앙을 기준으로 잘리게 합니다.
  color: ${(props) => props.theme.Typo_White};
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
  // margin-left: -100px; removed this line

  .city {
    font-size: ${FONT.H6.fontSize};
    font-weight: ${FONT.H6.fontWeight};
  }

  .time {
    font-size: ${FONT.H7.fontSize};
    font-weight: ${FONT.H7.fontWeight};
  }

  .temp {
    font-size: ${FONT.L1.fontSize};
    font-weight: ${FONT.L1.fontWeight};
  }

  .tempRange {
    font-size: ${FONT.H7.fontSize};
    font-weight: ${FONT.H7.fontWeight};
  }
`;

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const CitySearchModal = ({ onClose }: ModalProps) => {
  // 도시,공항 검색 모달창 닫기
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
              placeholder='도시 검색...'
              color='${(props) => props.theme.Gray_02}'
            />
            <span id='search'>
              <Search />
            </span>
            <span id='goBack' onClick={handleClose}>
              <GoBack />
            </span>
          </SearchBox>
          <GradientTop />
          <ListBox>
            <CityBox>
              <div>
                <div className="city">서울</div>
                <div className="time">현재 시간</div>
              </div>
              <div>
                <div className="temp">현재 온도</div>
                <div className="tempRange">최고/최저 기온</div>
              </div>
            </CityBox>
          </ListBox>
          <GradientBottom />
        </Box>
      </Container>
    </ModalContainer>
  );
};

export default CitySearchModal;


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
  width: 750px;
  height: 600px;
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
  width: 560px;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 800px;
  height: 412px;
  position: absolute;
  top: 141px;
  left: 123px;
  overflow-y: scroll;
  padding-left: -500px
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 42%, 0.49);
    border-radius: 100px;
  }

  ${CityBox} {
    margin-bottom: 10px;
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