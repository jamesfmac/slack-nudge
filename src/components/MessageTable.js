import React from "react";
import {
  Table,
  OverlayTrigger,
  Tooltip,
  Badge,
  Spinner
} from "react-bootstrap";
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
          <td>{new Date(message.submittedAt).toLocaleString()}</td>
          <td>{message.recipients}</td>
          <td>{message.author}</td>
          <td>{message.message.text}</td>
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
          <td>{message.key}</td>
        </tr>
      ));

    return isLoading ? (
      <Spinner animation="border" />
    ) : (
      <Table striped hover>
        <thead>
          <tr>
            <th>Sent</th>
            <th>Recipients</th>
            <th>Author</th>
            <th>Message</th>
            <th>Status</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default MessageTable;
