import { request } from './client';

export const getUserDetail = async () => {
  console.log('사용자 프로필 불러오기:');
  try {
    const res = await request.get({
      url: '/friend/listuser',
      params: {}
    });
    console.log('사용자 프로필 성공', res);
    return res;
  } catch (error) {
    console.error('사용자 프로필 오류:', error);
    throw error;
  }
};

export const getFriendListDetail = async (id: number) => {
  console.log('친구 목록 불러오기:');
  try {
    const res = await request.get({
      url: '/friend/listdetail?id=' + id,
      params: { id: id }
    });
    console.log('친구 목록 성공', res);
    return res;
  } catch (error) {
    console.error('친구 목록 오류:', error);
    throw error;
  }
};

export const getFriendList = async (keyword: string | null) => {
  console.log('친구 검색하기:');
  try {
    const res = await request.get({
      url: '/friend/listsearch?keyword=' + keyword,
      params: { keyword: keyword }
    });
    console.log('친구 검색 성공', res);
    return res;
  } catch (error) {
    console.error('친구 검색 오류:', error);
    throw error;
  }
};
export const getFriendList2 = async (keyword: string | null) => {
  console.log('친구 검색하기:');
  try {
    const res = await request.get({
      url: '/friend/listsearch',
      params: { keyword: keyword }
    });
    console.log('친구 검색 성공', res);
    return res;
  } catch (error) {
    console.error('친구 검색 오류:', error);
    throw error;
  }
};

export const deleteFriendListDelete = async (friend_email: string) => {
  console.log('친구 삭제하기:');
  try {
    const res = await request.delete({
      url: '/friend/listdelete?friend_email=' + friend_email,
      params: { friend_email: friend_email }
    });
    console.log('친구 삭제 성공', res);
    return res;
  } catch (error) {
    console.error('친구 삭제 오류:', error);
    throw error;
  }
};

export const postMyComment = async (comment: string) => {
  console.log('글쓰기 작성하기:');
  try {
    const res = await request.post({
      url: '/cody/post?Comment=' + comment,
      params: { comment: comment }
    });
    console.log('글쓰기 성공', res);
    return res;
  } catch (error) {
    console.error('글쓰기 오류:', error);
    throw error;
  }
};
