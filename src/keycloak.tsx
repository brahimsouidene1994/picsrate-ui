import Keycloak from 'keycloak-js'

const keycloakConfig = {
  url: 'http://localhost:9080/',
  realm: 'picsrate',
  clientId: 'web_app',
}

const keycloak = new Keycloak(keycloakConfig)

export default keycloak