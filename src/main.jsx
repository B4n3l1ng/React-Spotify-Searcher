import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import SpotifyContextProvider from "./contexts/SpotifyContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SpotifyContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SpotifyContextProvider>
  </React.StrictMode>
);
