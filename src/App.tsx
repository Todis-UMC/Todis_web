import React from 'react';
import Login from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
<<<<<<< HEAD
import {useState, useEffect} from "react";
import SmallLogo from './assets/icon/SmallLogo.svg';
=======
import {useState} from "react";
import logo from './logo.svg';
>>>>>>> 35b06ba8bb599cb6273015049e076812f2bf78bd
import {useSpring, animated} from "react-spring";

function App() {
  const [flip, setFlip] = useState(false);
  const props = useSpring (
    {
      to: {opacity: 1},
      from: {opacity: 0},
      reset: true,
      reverse: flip,
      delay: 200,
<<<<<<< HEAD
      onRest: () => setFlip(!flip)
    }
  );

  useEffect(() => {
    setFlip(true);
  }, []);
=======
      onRest: () => setFlip(!flip),
    }
  );
>>>>>>> 35b06ba8bb599cb6273015049e076812f2bf78bd

  return (
    <div className="App">
      <header className="App-header">
      <animated.div style={props}>
<<<<<<< HEAD
        <img src={SmallLogo}/>
=======
        <img src={logo}/>
>>>>>>> 35b06ba8bb599cb6273015049e076812f2bf78bd
      </animated.div>
      </header>
    </div>
  );
  
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  
}

export default App;