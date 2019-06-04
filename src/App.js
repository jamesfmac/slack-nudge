import React from "react";

import Home from "./pages/Home.js";
import { Page404 } from "./components/Page404";
import { Login } from "./components/Login";

import { Route, Link, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { Firebase, fireAuth, provider } from "./utils/firebase";

const PrivateRoute = function({ component: Component, authed, ...rest }) {
  console.log(`authed: ${authed === true}`);
  return (
    <Route
      {...rest}
      render={props =>
        authed != null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Firebase.auth().currentUser
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

  logout = () => {
    console.log(`Logging out`);
    fireAuth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  };

  componentDidMount() {
    console.log('mounted')
    fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    console.log(`App thinks firebase is: ${fireAuth.currentUser}`);
    console.log(`App thinks current user is: ${this.state.user}`);
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={() => (
              <Login login={this.login} authed={fireAuth.currentUser} />
            )}
          />
          <PrivateRoute
            authed={fireAuth.currentUser}
            exact={true}
            path="/"
            component={() => (
              <Home logout={() => this.logout} user={this.state.user} />
            )}
          />

          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
