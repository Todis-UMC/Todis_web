import { request } from './client';

export const putFriendAccept = async (request_id: number) => {
  console.log('친구 수락하기:', request_id);
  try {
    const res = await request.put({
      url: '/friend/accept?request_id=' + request_id,
      params: { request_id: request_id }
    });
    console.log('친구 수락 성공', res);
    return res;
  } catch (error) {
    console.error('친구 수락 오류:', error);
    throw error;
  }
};

export const postFriendRequest = async (friend_email: string) => {
  console.log('친구 요청하기:', friend_email);
  try {
    const res = await request.post({
      url: '/friend/request?friend_email=' + friend_email,
      params: { friend_email: friend_email }
    });
    console.log('친구 요청 성공', res);
    return res;
  } catch (error) {
    console.error('친구 요청 오류:', error);
    throw error;
  }
};

export const getFriendRequestList = async () => {
  console.log('친구 요청 목록 불러오기:');
  try {
    const res = await request.get({
      url: '/friend/requestlist',
      params: {}
    });
    console.log('친구 요청 목록 성공', res);
    return res;
  } catch (error) {
    console.error('친구 요청 목록 오류:', error);
    throw error;
  }
};

export const deleteFriendDelete = async (request_id: number) => {
  console.log('친구 요청 거절하기:');
  try {
    const res = await request.delete({
      url: '/friend/delete?request_id=' + request_id,
      params: { request_id: request_id }
    });
    console.log('친구 거절 성공', res);
    return res;
  } catch (error) {
    console.error('친구 거절 오류:', error);
    throw error;
  }
};
