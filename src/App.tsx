import React from 'react';
import Login from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Friend from './pages/Friend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './component/common/Nav/Nav';
import NavLogin from './component/common/Nav/NavLogin';
import SignUpBeforePage from './pages/signup/SignUpBefore';
import SignUpEmailPage from './pages/signup/SignUpEmail';

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
      <BrowserRouter>
        <GoogleOAuthProvider clientId={client_id}>
          <div className='App'>
            <Routes>
              <Route path='/Friend' element={<Friend />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/SignUp' element={<SignUpBeforePage />} />
              <Route path='/Nav' element={<Nav />} />
            </Routes>
          </div>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
