import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./sass/App.scss";
import * as bootstrap from "bootstrap";

import keycloak from "keycloak-js";
import App from './App.tsx'
const env = import.meta.env;

import App from "./App.tsx";
import Navbar from "./components/Navbar.tsx";
import CreateRequest from "./pages/CreateRequest.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/create-request",
    Component: CreateRequest,
  },
]);

async function enableMocking() {
  if (env.VITE_APP_ENV !== "local") return;

  const { worker } = await import("./mocks/browser");

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Navbar />
      <RouterProvider router={router} />
    </StrictMode>,
  );
});
