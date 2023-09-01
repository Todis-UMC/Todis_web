import React from 'react';
import { PuffLoader } from 'react-spinners';
import styled from 'styled-components';
import color from '../../styles/Color';

interface LoadingProps {
  loading: boolean;
}

const Loading = () => {
  return (
    <LodingBox>
      <PuffLoader color={color.Blue_Main} loading={true} size={150} />
    </LodingBox>
  );
};

export default Loading;

const LodingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 100;
`;
