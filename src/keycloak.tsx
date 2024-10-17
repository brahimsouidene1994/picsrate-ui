import Keycloak from 'keycloak-js'

const keycloakConfig = {
  url: `http://auth.qa.picsrate.bbs-studio.tn`,
  realm: 'picsrate',
  clientId: 'web_app',
}

const keycloak = new Keycloak(keycloakConfig)

export default keycloak