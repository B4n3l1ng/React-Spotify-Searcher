import { Button, Card, Container, Image, Text } from "@mantine/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TrackCard = ({ track, album, bg = undefined, c = undefined }) => {
  console.log(album);
  console.log(track);
  const duration = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
  };

  useEffect(() => {
    const audio = document.querySelectorAll("audio");
    audio.forEach((audio) => (audio.volume = 0.01));
  }, []);
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      bg={bg ? "#000000" : "#fff"}
      c={c ? "#fff" : "#000000"}
      pt={album ? "sm" : null}
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
          src={
            album
              ? album.images.length
                ? album.images[1].url
                : "https://placehold.co/320x320"
              : track.album.images[1].url
          }
          alt={album ? album.name : track.album.name}
        />
      </Card.Section>
      <Card.Section>
        <Text weight={500}>{track.name}</Text>
        <Text weight={300}>{track.artists[0].name}</Text>
        <Text weight={300}>Duration: {duration(track.duration_ms)}</Text>
        <Text weight={300}>
          Track number {track.track_number} from the album{" "}
          {album ? album.name : track.album.name}
        </Text>
        <Button color="green" radius="xl" size="md" m="sm">
          <a href={track.external_urls.spotify} target="_blank">
            Listen on Spotify
          </a>
        </Button>
        {album ? (
          <Button color="green" radius="xl" size="md" m="sm">
            <Link to={`/tracks/${track.id}`}>Track Profile</Link>
          </Button>
        ) : null}

        <Container m="sm">
          {track.preview_url ? (
            <audio src={track.preview_url} controls />
          ) : (
            <Text>Audio preview not available</Text>
          )}
        </Container>
      </Card.Section>
    </Card>
  );
};

export default TrackCard;
