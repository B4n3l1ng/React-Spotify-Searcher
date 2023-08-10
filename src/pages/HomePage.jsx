import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { SpotifyContext } from "../contexts/SpotifyContext";
import { useContext } from "react";

const HomePage = () => {
  const { token, clientId, redirectUri, authEndpoint, responseType } =
    useContext(SpotifyContext);
  return (
    <div className="homepage homepageBkg">
      {token ? (
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
      ) : (
        <div className="homeContainer">
          <h1>Please login to Spotify first to use our searcher app.</h1>
          <Button color="green" gradius="xl" size="md">
            <a
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
            >
              Login to Spotify
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
