import Keycloak from "keycloak-js";

const env = import.meta.env;

export const keycloak = new Keycloak({
  url: env.VITE_KEYCLOAK_URL,
  clientId: env.VITE_KEYCLOAK_CLIENT_ID,
  realm: env.VITE_KEYCLOAK_REALM,
});