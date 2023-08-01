import React from 'react';
import Login from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';

function App() {
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // client_id가 설정되어 있는지 확인
  if (!client_id) {
    console.error(
      'Google Client ID가 설정되지 않았습니다. .env 파일에 REACT_APP_GOOGLE_CLIENT_ID를 설정하세요.'
    );
    return null;
  }

  return (
    <>
      <GoogleOAuthProvider clientId={client_id}>
        <Home />
      </GoogleOAuthProvider>
    </>
  );
}
export default App;