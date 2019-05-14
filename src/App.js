import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Header from './components/Header' 
import Editor from './components/Editor' 
import Preview from './components/Preview'



class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      input: "# MD Previewer!\n ## Built with...\n![React](/img/reactLogo.png)  ![Bootstrap Logo](/img/BoostrapLogo.png)    ![Styled Components Logo](/img/StyledComponentsLogo.png)\n      \nInline code with backticks, \n      `<div></div>` \n\nMulti-line code with triple backticks\n```\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == ) {\n    return multiLineCode;\n  }\n}\n```  \nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\n      \n > Block Quotes...\n\nSpecial thanks to: \n- [Marked.js](https://github.com/markedjs/marked)\n- [Free Code Camp](https://freecodecamp.org)"
    }
    this.handleChange = this.handleChange.bind(this)

  }
  handleChange(e){
  
    this.setState({
      input: e.target.value
    }
    )
  }

render() {
  return (
    <Container >
  
    <Header />
  
    <Row> 
      <Col >
    <Editor input = {this.state.input} onChange = {this.handleChange}/>
    </Col>
    <Col>
   <Preview input = {this.state.input} />
    </Col>
    </Row>
    </Container>
  );
}
}

export default App;
