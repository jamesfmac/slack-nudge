
import React from 'react'
import {Route, Redirect} from 'react-router-dom'

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

  export default PrivateRoute