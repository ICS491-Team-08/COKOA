import React from "react";
import { Meteor } from "meteor/meteor";
import {
  Container,
  Header,
  Loader,
  Form,
  Grid,
  Segment,
} from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Stuffs, Info } from "../../api/stuff/Stuff";

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    console.log(this.props.info[0])
    console.log(this.props.info.gender)
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Edit my status
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Name"
                  id="signup-form-password"
                  name="name"
                  placeholder="Your name"
                  onChange={this.handleChange}
                  value={this.props.info[0].name}
                  disabled
                />
                <Form.Group widths="equal">
                  <Form.Field
                    label="Gender"
                    control="select"
                    onChange={this.genderOnChange}
                    value={this.props.info[0].gender}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Field>
                </Form.Group>
                <Form.Group inline="true">
                  <label>Are you vaccinated?</label>
                  <Form.Radio
                    label="Yes"
                    value={true}
                    name="vaccinated"
                    checked={this.props.info[0].vaccinated}
                    onChange={this.handleChange}
                  />
                  <Form.Radio
                    label="No"
                    value={false}
                    name="vaccinated"
                    checked={!this.props.info[0].vaccinated}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Input
                  label="what type of vaccine did you recieve? (optional)"
                  id="signup-form-password"
                  name="vaccineType"
                  placeholder="e.g. Pfizer, Moderna, Johnson and Johnson"
                  value={this.props.info[0].vaccineType}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="What is the lot number (optional)"
                  id="signup-form-password"
                  name="vaccineLot"
                  placeholder="1001-101"
                  value={this.props.info[0].vaccineLot}
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit" />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListStuff.propTypes = {
  info: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Info.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const info = Info.collection.find({}).fetch();
  console.log(info)
  return {
    info,
    ready,
  };
})(ListStuff);
