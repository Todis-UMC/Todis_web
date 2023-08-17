import React from 'react';
import { toast } from 'react-toastify';
import { getGoogleLogin } from '../../api/Auth';
import { getInfo } from '../../api/User';

const Google = () => {
  const url = window.location.href;
  const code = url.split('=')[1];
  console.log(code);
  const googleLogin = async () => {
    const response = await getGoogleLogin(code);
    console.log(response);
    if (response.code === 200) {
      localStorage.setItem('token', response.data);
      const user = await getInfo();
      localStorage.setItem('name', user.data.name);
      localStorage.setItem('email', user.data.email);
      window.location.href = '/';
    } else if (response.code === 400) {
      toast(response.message, {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true,
        pauseOnHover: false,
        progress: undefined,
        className: 'custom-toast'
      });
    } else {
      alert(response.message);
      window.location.href = '/login';
    }
  };
  googleLogin();

  return <div>Google</div>;
};

export default Google;
