import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { SpotifyContext } from "../contexts/SpotifyContext";
import "./App.css";
import Search from "./components/Search";

function App() {
  const {
    token,
    setToken,
    logout,
    clientId,
    redirectUri,
    authEndpoint,
    responseType,
  } = useContext(SpotifyContext);

  return (
    <div className="App">
      <header className="App-header">
        <div className="SearchContainer">
          {!token ? (
            <nav>
              <h1>Searchly</h1>
              <button>
                <a
                  href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
                >
                  Login to Spotify
                </a>
              </button>
            </nav>
          ) : (
            <div>
              <nav>
                <h1>Searchly</h1>
                <button className="logOut" onClick={logout}>
                  Logout
                </button>
              </nav>
              <Search />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
