import React from "react";
import {
  Table,
  OverlayTrigger,
  Tooltip,
  Badge,
  Spinner,
  Row,
  Col
} from "react-bootstrap";
import { Heading } from "../components/Styled";
import Moment from "react-moment";
import { db } from "../utils/firebase";

class MessageTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      messages: []
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
            <OverlayTrigger
              key={`overlay-${message.key}`}
              placement="top"
              overlay={
                <Tooltip key={`tooltip-${message.key}`}>
                  {message.response.status !== 200
                    ? message.response.data.message
                    : message.response.data}
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
          </td>
          <td>{message.recipients}</td>
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
        </Col>
        {isLoading ? (
        <Spinner animation="border" />) : (
        <Col md={{ span: 9 }}>
          <Table striped hover>
            <thead>
              <tr>
                <th>Sent</th>
                <th>Status</th>
                <th>Recipients</th>
                <th>Author</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </Table>
        </Col>
        )}
      </Row>
    );
  }
}

export default MessageTable;
