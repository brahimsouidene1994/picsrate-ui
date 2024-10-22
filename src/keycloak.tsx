import Keycloak, { KeycloakConfig } from 'keycloak-js'

const keycloakConfig:KeycloakConfig = {
  url: `https://auth.qa.picsrate.bbs-studio.tn`,
  realm: 'picsrate',
  clientId: 'web_app',
}

const keycloak = new Keycloak(keycloakConfig)

export default keycloak