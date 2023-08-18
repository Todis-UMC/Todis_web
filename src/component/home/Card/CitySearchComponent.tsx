import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../../styles/Font';
import CityChoose from './CityChoose';

const Box = styled.div`
  margin: 0px auto;
  margin-bottom: 36px;
  margin-top: 25px;
  color: ${(props) => props.theme.Black_Main};
  width: 430px;
  height: 39px;
  background-color: #fff;
  position: relative;
  justify-content: center;
  align-items: center;
  hr {
    height: 0.5px;
    border: 0;
    background: ${(props) => props.theme.Gray_02};
    margin: 18px 0px;
  }
`;
const Profile = styled.div`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.SkyBlue_03};
`;

const Name = styled.div`
  width: 42px;
  height: 19px;
  position: absolute;
  top: 11px;
  left: 53px;
`;

const Choose = styled.button`
  width: 91px;
  height: 37px;
  position: absolute;
  top: 0px;
  left: 339px;
  background-color: ${(props) => props.theme.Blue_Main};
  border-radius: 14px;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const CitySearchComponent = ({ name }: { name: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <Profile></Profile>
      <Name>{name}</Name>
      <Choose style={FONT.L5} onClick={onClickButton}>
        선택
      </Choose>
      <hr />
      {isOpen && (
        <CityChoose
          name={name}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </Box>
  );
};

export default CitySearchComponent;
