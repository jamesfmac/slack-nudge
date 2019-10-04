import React from "react";
import {
  OverlayTrigger,
  Tooltip,
  Badge,
  Row,
  Col,
  Form
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Moment from "react-moment";

import { Heading, StyledTable } from "../components/Styled";

import { db } from "../utils/firebase";

class MessageTable extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      messages: [],
      showTestBroadcasts: false,
      showFailedBroadcasts: true
    };
  }

  onCollectionUpdate = querySnapshot => {
    const messages = [];
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
  };

  componentDidMount() {
    //subscribe to changes on the messages collection
    this.unsubscribe = db
      .collection("messages")
      .onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    //remove subscription 
    this.unsubscribe();
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
          //handle records missing responses

          if (message.response) {
            return (
              message.response.status === 200 ||
              message.response.status === null
            );
          } else {
            return message;
          }
        }
      })
      .sort(function(a, b) {
        return b.submittedAt - a.submittedAt;
      })
      .map(message => (
        <tr key={message.key}>
          <td>
            <OverlayTrigger
              key={`overlay-sent-${message.key}`}
              placement="top"
              overlay={
                <Tooltip key={`tooltip-sent-${message.key}`}>
                  <Moment unix>{message.submittedAt}</Moment>
                </Tooltip>
              }
            >
              <Moment unix fromNow>
                {message.submittedAt}
              </Moment>
            </OverlayTrigger>
          </td>

          <td style={{ width: "120px" }}>
            {message.response ? (
              <OverlayTrigger
                key={`overlay-${message.key}`}
                placement="top"
                overlay={
                  <Tooltip key={`tooltip-${message.key}`}>
                    {message.response.status !== 200
                      ? `Error: ${message.response.data.error} Message: ${message.response.data.message}`
                      : message.response.data}
                    : null
                  </Tooltip>
                }
              >
                <Badge
                  pill
                  variant={
                    message.response.status !== 200 ? "danger" : "success"
                  }
                >
                  {message.response.status}
                </Badge>
              </OverlayTrigger>
            ) : null}
            {message.test ? (
              <span>
                <span> </span>
                <Badge pill variant="info">
                  Test
                </Badge>{" "}
              </span>
            ) : null}
          </td>
          <td>
            {message.recipients.map(recipient => (
              <span
                key={`message-${message.idmessage} recipient- ${recipient}`}
              >
                {recipient}{" "}
              </span>
            ))}
          </td>
          <td>{message.author}</td>
          <td style={{ width: "250px" }}>{message.message.text}</td>
        </tr>
      ));

    let skeletonRows = Array(20).fill(
      <tr>
        <td>
          <Skeleton width={40} />
        </td>
        <td>
          <Skeleton width={40} />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
      </tr>
    );

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

        <Col md={{ span: 9 }}>
          <StyledTable striped borderless>
            <thead>
              <tr>
                <th>Sent</th>
                <th>Status</th>
                <th style={{ width: "200px" }}>Recipients</th>
                <th>Author</th>
                <th>Message</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>{skeletonRows}</tbody>
            ) : (
              <tbody style={{ fontSize: ".85rem" }}>{items}</tbody>
            )}
          </StyledTable>
        </Col>
      </Row>
    );
  }
}

export default MessageTable;
