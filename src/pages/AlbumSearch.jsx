import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { SpotifyContext } from "../contexts/SpotifyContext";
import SearchResultCard from "../components/SearchResultCard";
import { Flex, Title } from "@mantine/core";
const AlbumSearch = () => {
  const [searchKey, setSearchKey] = useState("");
  const [albums, setAlbums] = useState([]);
  const { token, logout } = useContext(SpotifyContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTitle, setsearchTitle] = useState("");

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
      setAlbums(data.albums.items);
      setsearchTitle(searchKey);
      setIsLoaded(true);
    } catch (error) {
      console.log("error", error);
      if (error.response.data.error.status === 401) {
        setErrorMessage(error.response.data.error.message);
        return setTimeout(() => {
          logout();
          navigate("/");
        }, 3000);
      }
    }
  };

  return (
    <>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        handleSearch={searchAlbum}
        searchingFor="Album"
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
        {albums.map((album) => {
          return (
            <SearchResultCard item={album} key={album.id} typeOfItem="albums" />
          );
        })}
      </Flex>
    </>
  );
};

export default AlbumSearch;
