import { request } from './client';

export const putChangeNickname = async (data: { name: string }) => {
  console.log('닉네임 변경 요청:', data);

  try {
    const res = await request.put({
      url: '/user/change_name',
      data: data
    });
    console.log('닉네임 변경 완료', res);
    return res;
  } catch (error) {
    console.error('닉네임 변경 오류:', error);
    throw error;
  }
};

export const getInfo = async () => {
  try {
    const res = await request.get({
      url: '/user/info',
      params: {}
    });
    // console.log('유저 정보 요청 완료', res);
    return res;
  } catch (error) {
    console.error('유저 정보 요청 오류:', error);
    throw error;
  }
};

export const postPasswordCompare = async (data: { password: string }) => {
  console.log('비밀번호 확인 요청:', data);
  try {
    const res = await request.post({
      url: '/user/compare_password',
      data: data
    });
    console.log('비밀번호 확인 완료', res);
    return res;
  } catch (error) {
    console.error('비밀번호 확인 오류:', error);
    throw error;
  }
};

export const putChangePassword = async (data: { password: string }) => {
  console.log('비밀번호 변경 요청:', data);
  try {
    const res = await request.put({
      url: '/user/change_password',
      data: data
    });
    console.log('비밀번호 변경 완료', res);
    return res;
  } catch (error) {
    console.error('비밀번호 변경 오류:', error);
    throw error;
  }
};

export const getFindPassword = async (email: string) => {
  console.log('비밀번호 찾기 요청:', email);
  try {
    const res = await request.get({
      url: `/user/find_password?email=${email}`,
      params: {}
    });
    console.log('비밀번호 찾기 완료', res);
    return res;
  } catch (error) {
    console.error('비밀번호 찾기 오류:', error);
    throw error;
  }
};
