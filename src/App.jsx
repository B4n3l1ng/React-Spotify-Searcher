import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { SpotifyContext } from "../contexts/SpotifyContext";
import "./App.css";
import ArtistSearch from "./components/ArtistSearch";
import ArtistProfile from "./pages/ArtistProfile";

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
                <button>
                  <Link to="/artist-search">Search for an artist</Link>
                </button>
                <button>
                  <Link to="/album-search">Search for an album</Link>
                </button>
                <button>
                  <Link to="/music-search">Search for a song</Link>
                </button>
                <button className="logOut" onClick={logout}>
                  Logout
                </button>
              </nav>
              <div>
                <Routes>
                  <Route path="/artist-search" element={<ArtistSearch />} />
                  <Route path="/artist/:artistId" element={<ArtistProfile />} />
                </Routes>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
