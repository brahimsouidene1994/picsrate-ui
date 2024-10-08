import React from 'react';
import './App.css';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { store } from './services/state';
import { useKeycloak } from '@react-keycloak/web';
import Splash from './pages/splash';

function App() {
  const { initialized } = useKeycloak();
  return (
    <React.StrictMode>
      {
        !initialized ? <Splash />
          :
          <Provider store={store}>
            <Routes />
          </Provider>
      }
    </React.StrictMode>
  );
}

export default App;
