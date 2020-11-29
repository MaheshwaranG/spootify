import React from "react";
import { Route, Redirect } from "react-router-dom";
import { RouterPropsIF } from "./types";

const RouterComponent = (props: RouterPropsIF) => {
  return (
    <Route
      exact={props.exact}
      path={props.path}
      render={() => {
        if (props.redirect && props.loggedIn == props.redirectCondition) {
          return <Redirect to={props.redirectPath} />;
        }
        return <props.component />;
      }}
    />
  );
};

export default RouterComponent;
