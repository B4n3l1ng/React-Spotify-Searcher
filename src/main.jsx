import React from "react";
import ReactDOM from "react-dom/client";
import SpotifyContextProvider from "../contexts/SpotifyContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SpotifyContextProvider>
      <App />
    </SpotifyContextProvider>
  </React.StrictMode>
);
