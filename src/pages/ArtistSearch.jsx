import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { SpotifyContext } from "../contexts/SpotifyContext";
import SearchResultCard from "../partials/SearchResultCard";

function ArtistSearch() {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const { token, logout } = useContext(SpotifyContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const searchArtist = async () => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "artist",
        },
      });
      console.log(data);
      setArtists(data.artists.items);
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
        handleSearch={searchArtist}
        searchingFor={"Artist"}
      />
      {errorMessage ? (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      ) : undefined}
      <div className="cardContainer">
        {artists.map((artist) => {
          return (
            <SearchResultCard
              item={artist}
              key={artist.id}
              typeOfItem="artist"
            />
          );
        })}
      </div>
    </>
  );
}

export default ArtistSearch;
