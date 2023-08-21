import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as CodiCheck } from '../../assets/icon/CodiCheck.svg';
import { ReactComponent as CodiUnCheck } from '../../assets/icon/CodiUnCheck.svg';
import { useMediaQuery } from 'react-responsive';

type CheckProps = {
  isChecked: boolean;
};

type CodiBoxData = {
  id: number;
  text: string;
  isChecked: boolean;
};

const CodiPoint = () => {
  const [coditexts, setCoditexts] = useState<CodiBoxData[]>([]);
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  useEffect(() => {
    // 예시 데이터
    const data = [
      {
        id: 1,
        text: '오후에 비가 내린다고 했어요!\n스웨이드 재질의 신발은 피해주세요!',
        isChecked: false
      },
      {
        id: 2,
        text: '오늘은 일교차가 커서 지금은 덥더라도 얇은 겉옷을 챙기는 걸 추천해요!\n통풍이 좋은 매쉬 소재나 린넨 소재를 입어도 좋을 것 같아요 :)',
        isChecked: false
      },
      {
        id: 3,
        text: '하의는 반바지 혹은 어두운 색의 긴바지를 추천해요! 바지가 비에 젖을 수 있으니 밝은 회색, 하늘 계열의 색은 추천하지 않아요 :(',
        isChecked: false
      }
    ];

    // 로컬 스토리지에 저장된 상태 불러옴
    const savedCoditexts = localStorage.getItem('coditexts');
    savedCoditexts
      ? setCoditexts(JSON.parse(savedCoditexts))
      : setCoditexts(data);
  }, []);

  const CodiCheckHandler = (id: number) => {
    setCoditexts((prevData) => {
      const updatedCoditexts = prevData.map((item) => {
        if (item.id === id) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });

      // 로컬 스토리지에 업데이트된 상태 저장
      localStorage.setItem('coditexts', JSON.stringify(updatedCoditexts));
      return updatedCoditexts;
    });
  };

  return (
    <div>
      {coditexts.map((item) => (
        <CodiBox
          key={item.id}
          style={isMobile ? { ...FONT.L5, lineHeight: '1.5' } : { ...FONT.L3 }}
          isChecked={item.isChecked}
        >
          {item.text}
          <CheckBtn
            onClick={() => CodiCheckHandler(item.id)}
            isChecked={item.isChecked}
          >
            {item.isChecked ? <CodiCheck /> : <CodiUnCheck />}
          </CheckBtn>
        </CodiBox>
      ))}
    </div>
  );
};

export default CodiPoint;

const CodiBox = styled.div<CheckProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.isChecked ? props.theme.Blue_Main : 'white'};
  color: ${(props) => (props.isChecked ? 'white' : props.theme.Gray_00)};
  letter-spacing: -0.41px;
  border: 2px solid ${(props) => props.theme.Blue_Main};
  border-radius: 40px;
  padding: 30px 42px 30px 92px;
  margin-bottom: 10px;
  width: 100vw;
  max-width: 531px;
  min-height: 130px;
  white-space: pre-line;
  @media (max-width: 500px) {
    width: 90vw;
    max-width: 431px;
    padding: 25px 38px 25px 70px;
    min-height: 80px;
    line-height: 40px;
  }
`;

const CheckBtn = styled.button<CheckProps>`
  position: absolute;
  top: 37px;
  left: 5%;
  padding-top: 5px;
  background-color: white;
  border-radius: 50px;
  border: ${(props) =>
    props.isChecked ? 'none' : '2px dashed ' + props.theme.Gray_02};
  width: 48px;
  height: 48px;
  cursor: pointer;
  @media (max-width: 500px) {
    top: 32px;
    left: 7.5%;
    width: 32px;
    height: 32px;
    > svg {
      margin-left: -2px;
      width: 13px;
      height: 13px;
  }
`;
