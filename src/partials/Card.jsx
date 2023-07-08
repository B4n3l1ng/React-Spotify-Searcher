function Card({ artists }) {
  return (
    <div className="cardContainer">
      {artists.map((artist) => (
        <div className="card" key={artist.id}>
          {artist.images.length > 0 ? (
            <img src={artist.images[1].url} alt={artist.title} />
          ) : (
            <img src="https://placehold.co/320x320" alt="placeholder image" />
          )}

          <h2>{artist.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Card;
