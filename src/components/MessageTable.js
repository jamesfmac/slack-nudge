import React from "react";
import {
  OverlayTrigger,
  Tooltip,
  Badge,
  Spinner,
  Row,
  Col,
  Form
} from "react-bootstrap";
import { Heading, StyledTable } from "../components/Styled";
import Moment from "react-moment";
import { db } from "../utils/firebase";

class MessageTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      messages: [],
      showTestBroadcasts: false,
      showFailedBroadcasts:true
    };
  }

  componentDidMount() {
    let messages = [];
    db.collection("messages")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {
            recipients,
            author,
            response,
            test,
            submittedAt,
            message
          } = doc.data();
          messages.push({
            key: doc.id,
            doc, // DocumentSnapshot
            recipients,
            author,
            response,
            test,
            submittedAt,
            message
          });
        });
        this.setState({
          isLoading: false,
          messages: messages
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    let isLoading = this.state.isLoading;

    const items = this.state.messages
      .filter(message => {
        if (this.state.showTestBroadcasts) {
          return message;
        } else {
          return message.test === false;
        }
      })
      .filter(message => {
        if (this.state.showFailedBroadcasts) {
          return message;
        } else {
          return message.response.status !== 500 || message.response.status === null;
        }
      })
      
      .sort(function(a, b) {
        return b.submittedAt - a.submittedAt;
      })
      .map(message => (
        <tr key={message.key}>
          <td>
            <Moment unix fromNow>
              {message.submittedAt}
            </Moment>
          </td>
        
          <td>
         {message.response ? (
            <OverlayTrigger
              key={`overlay-${message.key}`}
              placement="top"
         
              overlay={
                
                <Tooltip key={`tooltip-${message.key}`}>
                  {message.response.status !== 200
                    ? `Error: ${message.response.data.error} Message: ${message.response.data.message}`
                    : message.response.data}:
                    null
                </Tooltip>
            
              }
            >
              <Badge
                pill
                variant={message.response.status !== 200 ? "danger" : "success"}
              >
                {message.response.status}
              </Badge>
            </OverlayTrigger>
         ) : null}
          </td>
          <td>
          {message.test? <span><Badge variant='info'>Test</Badge> </span>:null}
            {message.recipients.map(recipient => (
              <span key={`message-${message.idmessage} recipient- ${recipient}`}>{recipient} </span>
            ))}
          </td>
          <td>{message.author}</td>
          <td>{message.message.text}</td>
        </tr>
      ));

    return (
      <Row>
        <Col md={{ span: 3 }}>
          <Row>
            <Col>
              <Heading>Outbox</Heading>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Check
                  type="checkbox"
                  id="checkbox-showTestBroadcasts"
                  label="Include test broadcasts"
                  checked={this.state.showTestBroadcasts}
                  onChange={e =>
                    this.setState({ showTestBroadcasts: e.target.checked })
                  }
                />
                   <Form.Check
                  type="checkbox"
                  id="checkbox-showTestBroadcasts"
                  label="Include failed broadcasts"
                  checked={this.state.showFailedBroadcasts}
                  onChange={e =>
                    this.setState({ showFailedBroadcasts: e.target.checked })
                  }
                />
              </Form>
            </Col>
          </Row>
        </Col>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <Col md={{ span: 9 }}>
            <StyledTable striped hover borderless style={{boShadow:'1px 1px 1px #999'}}>
              <thead>
                <tr>
                  <th>Sent</th>
                  <th>Status</th>
                  <th style={{width: '200px'}}>Recipients</th>
                  <th>Author</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </StyledTable>
          </Col>
        )}
      </Row>
    );
  }
}

export default MessageTable;
