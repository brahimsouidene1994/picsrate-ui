import { User } from "oidc-client-ts";
import React from "react";
import { useNavigate } from "react-router-dom";
// const onSigninCallback = () => {
//   // Assuming you're using react-router
//   const navigate = useNavigate();
//   React.useEffect(() => {
//     // Redirect the user to the base URL after login
//     navigate('/', { replace: true });
//   }, [navigate]);
// };
const onSigninCallback = (_user: User | void): void => {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  )
}
const oidcConfig = {
  authority: `${process.env.REACT_APP_KEYCLOAK_API}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}`,
  client_id: `${process.env.REACT_APP_KEYCLOAK_CLIENT}`,
  redirect_uri: `${process.env.REACT_APP_UI}`, // Where Keycloak will redirect after login
  post_logout_redirect_uri: `${process.env.REACT_APP_UI}`, // Where to go after logout
  scope: 'offline_access profile email', // Add any additional scopes here
  response_type: 'code', // Use the authorization code flow
  onSigninCallback,

};
export default oidcConfig;
