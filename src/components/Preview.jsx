import React from 'react'
import Marked from 'marked'
import styled from 'styled-components'
Marked.setOptions({
    breaks: true
});

const PreviewDiv = styled.div`
padding: .375rem .75rem;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
color: #495057;
background-color: #fff;
background-clip: padding-box;
border: 1px solid #ced4da;
border-radius: .25rem;
transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`
const Label = styled.div`
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
color: #212529;
text-align: left;
display: inline-block;
margin-bottom: .5rem;


`

class Preview extends React.Component{

    constructor(props){
        super(props)
        
        this.createMarkup = this.createMarkup.bind(this)
    
      }

    createMarkup() {
        return {__html: Marked(this.props.input)};
      }
    render(){
        return (
            <div>
                <Label>Preview</Label>
                <PreviewDiv 
                    id = "preview"
                    dangerouslySetInnerHTML={this.createMarkup()}
                /> 
            </div>

        )
    }
}

export default Preview
