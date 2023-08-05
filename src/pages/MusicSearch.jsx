import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { SpotifyContext } from "../contexts/SpotifyContext";

const MusicSearch = () => {
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const { token, logout } = useContext(SpotifyContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const searchTracks = async () => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "track",
        },
      });
      console.log(data);
      setTracks(data.tracks.items);
    } catch (error) {
      console.log("error", error);
      if (error.response.data.status === 401) {
        setErrorMessage(error.response.data.error.message);
        setTimeout(() => {
          logout();
        }, 3000);
      }
    }
  };

  return (
    <>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        handleSearch={searchTracks}
        searchingFor={"Tracks"}
      />
      {errorMessage ? (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      ) : undefined}
      <div className="cardContainer">
        {tracks.map((track) => (
          <Link to={`/tracks/${track.id}`} className="card" key={track.id}>
            <div>
              {track.album.images.length > 0 ? (
                <img src={track.album.images[1].url} alt={track.name} />
              ) : (
                <img
                  src="https://placehold.co/320x320"
                  alt="placeholder image"
                />
              )}
              <h2>{track.name}</h2>
              {track.artists ? <h2>{track.artists[0].name}</h2> : undefined}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MusicSearch;
