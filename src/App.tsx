import React from 'react';
import Login from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import {useState, useEffect} from "react";
import SmallLogo from './assets/icon/SmallLogo.svg';
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
      onRest: () => setFlip(!flip)
    }
  );

  useEffect(() => {
    setFlip(true);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <animated.div style={props}>
        <img src={SmallLogo}/>
      </animated.div>
      </header>
    </div>
  );
  
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  
}

export default App;