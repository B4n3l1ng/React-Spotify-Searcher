import { Card, Flex, Image, Text, Title } from "@mantine/core";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTitle, setsearchTitle] = useState("");
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
      setTracks(data.tracks.items);
      setsearchTitle(searchKey);
      setIsLoaded(true);
    } catch (error) {
      console.log("error", error);
      if (error.response.data.status === 401) {
        setErrorMessage(error.response.data.error.message);
        setTimeout(() => {
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
        handleSearch={searchTracks}
        searchingFor={"Tracks"}
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
        {tracks.map((track) => (
          <Link to={`/tracks/${track.id}`} className="card" key={track.id}>
            <Card>
              <Card.Section>
                <Image
                  height="260"
                  width="260"
                  style={{ margin: "auto" }}
                  src={
                    track.album.images.length > 0
                      ? track.album.images[1].url
                      : "https://placehold.co/320x320"
                  }
                  alt={track.name}
                />
              </Card.Section>
              <Card.Section>
                <Text size="sm" c="green" style={{ textAlign: "center" }}>
                  {track.name}
                </Text>
                {track.artists ? (
                  <Text size="sm" c="green" style={{ textAlign: "center" }}>
                    {track.artists[0].name}
                  </Text>
                ) : undefined}
              </Card.Section>
            </Card>
          </Link>
        ))}
      </Flex>
    </>
  );
};

export default MusicSearch;
