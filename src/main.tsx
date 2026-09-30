import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./sass/App.scss";
import * as bootstrap from "bootstrap";

import keycloak from "keycloak-js";
import App from './App.tsx'
const env = import.meta.env;

const kc = new keycloak({
  url: env.VITE_KEYCLOAK_URL,
  clientId: env.VITE_KEYCLOAK_CLIENT_ID,
  realm: env.VITE_KEYCLOAK_REALM,
});

kc.init({
  onLoad: "login-required",
  checkLoginIframe: true,
  pkceMethod: "S256",
}).then((authenticated) => {
  if (!authenticated) {
    window.location.reload();
  } else {
    console.log("Authenticated!");
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
