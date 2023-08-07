import { Link } from "react-router-dom";
import { Card, Image, Text } from "@mantine/core";

function SearchResultCard({ item, typeOfItem }) {
  return (
    <Link to={`/${typeOfItem}/${item.id}`} className="card">
      <Card shadow="sm" padding="xl" radius="md">
        <Card.Section>
          {item.images.length > 0 ? (
            <Image
              src={item.images[1].url}
              alt={item.title}
              height="260"
              width="260"
              style={{ margin: "auto" }}
            />
          ) : (
            <Image
              src="https://placehold.co/320x320"
              alt="placeholder image"
              height="160"
              width="160"
            />
          )}
        </Card.Section>

        <Text size="sm" c="green" style={{ textAlign: "center" }}>
          {item.name}
        </Text>
        {item.artists ? (
          <Text
            size="xl"
            color="dimmed"
            c="green"
            style={{ textAlign: "center" }}
          >
            {item.artists[0].name}
          </Text>
        ) : undefined}
      </Card>
    </Link>
  );
}

export default SearchResultCard;
