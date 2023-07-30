import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { SpotifyContext } from "../contexts/SpotifyContext";
import SearchResultCard from "../components/SearchResultCard";
const AlbumSearch = () => {
  const [searchKey, setSearchKey] = useState("");
  const [albums, setAlbums] = useState([]);
  const { token, logout } = useContext(SpotifyContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const searchAlbum = async () => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "album",
        },
      });
      console.log(data.albums.items);
      setAlbums(data.albums.items);
    } catch (error) {
      console.log("error", error);
      if (error.response.status === 401) {
        setErrorMessage("Your token has expired, please log in again.");
        setTimeout(logout(), 3000);
      }
    }
  };

  return (
    <>
      <SearchBar
        setSearchKey={setSearchKey}
        handleSearch={searchAlbum}
        searchingFor="Album"
      />
      {errorMessage ? (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      ) : undefined}
      <div className="cardContainer">
        {albums.map((album) => {
          return (
            <SearchResultCard item={album} key={album.id} typeOfItem="album" />
          );
        })}
      </div>
    </>
  );
};

export default AlbumSearch;
