import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SpotifyContext } from "../contexts/SpotifyContext";

const TrackProfile = () => {
  const { trackId } = useParams();
  const { token, logout } = useContext(SpotifyContext);
  const [track, setTrack] = useState();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [lyrics, setLyrics] = useState();

  const trackInfo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrack(data);
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

  const grabLyrics = async () => {
    if (track) {
      try {
        const response = await axios.get(
          `https://some-random-api.com/lyrics/?title=${track.name.trim()}/`
        );
        setLyrics(response.data.lyrics);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const duration = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
  };

  useEffect(() => {
    const audio = document.querySelectorAll(".audioControl");
    audio.forEach((audio) => (audio.volume = 0.01));
    grabLyrics();
  }, [track]);

  useEffect(() => {
    trackInfo();
  }, [trackId]);

  return (
    <>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : undefined}
      {track ? (
        <div className="bandBio">
          <img
            src={track.album.images ? track.album.images[0].url : ""}
            alt={track.album.name}
          />
          <h1>{track.name}</h1>

          <Link to={`/artist/${track.artists[0].id}`}>
            <h1>{track.artists[0].name}</h1>
          </Link>
          <p>
            From the album:{" "}
            <Link to={`/albums/${track.album.id}`}>{track.album.name}</Link>
          </p>
          <p>Duration: {duration(track.duration_ms)}</p>
          <p>Popularity: {track.popularity}</p>
          {track.preview_url ? (
            <audio src={track.preview_url} controls className="audioControl" />
          ) : (
            <span>Preview not available</span>
          )}
          <button className="spotifyButton" type="button">
            <a href={track.external_urls.spotify} target="_blank">
              Listen on Spotify
            </a>
          </button>
          {lyrics ? (
            <>
              <h2>Lyrics:</h2>
              <p style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                {lyrics}
              </p>
            </>
          ) : (
            <div className="lds-spinner" style={{ margin: "2em" }}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default TrackProfile;
