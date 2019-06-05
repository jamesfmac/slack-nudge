import React from "react";

import Home from "./pages/Home.js";
import { Page404 } from "./components/Page404";
import { Login } from "./components/Login";

import { Route, Link, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { Firebase, fireAuth, provider } from "./utils/firebase";
import PrivateRoute from './utils/PrivateRoute'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('authUser'))
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
      return history.push("/");
    });
  };

  logout = () => {
    console.log(`Logging out`);
    fireAuth.signOut().then(() => {
      this.setState({
        user: null
      });
      localStorage.removeItem('authUser');
    });
  };

  componentDidMount() {
    console.log("mounted");
    fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('authUser', JSON.stringify(user));
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

          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
