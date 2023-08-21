import React from 'react';
import Login from './pages/Login';
import Friend from './pages/Friend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpBeforePage from './pages/signup/SignUpBefore';
import SignUpEmailPage from './pages/signup/SignUpEmail';
import TermsPage from './component/layout/Footer/TermsPage';
import SignUpInfoPage from './pages/signup/SignUpInfo';
import SignUpAfterPage from './pages/signup/SignUpAfter';
import EditProfilePage from './pages/user/EditProfile';
import PasswordResetPage from './pages/password/PasswordReset';
import PasswordSearchPage from './pages/password/PasswordSearch';
import FriendInvite from './pages/FriendInvite';
import WithdrawalPage from './pages/Withdrawal';
import Lank from './pages/Lank';
import MyPage from './pages/MyPage';
import Google from './pages/signup/Google';
import Kakao from './pages/signup/Kakao';
import Nav from './component/layout/Nav/Nav';
import Footer from './component/layout/Footer/Footer';
import Home from './pages/Home';

function App() {
  const noLayout =
    window.location.pathname === '/login' ||
    window.location.pathname === '/google' ||
    window.location.pathname === '/kakao' ||
    window.location.pathname.startsWith('/signup') ||
    window.location.pathname.startsWith('/user') ||
    window.location.pathname === '/friend/invite';
  console.log(window.location.pathname);
  return (
    <>
      <BrowserRouter>
        <div className='App'>
          {!noLayout && <Nav />}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/kakao' element={<Kakao />} />
            <Route path='/google' element={<Google />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user/password' element={<PasswordSearchPage />} />
            <Route path='/signup' element={<SignUpBeforePage />} />
            <Route path='/signup/email' element={<SignUpEmailPage />} />
            <Route path='/signup/info' element={<SignUpInfoPage />} />
            <Route path='/signup/complete' element={<SignUpAfterPage />} />
            <Route path='/user/edit' element={<EditProfilePage />} />
            <Route path='/friend' element={<Friend />} />
            <Route path='/friend/invite' element={<FriendInvite />} />
            <Route path='/lank' element={<Lank />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/user/edit/password' element={<PasswordResetPage />} />
            <Route path='/user/delete' element={<WithdrawalPage />} />
            <Route path='/terms/:id' Component={TermsPage} />
          </Routes>
          {!noLayout && <Footer />}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
