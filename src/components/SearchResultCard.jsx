import { Link } from "react-router-dom";

function SearchResultCard({ item, typeOfItem }) {
  return (
    <Link to={`/${typeOfItem}/${item.id}`} className="card">
      <div>
        {item.images.length > 0 ? (
          <img src={item.images[1].url} alt={item.title} />
        ) : (
          <img src="https://placehold.co/320x320" alt="placeholder image" />
        )}

        <h2>{item.name}</h2>
        {item.artists ? <h2>{item.artists[0].name}</h2> : undefined}
      </div>
    </Link>
  );
}

export default SearchResultCard;
