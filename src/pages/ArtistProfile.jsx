import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SpotifyContext } from "../contexts/SpotifyContext";
import AlbumCard from "../components/AlbumCard";
import { Image, Card, Flex, Text, Button, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

function ArtistProfile() {
  const { artistId } = useParams();
  const { token, logout } = useContext(SpotifyContext);
  const [artistBio, setArtistBio] = useState();
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const artistInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArtistBio(response.data);
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

  const getArtistAlbums = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const filtered = data.items.filter((album) => {
      if (
        album.artists[0].name === artistBio.name &&
        album.artists.length === 1
      ) {
        return album;
      }
    });
    const sorted = filtered.sort((a, b) => {
      const yearA = parseInt(a.release_date.slice(0, 4));
      const yearB = parseInt(b.release_date.slice(0, 4));

      if (yearA > yearB) {
        return -1;
      } else if (yearB > yearA) {
        return 1;
      } else {
        const monthA = parseInt(a.release_date.slice(5, 7));
        const monthB = parseInt(b.release_date.slice(5, 7));
        if (monthA > monthB) {
          return -1;
        } else if (monthB > monthA) {
          return 1;
        } else {
          const dayA = parseInt(a.release_date.slice(-2));
          const dayB = parseInt(b.release_date.slice(-2));
          if (dayA > dayB) {
            return -1;
          } else {
            return 1;
          }
        }
      }
    });
    setArtistAlbums(sorted);
  };

  useEffect(() => {
    artistInfo();
  }, [artistId]);

  useEffect(() => {
    if (artistBio) {
      getArtistAlbums();
    }
  }, [artistBio]);

  return (
    <div style={{ textAlign: "center" }}>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : undefined}
      {artistBio ? (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          style={{
            marginBottom: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Section>
            <Image
              height={460}
              width={460}
              fit="contain"
              src={artistBio.images ? artistBio.images[0].url : ""}
              alt={artistBio.name}
            />
          </Card.Section>
          <Card.Section>
            <Title weight={700}>{artistBio.name}</Title>
            <h2>Followers: {artistBio.followers.total}</h2>
            <Button color="green" radius="xl" size="md">
              <a href={artistBio.external_urls.spotify} target="_blank">
                Listen on Spotify
              </a>
            </Button>

            <Text>
              Genres:{" "}
              {artistBio.genres.map((genre, index) => {
                if (index !== artistBio.genres.length - 1) {
                  return <span key={genre}>{genre}, </span>;
                } else {
                  return <span key={genre}>{genre}.</span>;
                }
              })}
            </Text>
          </Card.Section>
        </Card>
      ) : null}
      {artistAlbums.length !== 0 ? (
        <>
          <Title style={{ color: "white" }}>Albums:</Title>
          <Carousel
            controlsOffset="xs"
            maw={320}
            mx="auto"
            withIndicators
            height={600}
            slideGap="md"
            controlSize={30}
            loop
            className="albumsContainer"
          >
            {artistAlbums.map((album) => {
              return (
                <Carousel.Slide size="100%" key={album.id}>
                  <AlbumCard album={album} />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        </>
      ) : (
        <div className="lds-spinner" style={{ margin: "2em" }}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default ArtistProfile;
