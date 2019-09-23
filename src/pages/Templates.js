import React from "react";
import {Row, Col, Container } from "react-bootstrap";
import Header from "../components/Header"
import TemplateTable from "../components/TemplateTable"
import { Heading } from "../components/Styled"

import TemplateForm from "../components/TemplateForm";
import { showError, showSuccess, showInfo } from "../components/toasts/Toast";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {

  render() {
    return (
      <Container fluid = {false} >
        <ToastContainer />
        
        

        <Row>
          <Col>
            <Header user = {this.props.user} logout = {this.props.logout} />
          </Col>
        </Row>
       

        <Row style={{marginTop: "20px",}} >
        <Col md={{ span: 3 }}>
          
              <Heading>
                Templates <FontAwesomeIcon icon={faLayerGroup} />
              </Heading>
           
          </Col>
        <TemplateTable history ={this.props.history}/>
        </Row>
      </Container>
    );
  }
}

export default Home;
