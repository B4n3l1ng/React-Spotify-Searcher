import axios from "axios";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { SpotifyContext } from "./contexts/SpotifyContext";
import "./App.css";
import ArtistSearch from "./pages/ArtistSearch";
import ArtistProfile from "./pages/ArtistProfile";
import AlbumProfile from "./pages/AlbumProfile";
import HomePage from "./pages/HomePage";
import AlbumSearch from "./pages/AlbumSearch";
import MusicSearch from "./pages/MusicSearch";
import TrackProfile from "./pages/TrackProfile";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
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
  );
}

export default App;
