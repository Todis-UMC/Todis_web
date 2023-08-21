export interface Route {
  path: string;
  text: string;
}

const Routes: Route[] = [
  {
    path: '/',
    text: '홈'
  },
  {
    path: '/mypage',
    text: '마이페이지'
  },
  {
    path: '/friend',
    text: '친구'
  },
  {
    path: '/lank',
    text: '더보기'
  }
];

export default Routes;
