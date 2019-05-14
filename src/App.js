import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Header from './components/Header' 
import Editor from './components/Editor' 
import Preview from './components/Preview'


function App() {
  return (
    <Container >
  
    <Header />
  
    <Row> 
      <Col >
    <Editor />
    </Col>
    <Col>
   <Preview />
    </Col>
    </Row>
    </Container>
  );
}

export default App;
