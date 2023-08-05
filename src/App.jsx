import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { SpotifyContext } from "./contexts/SpotifyContext";
import "./App.css";
import ArtistSearch from "./pages/ArtistSearch";
import ArtistProfile from "./pages/ArtistProfile";
import AlbumProfile from "./pages/AlbumProfile";
import HomePage from "./pages/HomePage";
import AlbumSearch from "./pages/AlbumSearch";
import MusicSearch from "./pages/MusicSearch";
import TrackProfile from "./pages/TrackProfile";

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
              <h1>
                <NavLink to="/">Spotify Search</NavLink>
              </h1>
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
                <h1>
                  <NavLink to="/">Spotify Search</NavLink>
                </h1>
                <button>
                  <NavLink to="/artist-search">Search for an artist</NavLink>
                </button>
                <button>
                  <NavLink to="/album-search">Search for an album</NavLink>
                </button>
                <button>
                  <NavLink to="/track-search">Search for a song</NavLink>
                </button>
                <button className="logOut" onClick={logout}>
                  Logout
                </button>
              </nav>
              <div>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/artist-search" element={<ArtistSearch />} />
                  <Route path="/artist/:artistId" element={<ArtistProfile />} />
                  <Route path="/album-search" element={<AlbumSearch />} />
                  <Route path="/albums/:albumId" element={<AlbumProfile />} />
                  <Route path="/track-search" element={<MusicSearch />} />
                  <Route path="/tracks/:trackId" element={<TrackProfile />} />
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
