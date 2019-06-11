import * as React from 'react';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
 

class Basic extends React.Component{
  state = {
    emails: [],
  };
 
  render() {
    const { emails } = this.state;
 
    return (
      <>
       
        <ReactMultiEmail
          placeholder={this.props.placeholder}
          emails={emails}
        
          onChange={(_emails) => {
            this.setState({ emails: _emails });
          }}
          validateEmail={email => {
            return isEmail(email); // return boolean
          }}
          onKeyPress ={e => console.log(e.which)}
          getLabel={(
            email,
            index,
            removeEmail
          ) => {
            return (
              <div data-tag key={index}>
                {email}
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
              </div>
            );
          }}
        />
        
      </>
    );
  }
}
 
export default Basic;