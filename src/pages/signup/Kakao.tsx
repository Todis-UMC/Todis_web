import React from 'react';
import { getKakaologin } from '../../api/Auth';
import { getInfo } from '../../api/User';

const Kakao = () => {
  const url = window.location.href;
  const code = url.split('=')[1];
  const kakaoLogin = async () => {
    const response = await getKakaologin(code);
    if (response.code === 200) {
      localStorage.setItem('token', response.data);
      const user = await getInfo();
      localStorage.setItem('name', user.data.name);
      localStorage.setItem('email', user.data.email);
      window.location.href = '/';
    } else {
      window.location.href = '/signin';
    }
  };
  kakaoLogin();

  return <div>카카오 로그인 중</div>;
};

export default Kakao;
