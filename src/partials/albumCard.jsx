function AlbumCard({ album }) {
  return (
    <div className="albumBox">
      {album.images.length ? (
        <img src={album.images[1].url} alt={album.name} />
      ) : (
        <img src="https://placehold.co/320x320" alt={album.name} />
      )}
      <h1>{album.name}</h1>
      <a href={album.external_urls.spotify} target="_blank">
        Listen on Spotify
      </a>
      <p>Release date: {album.release_date}</p>
      <p>Total tracks: {album.total_tracks}</p>
    </div>
  );
}

export default AlbumCard;
