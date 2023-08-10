import { Button, Card, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";

function AlbumCard({ album }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder height="xl" bg="#fff">
      <Card.Section>
        <Image
          height={460}
          width={460}
          src={
            album.images.length
              ? album.images[1].url
              : "https://placehold.co/320x320"
          }
          alt={album.name}
        />
      </Card.Section>
      <Card.Section className="albumCardInfo">
        <Text weight={500}>{album.name}</Text>
        <Button color="green" radius="xl" size="md">
          <a href={album.external_urls.spotify} target="_blank">
            Listen on Spotify
          </a>
        </Button>

        <Button color="green" radius="xl" size="md">
          <Link to={`/albums/${album.id}`}>Album Profile</Link>
        </Button>

        <Text>Release date: {album.release_date}</Text>
        <Text>Total tracks: {album.total_tracks}</Text>
      </Card.Section>
    </Card>
  );
}

export default AlbumCard;
