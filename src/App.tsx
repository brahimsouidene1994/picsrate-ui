import React from 'react';
import './App.css';
import Navigation from './Routes';
import keycloak from './keycloak';
function App() {
  const[authenticated, setAuthenticated]=React.useState<boolean>(false)

  React.useEffect(() => {checkAuth()},[]);

  const checkAuth = async(): Promise<void> => {
    try {
      const authenticated = await keycloak.init({ onLoad: 'login-required' });
      console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
      setAuthenticated(authenticated);
    } catch (error) {
      console.error('Failed to initialize adapter:', error);
    }
  };
  return (
    <React.StrictMode>
      <Navigation auth={authenticated}/>
    </React.StrictMode>
  );
}

export default App;
