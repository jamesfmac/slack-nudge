import React from "react";
import { Button} from "react-bootstrap";
import { Redirect } from "react-router-dom";


class LoginButton extends React.Component {
  render() {
    console.log(`login thinks: ${this.props.authed ? true : false}`);
    if (this.props.authed) {
      return <Redirect to="/" />;
    }

    return (
      <Button
        variant="primary"
        onMouseDown={e => e.preventDefault()}
        onClick={this.props.login}
      >
        {" "}
        Log in with google
      </Button>
    );
  }
}

export default LoginButton;
