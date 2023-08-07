import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SpotifyContext } from "../contexts/SpotifyContext";
import { Container } from "@mantine/core";
import { Flex } from "@mantine/core";

const NavBar = () => {
  const { token, logout, clientId, redirectUri, authEndpoint, responseType } =
    useContext(SpotifyContext);
  return (
    <>
      <Flex
        mih={50}
        bg="RGB(29, 185, 84)"
        gap="xs"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <NavLink to="/">Home</NavLink>

        {!token ? (
          <a
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
          >
            Login to Spotify
          </a>
        ) : (
          <>
            <NavLink to="/artist-search">Artist Search</NavLink>

            <NavLink to="/album-search">Album search</NavLink>

            <NavLink to="/track-search">Song search</NavLink>

            <span className="navSpan" onClick={logout}>
              Logout
            </span>
          </>
        )}
      </Flex>
    </>
  );
};

export default NavBar;
