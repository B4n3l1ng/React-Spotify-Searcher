import { Link } from "react-router-dom";
import { Card, Image, Text } from "@mantine/core";

function SearchResultCard({ item, typeOfItem }) {
  return (
    <Link to={`/${typeOfItem}/${item.id}`} className="card">
      <Card shadow="sm" padding="xl" radius="md">
        <Card.Section>
          <Image
            height="260"
            width="260"
            style={{ margin: "auto" }}
            src={
              item.images.length > 0
                ? item.images[1].url
                : "https://placehold.co/320x320"
            }
          />
        </Card.Section>
        <Card.Section>
          <Text size="sm" c="green" style={{ textAlign: "center" }}>
            {item.name}
          </Text>
          {item.artists ? (
            <Text size="sm" c="green" style={{ textAlign: "center" }}>
              {item.artists[0].name}
            </Text>
          ) : undefined}
        </Card.Section>
      </Card>
    </Link>
  );
}

export default SearchResultCard;
