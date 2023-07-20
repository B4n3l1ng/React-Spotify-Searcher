import { createContext } from "react";
import { useEffect, useState } from "react";
export const SpotifyContext = createContext();

const SpotifyContextProvider = ({ children }) => {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;
  const RESPONSE_TYPE = import.meta.env.VITE_SPOTIFY_RESPONSE_TYPE;

  const [clientId, setClientId] = useState(CLIENT_ID);
  const [redirectUri, setRedirectUri] = useState(REDIRECT_URI);
  const [authEndpoint, setAuthEndpoint] = useState(AUTH_ENDPOINT);
  const [responseType, setResponseType] = useState(RESPONSE_TYPE);
  const [token, setToken] = useState("");

  const getToken = () => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (hash && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <SpotifyContext.Provider
      value={{
        token,
        getToken,
        logout,
        clientId,
        redirectUri,
        authEndpoint,
        responseType,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export default SpotifyContextProvider;
