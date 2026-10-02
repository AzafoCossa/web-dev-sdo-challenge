import { useState, useEffect } from 'react';
import { keycloak } from '../keycloak';

let initPromise: Promise<boolean> | null = null;

const initKeycloak = () => {
  if (!initPromise) {
    initPromise = keycloak.init({
      onLoad: "login-required",
      checkLoginIframe: true,
      pkceMethod: "S256",
    });
  }
  return initPromise;
};

const env = import.meta.env;

const useAuth = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    initKeycloak()
      .then(setIsAuthenticated)
      .catch(() => setIsAuthenticated(false));
  }, []);

  return isAuthenticated;
};

export default useAuth;