import React, { Component } from "react";
import { Store } from "redux";
import ScreenRouter from "./routers/ScreenRouter";
import { StoreType } from "./store/redux/redux-store";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getToken, fetchUser, setToken } from "./store/redux/actions/auth";
import "./styles/main.css";

interface PropsIF {
  loggedIn: boolean;
  token: string | undefined;
  setToken: (token: string) => any;
  fetchUser: () => any;
}

interface OwnStateIF {}

class App extends Component<PropsIF, OwnStateIF> {
  constructor(props: PropsIF) {
    super(props);
  }

  componentDidMount() {
    const token: string = getToken();
    if (!!token) {
      // this.setState({ token: token });
      this.props.setToken(token);
      this.props.fetchUser();
    }
  }

  render() {
    return (
      <div>
        <ScreenRouter loggedIn={this.props.loggedIn} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  return {
    loggedIn: state.auth.loggedIn,
    token: state.auth.accessToken,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    setToken: (token: string) => dispatch(setToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
