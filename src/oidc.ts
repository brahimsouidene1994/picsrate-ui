const oidcConfig = {
  authority: `${process.env.REACT_APP_KEYCLOAK_API}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}`,
  client_id: `${process.env.REACT_APP_KEYCLOAK_CLIENT}`,
  redirect_uri: window.location.origin, // Where Keycloak will redirect after login
  post_logout_redirect_uri: window.location.origin, // Where to go after logout
  scope: 'offline_access profile email', // Add any additional scopes here
  response_type: 'code', // Use the authorization code flow
};

export default oidcConfig;
