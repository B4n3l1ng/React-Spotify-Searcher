import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SpotifyContext } from "../contexts/SpotifyContext";

function AlbumProfile() {
  const [albumBio, setAlbumBio] = useState();
  const { token } = useContext(SpotifyContext);

  const { albumId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [tracks, setTracks] = useState([]);

  const fetchAlbum = async () => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlbumBio(data);
      setTracks(data.tracks.items);
    } catch (error) {
      console.log(error);
      if (error.code === 401) {
        setErrorMessage("Your token has expired, please login again.");
      }
    }
  };

  const duration = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  useEffect(() => {
    const audio = document.querySelectorAll(".audioControl");
    audio.forEach((audio) => (audio.volume = 0.01));
  }, [tracks]);
  return (
    <>
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
      <div>
        {albumBio ? (
          <div className="bandBio">
            <img
              src={albumBio.images ? albumBio.images[0].url : ""}
              alt={albumBio.name}
            />
            <h1>{albumBio.name}</h1>
            <h2>
              By{" "}
              <Link to={`/artist/${albumBio.artists[0].id}`}>
                {albumBio.artists[0].name}
              </Link>
            </h2>
            <button className="spotifyButton">
              <a href={albumBio.external_urls.spotify} target="_blank">
                Listen on Spotify
              </a>
            </button>
            <h2>Label: {albumBio.label}</h2>
            <h3>Popularity: {albumBio.popularity}</h3>
            <h3>Total Tracks: {albumBio.total_tracks}</h3>
          </div>
        ) : null}
      </div>
      <div>
        <table className="albumTracks">
          <thead>
            <tr>
              <th>Song</th>
              <th>Track Number</th>
              <th>Track Duration</th>
              <th>Track Preview</th>
              <th>Spotify link</th>
              <th>Song Profile</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track) => {
              return (
                <tr key={track.id}>
                  <td>{track.name}</td>
                  <td>{track.track_number}</td>
                  <td>{duration(track.duration_ms)}</td>
                  <td>
                    {track.preview_url ? (
                      <audio
                        src={track.preview_url}
                        controls
                        className="audioControl"
                      />
                    ) : (
                      <span>Preview not available</span>
                    )}
                  </td>
                  <td>
                    <button className="spotifyButton">
                      <a href={track.external_urls.spotify} target="_blank">
                        Listen
                      </a>
                    </button>
                  </td>
                  <td>
                    <button className="spotifyButton">
                      <Link to={`/tracks/${track.id}`}>Profile</Link>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AlbumProfile;
