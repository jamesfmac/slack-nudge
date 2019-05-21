import React from 'react';
import Form from 'react-bootstrap/Form'

class Editor extends React.Component{
    


render(){
    return (
        <Form>
<Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Markdown</Form.Label>
    <Form.Control id = "editor"  as="textarea" rows="25" value =  {this.props.input} onChange = {this.props.onChange}/>
   
  </Form.Group>
        </Form> 
    )
}

}
export default Editor