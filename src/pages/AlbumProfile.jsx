import { Carousel } from "@mantine/carousel";
import { Button, Card, CardSection, Image, Text, Title } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TrackCard from "../components/TrackCard";
import { SpotifyContext } from "../contexts/SpotifyContext";

function AlbumProfile() {
  const [albumBio, setAlbumBio] = useState();
  const { token, logout } = useContext(SpotifyContext);
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [tracks, setTracks] = useState([]);

  const fetchAlbum = async () => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlbumBio(data);
      setTracks(data.tracks.items);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    fetchAlbum();
  }, []);

  console.log(tracks);

  return (
    <div style={{ textAlign: "center" }}>
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
      <div>
        {albumBio ? (
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
                src={albumBio.images ? albumBio.images[0].url : ""}
                alt={albumBio.name}
              />
            </Card.Section>
            <Card.Section p="sm">
              <Title weight={700} pb="sm">
                {albumBio.name}
              </Title>
              <Text color="#000000" pb="sm">
                <Link
                  to={`/artist/${albumBio.artists[0].id}`}
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  {albumBio.artists[0].name}
                </Link>
              </Text>
              <Button color="green" radius="xl" size="md" mb="sm">
                <a href={albumBio.external_urls.spotify} target="_blank">
                  Listen on Spotify
                </a>
              </Button>
              <Text weight={500} mb="sm">
                Label: {albumBio.label}
              </Text>
              <Text weight={500} mb="sm">
                Popularity: {albumBio.popularity}
              </Text>
              <Text weight={500} mb="sm">
                Total Tracks: {albumBio.total_tracks}
              </Text>
            </Card.Section>
          </Card>
        ) : null}
      </div>
      <div>
        {tracks.length !== 0 ? (
          <>
            <Title weight={700} pb="sm">
              Tracks:
            </Title>
            <Carousel
              controlsOffset="xs"
              maw={400}
              mx="auto"
              withIndicators
              height={650}
              slideGap="md"
              controlSize={30}
              loop
            >
              {tracks.map((track) => (
                <Carousel.Slide size="100%" key={track.id}>
                  <TrackCard track={track} album={albumBio} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </>
        ) : undefined}
      </div>
    </div>
  );
}

export default AlbumProfile;
