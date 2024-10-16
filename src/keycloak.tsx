import Keycloak from 'keycloak-js'

const keycloakConfig = {
  url: `${process.env.REACT_APP_KEYCLOAK_API}`,
  realm: 'picsrate',
  clientId: 'web_app',
}

const keycloak = new Keycloak(keycloakConfig)

export default keycloak