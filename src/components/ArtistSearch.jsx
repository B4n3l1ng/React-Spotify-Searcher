import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { SpotifyContext } from "../../contexts/SpotifyContext";
import Card from "../partials/Card";

function ArtistSearch() {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const { token } = useContext(SpotifyContext);
  const access_token = token;
  const searchArtist = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    /* console.log(data.artists.items[0]); */
    setArtists(data.artists.items);
  };
  return (
    <>
      <div className="search">
        <input
          className="name"
          type="text"
          placeholder="Search By Artist Name ..."
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              searchArtist();
            }
          }}
        />
        <button onClick={searchArtist}>Search</button>
      </div>

      <Card artists={artists} />
    </>
  );
}

export default ArtistSearch;
