import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../component/common/InputComponent';
import AuthContainer from '../../component/login/AuthContainer';
import { ReactComponent as SmallBlueUnCheck } from '../../assets/icon/SmallBlueUnCheck.svg';
import { ReactComponent as SmallBlueCheck } from '../../assets/icon/SmallBlueCheck.svg';
import FONT from '../../styles/Font';
import TermsModal from '../../component/login/TermsModal';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/common/Button';

const SignUpEmailPage = () => (
  <AuthContainer title='이메일로 가입하기' component={<SignUpEmail />} />
);

export default SignUpEmailPage;

function isValidEmail(email: string) {
  // 이메일 주소 형식을 확인하는 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 정규식과 일치하는지 확인하여 유효한 이메일인지 여부를 반환
  return emailRegex.test(email);
}

const SignUpEmail = () => {
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [check2, setCheck2] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [warn, setWarn] = useState<boolean>(false);
  const [term, setTerm] = useState<boolean>(false);
  const [modalId, setModalId] = useState<number>(0);
  const navigate = useNavigate();

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    if (!checkAll) {
      setCheck(true);
      setCheck2(true);
    } else {
      setCheck(false);
      setCheck2(false);
    }
  };

  const handleModal = (id: number) => {
    setTerm(!term);
    setModalId(id);
  };

  const EmailCheck = () => {
    setWarn(isValidEmail(email));
  };
  const state: { email: string; password: string } = {
    email: email || '',
    password: password || ''
  };
  const NextPageHandler = () => {
    navigate('/signup/info', { state: state });
  };

  return (
    <>
      <InputBox>
        <Input
          label='이메일 주소'
          type='email'
          placeholder='이메일 주소 입력'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          warn={warn}
        />
        <ShortButtonBox>
          {email ? (
            <Button onClick={() => EmailCheck()}>인증</Button>
          ) : (
            <Button disabled>인증</Button>
          )}
        </ShortButtonBox>
      </InputBox>
      <Blank />
      <Input
        label='비밀번호'
        type='password'
        placeholder='비밀번호 입력(6자리 이상)'
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Blank />
      <Input
        label='비밀번호 확인'
        type='password'
        placeholder='비밀번호 확인'
        minLength={6}
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <div>
        <Term style={FONT.H7} onClick={() => handleCheckAll()}>
          {checkAll ? <SmallBlueCheck /> : <SmallBlueUnCheck />}
          모두 동의합니다.
        </Term>

        <Terms style={FONT.L6} onClick={() => setCheck(!check)}>
          {check ? <SmallBlueCheck /> : <SmallBlueUnCheck />}
          본인은
          <span onClick={() => handleModal(0)}>TODIS 이용약관 (필수)</span>에
          동의합니다.
        </Terms>

        <Terms style={FONT.L6} onClick={() => setCheck2(!check2)}>
          {check2 ? <SmallBlueCheck /> : <SmallBlueUnCheck />}
          TODIS의
          <span onClick={() => handleModal(1)}>
            개인정보 수집 및 이용 (필수)
          </span>
          에 동의합니다.
        </Terms>
      </div>

      <ButtonBox>
        {isValidEmail(email) &&
        password === passwordCheck &&
        checkAll &&
        password.length >= 6 ? (
          <Button
            onClick={() => {
              NextPageHandler();
            }}
          >
            다음
          </Button>
        ) : (
          <Button disabled={true}>다음</Button>
        )}
      </ButtonBox>

      {term && <TermsModal onClose={() => setTerm(false)} id={modalId} />}
    </>
  );
};

const Blank = styled.div`
  height: 23px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;

const ShortButtonBox = styled.div`
  width: 30%;
  margin-top: 28px;
`;

const ButtonBox = styled.div`
  margin-top: 46px;
`;
const Term = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.Gray_02};
  color: ${(props) => props.theme.Black_Main};
  padding-bottom: 10px;
  margin-top: 38px;
  svg {
    margin-right: 17px;
  }
`;
const Terms = styled.div`
  display: flex;
  color: ${(props) => props.theme.Black_Main};
  padding-bottom: 5px;
  margin-top: 15px;
  span {
    color: ${(props) => props.theme.Blue_Main};
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
  svg {
    margin-right: 17px;
  }
`;
