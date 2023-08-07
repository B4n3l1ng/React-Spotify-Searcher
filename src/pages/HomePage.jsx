import { Link } from "react-router-dom";
import { Button, MediaQuery, rem } from "@mantine/core";

const HomePage = () => {
  return (
    <div className="homepage homepageBkg">
      <div className="homeContainer">
        <h1>Welcome to Spotify Search</h1>
        <div className="buttonContainer">
          <Button color="green" radius="xl" size="md">
            <Link to="/artist-search">Search for an artist</Link>
          </Button>
          <Button color="green" radius="xl" size="md">
            <Link to="/album-search">Search for an album</Link>
          </Button>
          <Button color="green" radius="xl" size="md">
            <Link to="/track-search">Search for a song</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
