import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { SpotifyContext } from "../contexts/SpotifyContext";
import SearchResultCard from "../components/SearchResultCard";
import { Flex, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function ArtistSearch() {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const { token, logout } = useContext(SpotifyContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoaded, setisLoaded] = useState(false);
  const [searchTitle, setsearchTitle] = useState("");
  const navigate = useNavigate();
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
      setArtists(data.artists.items);
      setsearchTitle(searchKey);
      setisLoaded(true);
    } catch (error) {
      console.log("error", error);
      if (error.response.data.error.status === 401) {
        console.log("inhere");
        setErrorMessage(error.response.data.error.message);
        return setTimeout(() => {
          logout();
          navigate("/");
        }, 3000);
      }
    }
  };
  return (
    <div className="searchResults">
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        handleSearch={searchArtist}
        searchingFor={"Artist"}
      />
      {errorMessage ? (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      ) : undefined}
      {isLoaded ? (
        <Title order={1} align="center" color="#fff">
          Here are the search results for {searchTitle}
        </Title>
      ) : undefined}
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        style={{ marginTop: "1%" }}
      >
        {artists.map((artist) => {
          return (
            <SearchResultCard
              item={artist}
              key={artist.id}
              typeOfItem="artist"
            />
          );
        })}
      </Flex>
    </div>
  );
}

export default ArtistSearch;
