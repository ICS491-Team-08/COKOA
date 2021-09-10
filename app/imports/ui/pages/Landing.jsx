import React from "react";
import { Card, Image, Icon, Button, Header } from "semantic-ui-react";

const Body = () => {
  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header>Vaccination Card Submission</Card.Header>
          <Card.Description>
            In order to verify your vaccination status, you need to submit your
            Vaccination Card
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Add Vaccination Card
            </Button>
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>Covid-19 Test Result Submission</Card.Header>
          <Card.Description>
            In order to verify your vaccination status, you need to submit your
            Vaccination Card
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Submit a Test Result
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="flex-center flex-column">
        <Card
          style={{
            display: "felx",
            "flex-direction": "row",
            width: "41rem",
            "flex-wrap": "wrap",
          }}
        >
          <Card.Content>
            <Image
              floated="left"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
            <Card.Header>Steve Sanders</Card.Header>
            <Card.Meta>Friends of Elliot</Card.Meta>
          </Card.Content>
          <Card.Content style={{ width: "27rem", "padding-left": "0rem" }}>
            <Card.Header>Virtual ID : H12345678</Card.Header>
            <Card.Meta>Covid-19 Vaccination Record Card</Card.Meta>
            <br />
            <Card.Description>
              <Icon name="check circle outline" size="large" color="green" />{" "}
              1st Dose of Covid-19
            </Card.Description>
            <br />
            <Card.Description>
              <Icon name="check circle outline" size="large" color="green" />{" "}
              2nd Dose of Covid-19
            </Card.Description>
            <br />
            <Card.Description>
              <Icon name="check circle outline" size="large" color="green" />{" "}
              Verified with Virtual ID
            </Card.Description>
            <br />
            <Card.Description>
              <Icon name="x" size="large" color="red" /> Covid-19 test within 2
              weeks
            </Card.Description>
          </Card.Content>
          <Image
            style={{ position: "absolute", right: "0", top: "3rem" }}
            floated="right"
            size="small"
            src="data:image/png;base64,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"
          />
          <Card.Content extra style={{ width: "41rem" }}>
            <Card.Description style={{ color: "red" }}>
              *Fraudulent of Virtual ID is subjected to a crime of{" "}
              <strong> Identity Fraud</strong>
            </Card.Description>
          </Card.Content>
        </Card>
        <br />
        <Header as="h1">Action Required</Header>
        <br />
        <br />
        <Body />
      </div>
    );
  }
}

export default Landing;
