import { request } from './client';
import { AvatarImgProps, AvatarInfoProps } from '../component/mypage/Avatar';

export const postAvatarImg = async (data: AvatarImgProps) => {
  console.log('아바타 이미지 저장:', data);
  try {
    const res = await request.post({ url: '/cody/all', data });
    console.log('저장 완료', res);
    return res;
  } catch (error) {
    console.error('저장 오류:', error);
    throw error;
  }
};

export const postAvatarInfo = async (data: AvatarInfoProps) => {
  console.log('아바타 정보 저장:', data);
  try {
    const res = await request.post({ url: '/cody/image', data });
    console.log('아바타 정보 저장 완료', res);
    return res;
  } catch (error) {
    console.error('아바타 정보 저장 오류:', error);
    throw error;
  }
};
