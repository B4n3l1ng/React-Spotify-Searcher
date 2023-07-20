import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SpotifyContext } from "../contexts/SpotifyContext";
import AlbumCard from "../partials/albumCard";

function ArtistProfile() {
  const { artistId } = useParams();
  const { token } = useContext(SpotifyContext);
  const [artistBio, setArtistBio] = useState();
  const [artistAlbums, setArtistAlbums] = useState([]);

  const artistInfo = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setArtistBio(data);
  };

  const getArtistAlbums = async () => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const filtered = data.items.filter((album) => {
      if (
        album.artists[0].name === artistBio.name &&
        album.artists.length === 1
      ) {
        return album;
      }
    });
    console.log(filtered);
    const sorted = filtered.sort((a, b) => {
      const yearA = parseInt(a.release_date.slice(0, 4));
      const yearB = parseInt(b.release_date.slice(0, 4));

      if (yearA > yearB) {
        return -1;
      } else if (yearB > yearA) {
        return 1;
      } else {
        const monthA = parseInt(a.release_date.slice(5, 7));
        const monthB = parseInt(b.release_date.slice(5, 7));
        if (monthA > monthB) {
          return -1;
        } else if (monthB > monthA) {
          return 1;
        } else {
          const dayA = parseInt(a.release_date.slice(-2));
          const dayB = parseInt(b.release_date.slice(-2));
          if (dayA > dayB) {
            return -1;
          } else {
            return 1;
          }
        }
      }
    });
    console.log(sorted);
    setArtistAlbums(sorted);
  };

  useEffect(() => {
    artistInfo();
    getArtistAlbums();
  }, [artistId]);

  return (
    <>
      {artistBio ? (
        <div className="bandBio">
          <img
            src={artistBio.images ? artistBio.images[0].url : ""}
            alt={artistBio.name}
          />
          <h1>{artistBio.name}</h1>
          <h2>Followers: {artistBio.followers.total}</h2>
          <a href={artistBio.external_urls.spotify}>Listen on Spotify</a>
          <p>
            Genres:{" "}
            {artistBio.genres.map((genre, index) => {
              if (index !== artistBio.genres.length - 1) {
                return <span key={genre}>{genre}, </span>;
              } else {
                return <span key={genre}>{genre}.</span>;
              }
            })}
          </p>
        </div>
      ) : null}
      <div className="albumsContainer">
        {artistAlbums.map((album) => {
          return <AlbumCard album={album} key={album.id} />;
        })}
      </div>
    </>
  );
}

export default ArtistProfile;
