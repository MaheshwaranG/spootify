import React, { Component } from "react";
import { Store } from "redux";
import ScreenRouter from "./routers/ScreenRouter";
import { StoreType } from "./store/redux/redux-store";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  fetchUser,
  setAccessToken,
} from "./store/redux/actions/auth-dispatch-creators";
import { getToken } from "./services/auth/common";
import constants from "./constants";
import "./styles/main.css";

interface PropsIF {
  loggedIn: boolean;
  stateChanged: boolean;
  setAccessToken: (token: string) => any;
  fetchUser: () => any;
}

interface OwnStateIF {
  isFetched: boolean;
  stateChanged: boolean;
}

class App extends Component<PropsIF, OwnStateIF> {
  constructor(props: PropsIF) {
    super(props);
    this.state = {
      isFetched: false,
      stateChanged: false,
    };
  }

  static getDerivedStateFromProps(props: PropsIF, state: OwnStateIF) {
    if (props.stateChanged != state.stateChanged) {
      return {
        isFetched: true,
        stateChanged: props.stateChanged,
      };
    }
    if (!state.isFetched) {
      const token: string =
        localStorage.getItem(constants.ACCESS_TOKEN_NAME) || getToken();
      if (!!token) {
        props.setAccessToken(token);
        props.fetchUser();
      } else {
        return {
          isFetched: true,
        };
      }
    }
    return null;
  }

  render() {
    return (
      <>
        {this.state.isFetched ? (
          <ScreenRouter loggedIn={this.props.loggedIn} />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  return {
    loggedIn: state.auth.loggedIn,
    stateChanged: state.auth.stateChanged,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    setAccessToken: (accessToken: string) =>
      dispatch(setAccessToken(accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
