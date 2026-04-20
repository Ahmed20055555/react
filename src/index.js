import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ThemeProvider } from "./Datacontext";
import App from "./App";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  </ThemeProvider>
);

serviceWorkerRegistration.register();
