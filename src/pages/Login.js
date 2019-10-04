import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { StyledContainer } from "../components/Styled";
import LoginButton from "../components/LoginButton";


class Login extends React.Component {
  render(){

    return (
      <StyledContainer className = "h100">
        <Row className >
          <Col md={{span:4, offset:4}} sm={{span:6, offset:3}}>
            <Card  className="text-center" style={{marginTop: "25%"}}>
              
              <Card.Body>
                <Card.Title>LOG IN</Card.Title>
                
                <LoginButton login ={this.props.login} authed = {this.props.authed} />
              </Card.Body>
              <Card.Footer className="text-muted">Accessible only to stratejos.ai google accounts</Card.Footer>
            </Card>
          </Col>
        </Row>
      </StyledContainer>
    );
  }
}

export default Login;
