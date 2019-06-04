import React from "react";
import {Row, Col, Button} from "react-bootstrap";
import Header from "../components/Header";
import { StyledContainer} from '../components/Styled'
import MessageForm from "../components/MessageForm";
import { showError, showSuccess, showInfo } from "../components/toasts/Toast";
import { ToastContainer } from "react-toastify";


class Home extends React.Component {

  render() {
    return (
      <StyledContainer fluid={true}>
        <ToastContainer />
        <Row>
          <Col>
            <Header user = {this.props.user} logout = {this.props.logout} />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }} xs={{ span: 10 }}>
            <MessageForm
              showError={showError}
              showSuccess={showSuccess}
              showInfo={showInfo}
            />
          </Col>
        </Row>
      </StyledContainer>
    );
  }
}

export default Home;
