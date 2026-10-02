import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./sass/App.scss";
import * as bootstrap from "bootstrap";

const env = import.meta.env;

import App from "./App.tsx";
import CreateRequest from "./pages/CreateRequest.tsx";
import { RequestsListPage } from "./pages/RequestsListPage.tsx";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { path: "/", Component: RequestsListPage },
      {
        path: "/create-request",
        Component: CreateRequest,
      },
    ],
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
      <RouterProvider router={router} />
    </StrictMode>,
  );
});
