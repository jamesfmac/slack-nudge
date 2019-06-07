import React from "react";

import Home from "./pages/Home.js";
import { Page404 } from "./pages/404";
import Login from "./pages/Login";
import Outbox from "./pages/Outbox"
import Templates from "./pages/Templates"

import { Route, Link, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { Firebase, fireAuth, provider } from "./utils/firebase";
import PrivateRoute from "./utils/PrivateRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("authUser"))
    };
  }

 
  login = () => {
    fireAuth.signInWithRedirect(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
    });
  };

  handleSignIn = history => () => {
    return fireAuth.signInWithRedirect(provider).then(() => {
      console.log("pushing to /");
      return history.push("/");
    });
  };

  logout = () => {
    fireAuth.signOut().then(() => {
      this.setState({
        user: null
      });
      localStorage.removeItem("authUser");
    });
  };

  componentDidMount() {

    fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("authUser", JSON.stringify(user));
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={() => (
              <Login login={this.login} authed={this.state.user != null} />
            )}
          />
          <PrivateRoute
            authed={this.state.user}
            exact={true}
            path="/"
            component={() => (
              <Home logout={() => this.logout} user={this.state.user} />
            )}
          />
            <PrivateRoute
            authed={this.state.user}
            exact={true}
            path="/outbox"
            component={() => (
              <Outbox logout={() => this.logout} user={this.state.user} />
            )}
          />
            <PrivateRoute
            authed={this.state.user}
            exact={true}
            path="/templates"
            component={() => (
              <Templates logout={() => this.logout} user={this.state.user} />
            )}
          />

          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
