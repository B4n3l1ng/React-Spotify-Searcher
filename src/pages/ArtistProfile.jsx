import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SpotifyContext } from "../contexts/SpotifyContext";
import AlbumCard from "../components/AlbumCard";

function ArtistProfile() {
  const { artistId } = useParams();
  const { token, logout } = useContext(SpotifyContext);
  const [artistBio, setArtistBio] = useState();
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const artistInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArtistBio(response.data);
    } catch (error) {
      console.log("error", error);
      if (error.response.data.status === 401) {
        setErrorMessage(error.response.data.error.message);
        return setTimeout(() => {
          logout();
        }, 3000);
      }
    }
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
    setArtistAlbums(sorted);
  };

  useEffect(() => {
    artistInfo();
  }, [artistId]);

  useEffect(() => {
    if (artistBio) {
      getArtistAlbums();
    }
  }, [artistBio]);

  return (
    <>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : undefined}
      {artistBio ? (
        <div className="bandBio">
          <img
            src={artistBio.images ? artistBio.images[0].url : ""}
            alt={artistBio.name}
          />
          <h1>{artistBio.name}</h1>
          <h2>Followers: {artistBio.followers.total}</h2>
          <button className="spotifyButton">
            <a href={artistBio.external_urls.spotify} target="_blank">
              Listen on Spotify
            </a>
          </button>

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
