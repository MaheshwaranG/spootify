import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivatePathList from "./PrivatePathList";
import PublicPathList from "./PublicPathList";
import RouterComponent from "./RouterComponent";

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
      </Switch>
    </Router>
  );
};

export default ScreenRouter;
