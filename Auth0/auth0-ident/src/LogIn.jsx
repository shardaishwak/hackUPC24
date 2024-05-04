import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

  //Add login button to the application
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button id="loginbutton" onClick={() => loginWithRedirect()}>Log In</button>;
  };
  
  export default LoginButton;