import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import LikeButton from './LikeButton';
import avatar from '../../assets/img/avatar/M_Avatar.png';
import axios from 'axios';

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

const CenteredImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const baseURL =
  'http://ec2-13-209-15-210.ap-northeast-2.compute.amazonaws.com:8080';

const token = localStorage.getItem('token');

const LankBox = ({
    name,
    statusmessage,
    lankNum, 
  }: {
    name: string;
    statusmessage: string;
    lankNum: string; 
  }) => {

    const [avatarSaveImg, setAvatarSaveImg] = useState<string>('');

    useEffect(() => {
      const fetchAvatarImage = async () => {
        try {
          const responseAvatar = await axios.get(`${baseURL}/cody/getimage`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const avatarSaveImg = responseAvatar.data;
          setAvatarSaveImg(avatarSaveImg.data.image);
          console.log('GET 아바타 이미지:', avatarSaveImg);
        } catch (error) {
          console.error('Error fetching data:', error);
          console.log('연동 오류');
        }
      };
        fetchAvatarImage();
      }, []);

    return (
      <Box>
        <Name style={FONT.H2}>{name}</Name>
        <StatusMessage style={FONT.L4}>{statusmessage}</StatusMessage>
        <Lanking>
          <LankNum style={FONT.L1}>{lankNum}</LankNum>
        </Lanking>
        <OutfitPic>
          <CenteredImage src={avatarSaveImg || avatar} alt='OutfitPic' height='100%' />
          
        </OutfitPic>
        <ButtonStyling>
          <LikeButton />
        </ButtonStyling>
      </Box>
    );
  };

export default LankBox;