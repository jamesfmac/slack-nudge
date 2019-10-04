import React from "react";
import {Row, Container } from "react-bootstrap";


import TemplateForm from "../components/TemplateForm";
import { showError, showSuccess, showInfo } from "../components/toasts/Toast";
import { ToastContainer } from "react-toastify";


class Home extends React.Component {

handleApplyTemplate = formState => {
    this.setState({
      ...formState
    });
  };
 
    
  render() {
  
    return (
      <Container fluid = {false} >
        <ToastContainer />
       
       
        <Row >
            <TemplateForm
              template = {this.props.match.params.id}
              showError={showError}
              showSuccess={showSuccess}
              showInfo={showInfo}
              user = {this.props.user}
            />
        </Row>
      </Container>
    );
  }
}

export default Home;
