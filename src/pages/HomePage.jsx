import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Spotify Search</h1>
      <div>
        <button className="spotifyButton">
          <Link to="/artist-search">Search for an artist</Link>
        </button>
        <button className="spotifyButton">
          <Link to="album-search">Search for an album</Link>
        </button>
        <button className="spotifyButton">
          <Link to="track-search">Search for a song</Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
