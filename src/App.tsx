import React from 'react';
import Login from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import {useState} from "react";
import logo from './logo.svg';
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
      onRest: () => setFlip(!flip),
    }
  );

  return (
    <div className="App">
      <header className="App-header">
      <animated.div style={props}>
        <img src={logo}/>
      </animated.div>
      </header>
    </div>
  );
  
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  
}

export default App;
