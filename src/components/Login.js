import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { StyledContainer } from "../components/Styled";
import {Redirect} from 'react-router-dom'

export const Login = props => {

console.log(`login thinks: ${props.authed? true : false}`)
  if (props.authed) {
    return <Redirect to='/' />
  }
  return (
    <StyledContainer>
      <Row>
        <Col>
          <Button
            variant="primary"
            onMouseDown={e => e.preventDefault()}
            onClick={props.login}
          >
            {" "}
            Log in with google
          </Button>
        </Col>
      </Row>
    </StyledContainer>
  );
};
