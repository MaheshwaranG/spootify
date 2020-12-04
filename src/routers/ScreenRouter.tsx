import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivatePathList from "./PrivatePathList";
import PublicPathList from "./PublicPathList";
import RouterComponent from "./RouterComponent";
import { Box, Heading } from "grommet";

interface PropsIF {
  loggedIn: boolean;
}

const ScreenRouter = (props: PropsIF) => {
  return (
    <Router>
      <Switch>
        {PublicPathList.map((route, index) => {
          return (
            <RouterComponent
              key={`private-${index}`}
              {...route}
              loggedIn={props.loggedIn}
            />
          );
        })}
        {PrivatePathList.map((route, index) => {
          return (
            <RouterComponent
              key={`private-${index}`}
              {...route}
              loggedIn={props.loggedIn}
            />
          );
        })}
        <Route
          render={() => (
            <Box height="100%" width="100%" align="center" justify="center">
              <Heading level={1}>404! Page not found.</Heading>
            </Box>
          )}
        />
      </Switch>
    </Router>
  );
};

export default ScreenRouter;
