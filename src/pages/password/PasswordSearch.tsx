import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Input from '../../component/common/InputComponent';
import SmallModal from '../../component/common/SmallModal';
import AuthContainer from '../../component/login/AuthContainer';

const PasswordSearchPage = () => (
  <AuthContainer
    title='비밀번호 찾기'
    component={<PasswordSearch />}
    content='가입하신 이메일을 입력해 주세요.<br/>
    비밀번호를 재설정할 수 있는 이메일을 보내드립니다.<br/>
    발송된 이메일의 비밀번호 재설정은 15분 간 유효합니다.'
  />
);

export default PasswordSearchPage;

export const PasswordSearch = () => {
  const [email, setEmail] = useState<string>('');
  const [warn, setWarn] = useState<boolean>(false);
  const [notice, setNotice] = useState<boolean>(false);
  const outside = useRef();

  const handleButton = () => {
    // API 전송 후 없는 이메일일 경우
    // setWarn(true);

    // 존재하는 이메일 & 전송 성공
    setNotice(true);
  };
  return (
    <>
      <Input
        label='이메일'
        type='email'
        placeholder='이메일 주소 입력'
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <Button onClick={() => handleButton()}>전송하기</Button>

      {warn && (
        <SmallModal
          title={'이메일 확인 불가'}
          content={'가입되지 않은 이메일 입니다<br/>이메일 주소를 확인해주세요'}
          onClose={() => setWarn(false)}
          //   ref={outside}
        />
      )}
      {notice && (
        <SmallModal
          title={'비밀번호 재설정'}
          content={
            '비밀번호 재설정 메일을 통해<br/>비밀번호를 변경해 주시길 바랍니다.'
          }
          onClose={() => setNotice(false)}
        />
      )}
    </>
  );
};

const Button = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 22px;
  margin-bottom: 19px;
  border: none;
  border-radius: 14px;
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
