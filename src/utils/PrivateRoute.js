
import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = function({ component: Component, authed, ...rest }) {

  
    return (
  
      <Route
      {...rest}
        render={props =>
          authed != null ? (
            <Component {...props} {...rest} />
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