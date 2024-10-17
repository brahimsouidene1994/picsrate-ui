import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
// Callback to handle authentication events
const onKeycloakEvent = (event:any, error:any) => {
  console.log('onKeycloakEvent', event, error);
};

// Callback to handle token refresh
const onTokens = (tokens:any) => {
  console.log('onTokens', tokens);
};
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const keycloakInitOptions = {
  onLoad: 'check-sso',  // You can also try 'login-required' if you want to force login
  checkLoginIframe: false,  // Disable iframe check to avoid the timeout error
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',  // This file should exist if used
};

root.render(
  <ReactKeycloakProvider 
  authClient={keycloak} 
  initOptions={keycloakInitOptions}
  onEvent={onKeycloakEvent}
  onTokens={onTokens}
  >
    <App />
    </ReactKeycloakProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
