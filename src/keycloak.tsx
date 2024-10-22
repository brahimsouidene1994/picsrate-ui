import Keycloak, { KeycloakConfig } from 'keycloak-js'

const keycloakConfig:KeycloakConfig = {
  url: `${process.env.REACT_APP_KEYCLOAK_API}`,
  realm: `${process.env.REACT_APP_KEYCLOAK_REALM}`,
  clientId: `${process.env.REACT_APP_KEYCLOAK_CLIENT}`,
}

const keycloak = new Keycloak(keycloakConfig)

export default keycloak