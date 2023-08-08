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
