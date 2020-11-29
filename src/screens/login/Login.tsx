import React, { useCallback } from "react";
import { Box, Image, Button } from "grommet";
import { logInWithSpotify } from "../../store/redux/actions/auth";
import background from "asset/images/login/background-1.svg";
import Spotyicon from "asset/favicons/favicon.png";
interface PropsIF {}

const Login = (props: PropsIF) => {
  const getSpotifyAccess = useCallback((event: any) => {
    logInWithSpotify();
  }, []);
  return (
    <Box
      height="100%"
      width="100%"
      overflow="hidden"
      style={{ position: "absolute" }}
    >
      <Image fit="cover" src={String(background)} className="full-screen" />
      <div className="center">
        <Button
          primary
          label="Login"
          icon={<img src={String(Spotyicon)} height={32} width={32} />}
          onClick={getSpotifyAccess}
        />
      </div>
    </Box>
  );
};

export default Login;
