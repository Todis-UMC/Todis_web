import { LoginProps, UserProps } from '../types/User';
import { request } from './client';

export const postSignup = async (data: UserProps) => {
  console.log('가입 요청:', data);
  try {
    const res = await request.post({ url: '/user/join', data });
    console.log('가입완료', res);
    return res;
  } catch (error) {
    console.error('가입 오류:', error);
    throw error;
  }
};

export const postLogin = async (data: LoginProps) => {
  console.log('로그인 요청:', data);
  try {
    const res = await request.post({ url: '/user/login', data });
    console.log('로그인 완료', res);
    return res;
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};

export const getKakaologin = async (code: string) => {
  try {
    const res = await request.get({
      url: `/user/kakao?code=${code}`,
      params: {}
    });
    console.log('카카오 로그인 완료', res);
    return res;
  } catch (error) {
    console.error('카카오 로그인 오류:', error);
    throw error;
  }
};
