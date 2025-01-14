import { User } from "oidc-client-ts";
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
  //redirect_uri: `${process.env.REACT_APP_UI}`,
  redirect_uri: `http://localhost:3000`,
  post_logout_redirect_uri: `${process.env.REACT_APP_UI}`,
  scope: 'offline_access profile email',
  response_type: 'code',
  onSigninCallback,

};
export default oidcConfig;
