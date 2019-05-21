import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Header from "./components/Header";
import MessageForm from "./components/MessageForm";

const globalStyles = {

    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '1rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    lineHeight: '1.75',
    letterSpacing: '0.00938em'

}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid={false} style = {globalStyles}>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }} xs={{ span: 12 }}>
            <MessageForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
