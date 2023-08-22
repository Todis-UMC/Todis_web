import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { Mobile, PC } from '../common/Responsive';
import LikeButton from './LikeButton';
import SignUpBeforeLogo from '../../assets/img/SignUpBeforeLogo.png';
import avatar from '../../assets/img/avatar/M_Avatar.png';

const Box = styled.div`
  width: 67rem;
  height: 14rem;
  border-radius: 47px;
  border: none;
  position: relative;
  background-color: white;
`;

const Lanking = styled.div`
  width: 86px;
  height: 86px;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  border-radius: 50%;
  position: absolute;
  top: 4.2rem;
  left: 4.1rem;
`;

const Name = styled.div`
  margin-top: 4.3rem;
  margin-bottom: 2.2rem;
  margin-left: 12.5rem;
`;

const StatusMessage = styled.div`
  margin-left: 12.5rem;
`;

const LankNum = styled.div`
  color: ${(props) => props.theme.Blue_Main};
  margin-top: 1.9rem;
  text-align: center;
`;

const OutfitPic = styled.div`
  width: 12rem;
  height: 9rem;
  background-color: ${(props) => props.theme.SkyBlue_03};
  border-radius: 1rem;
  position: absolute;
  margin-left: 52rem;
  top: 2.5rem;
`;

const ButtonStyling = styled.div`
  border-radius: 1rem;
  position: absolute;
  margin-left: 61rem;
  top: 8.5rem;
`;
// 모바일 버전 스타일
const MobileBox = styled.div`
  width: 100%;
  overflow: scroll;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ImgBox = styled.div`
  background-color: ${(props) => props.theme.SkyBlue_03};
  border-radius: 1rem;
  object-fit: cover;
  margin: 0 auto;
  z-index: 1;
`;

const TopBox = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Text = styled.div`
  margin-top: 0.3rem;
  > div {
    margin-top: 0.3rem;
  }
`;

const MobileLank = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  border-radius: 50%;
  margin-right: 1rem;
  > div {
    text-align: center;
    color: ${(props) => props.theme.Blue_Main};
    margin-top: 0.3rem;
  }
`;
const MobileLike = styled.div`
  width: fit-content;
  margin: 10px;
  position: absolute;
`;

interface DataItem {
  id: number;
  name: string;
  codyImage: string | null;
  lankNum: string;
}

const LankBox = ({
  id,
  name,
  lankNum,
  codyImage
}: DataItem) => {
  return (
    <>
      <PC>
        <Box>
          <Name style={FONT.H2}>{name}</Name>
          <StatusMessage></StatusMessage>
          <LankNum style={FONT.L1}>{lankNum}</LankNum>
          <OutfitPic style={{ display: 'flex', justifyContent: 'center' }}>
          {codyImage === null ? (
          <img src={avatar} alt='avatar-codyImage' height='100%' />
          ) : (
          <img src={codyImage} alt='codyImage' height='100%' />
          )}
          </OutfitPic>
          <ButtonStyling>
            <LikeButton />
          </ButtonStyling>
        </Box>
      </PC>
      {/* 모바일 버전 */}
      <Mobile>
        <MobileBox>
          <TopBox>
            <MobileLank>
            <div style={FONT.L4}>{lankNum}</div>
            </MobileLank>
            <Text style={FONT.H7}>
              {name}
              <div></div>
            </Text>
          </TopBox>
          <ImgBox>
            <MobileLike>
              <LikeButton />
            </MobileLike>
            <img
              src={SignUpBeforeLogo}
              alt='SignUpBefore'
              width={300}
              height={300}
            />
          </ImgBox>
        </MobileBox>
      </Mobile>
    </>
  );
};

export default LankBox;