import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import Header from "./components/Header";
import MessageForm from "./components/MessageForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid={false}>
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
