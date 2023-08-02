import React from 'react';
import Login from './pages/Login';
import SignUpBeforePage from './pages/signup/SignUpBefore'
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUpEmailPage from './pages/signup/SignUpEmail';
import Footer from './component/common/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TermsPage from './component/common/Footer/TermsPage';


function App() {

  return (
    <>
    <BrowserRouter>
        <div className='App'>
          <Routes>
              <Route path="/terms/:id" Component={TermsPage} />
          </Routes>
          <Footer />
        </div>
    </BrowserRouter>
    </>
  );
}

export default App;
