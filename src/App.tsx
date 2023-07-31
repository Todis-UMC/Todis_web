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