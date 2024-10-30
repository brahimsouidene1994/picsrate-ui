import React from 'react';
import './App.css';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { store } from './services/state';
import Splash from './pages/splash';
import { useAuth } from "react-oidc-context";
function App() {
  const auth = useAuth();
  return (
    <React.StrictMode>
      {
        auth.isLoading ? <Splash />
          :
          <Provider store={store}>
            <Routes />
          </Provider>
      }
    </React.StrictMode>
  );
}

export default App;
