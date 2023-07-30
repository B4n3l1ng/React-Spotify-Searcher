import { Link } from "react-router-dom";

function AlbumCard({ album }) {
  return (
    <div className="albumBox">
      {album.images.length ? (
        <img src={album.images[1].url} alt={album.name} />
      ) : (
        <img src="https://placehold.co/320x320" alt={album.name} />
      )}
      <h1>{album.name}</h1>
      <button className="spotifyButton">
        <a href={album.external_urls.spotify} target="_blank">
          Listen on Spotify
        </a>
      </button>

      <button className="spotifyButton">
        <Link to={`/albums/${album.id}`}>Album Profile</Link>
      </button>

      <p>Release date: {album.release_date}</p>
      <p>Total tracks: {album.total_tracks}</p>
    </div>
  );
}

export default AlbumCard;
