import styled from 'styled-components';
import { ReactComponent as SmallLogo } from '../../assets/icon/SmallLogo.svg';
import React from 'react';
import FONT from '../../styles/Font';
import { ReactComponent as ArrowBack } from '../../assets/icon/ArrowBack.svg';

const AuthContainer = ({
  title,
  component,
  content
}: {
  title: string;
  component: React.ReactElement;
  content?: string;
}) => {
  return (
    <Container>
      <Box>
        {content && (
          <Back>
            <ArrowBack />
          </Back>
        )}
        <SmallLogo />
        <Title style={FONT.H5}>{title}</Title>
        {content ? (
          <Content>
            {content.split('<br/>').map((txt) => (
              <>
                <div style={FONT.L5}>{txt}</div>
              </>
            ))}
          </Content>
        ) : (
          <div style={{ height: 21 }}></div>
        )}
        {component}
        {content && (
          <A href='login' style={FONT.L6}>
            로그인하기
          </A>
        )}
      </Box>
    </Container>
  );
};

export default AuthContainer;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Box = styled.div`
  max-width: 569px;
  width: 80%;
  background-color: #fff;
  border-radius: 47px;
  justify-content: center;
  padding: 44px 65px 50px 65px;
  text-align: center;
`;
const Title = styled.div`
  margin-top: 19px;
  margin-bottom: 21px;
`;

const Content = styled.div`
  height: 80px;
  width: 90%;
  color: ${(props) => props.theme.Gray_01};
  margin: 0 auto;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const A = styled.a`
  color: ${(props) => props.theme.Black_Main};
`;

const Back = styled.div`
  position: absolute;
  cursor: pointer;
  margin-left: -19px;
`;
