import { request } from './client';

export const putChangeNickname = async (data: { name: string }) => {
  console.log('닉네임 변경 요청:', data);

  try {
    const res = await request.put({
      url: '/user/change_nickname',
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
    console.log('유저 정보 요청 완료', res);
    return res;
  } catch (error) {
    console.error('유저 정보 요청 오류:', error);
    throw error;
  }
};
