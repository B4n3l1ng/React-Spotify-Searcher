import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import SpotifyContextProvider from "./contexts/SpotifyContext";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider, Text } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyle
      withNormalizeCSS
      theme={{
        breakpoints: {
          xs: 500,
          sm: 800,
          md: 1000,
          lg: 1200,
          xl: 1400,
        },
      }}
    >
      <SpotifyContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SpotifyContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
