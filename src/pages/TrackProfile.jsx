import { Text, Title } from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import TrackCard from "../components/TrackCard";
import { SpotifyContext } from "../contexts/SpotifyContext";

const TrackProfile = () => {
  const { trackId } = useParams();
  const { token, logout } = useContext(SpotifyContext);
  const [track, setTrack] = useState();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [lyrics, setLyrics] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const audio = document.querySelectorAll(".audioControl");
    audio.forEach((audio) => (audio.volume = 0.01));
    grabLyrics();
  }, [track]);

  useEffect(() => {
    trackInfo();
  }, [trackId]);

  console.log("track", track);
  return (
    <>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : undefined}
      {track ? (
        <div style={{ textAlign: "center" }}>
          <TrackCard track={track} album={track.album} />

          {isLoading ? (
            <div className="lds-spinner" style={{ margin: "2em" }}>
              Lyrics are loading...
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
          ) : !lyrics ? (
            <Text>Unable to fetch lyrics for current track</Text>
          ) : (
            <>
              <Title m="sm">Lyrics:</Title>
              <Text
                style={{ whiteSpace: "pre-line", textAlign: "center" }}
                mb="sm"
                c="#fff"
              >
                {lyrics}
              </Text>
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default TrackProfile;
