import React from "react";
import { Grid, Loader, Header, Segment, Form } from "semantic-ui-react";
import swal from "sweetalert";
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
} from "uniforms-semantic";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import { Stuffs, Info } from "../../api/stuff/Stuff";

const bridge = new SimpleSchema2Bridge(Stuffs.schema);

/** Renders the Page for editing a single document. */
class EditStuff extends React.Component {
  // On successful submit, insert the data.
  submit(data) {
    const { name, quantity, condition, _id } = data;
    Stuffs.collection.update(
      _id,
      { $set: { name, quantity, condition } },
      (error) =>
        error
          ? swal("Error", error.message, "error")
          : swal("Success", "Item updated successfully", "success")
    );
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid centered style={{width: "40rem"}}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Edit Stuff
          </Header>
          <AutoForm
            schema={bridge}
            onSubmit={(data) => this.submit(data)}
            model={this.props.doc}
          >
            <Segment>
              <TextField name="name" />
              <NumField name="quantity" decimal={false} />
              <SelectField name="condition" />
              <ErrorsField />
              <HiddenField name="owner" />
          
              <Form.Group inline="true">
                <label>Are you vaccinated?</label>
                <Form.Radio
                  label="Yes"
                  value={true}
                  name="vaccinated"
                  checked={this.props.info.vaccinated}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label="No"
                  value={false}
                  name="vaccinated"
                  checked={!this.props.info.vaccinated}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Input
                label="what type of vaccine did you recieve? (optional)"
                id="signup-form-password"
                name="vaccineType"
                placeholder="e.g. Pfizer, Moderna, Johnson and Johnson"
                onChange={this.handleChange}
              />
              <Form.Input
                label="What is the lot number (optional)"
                id="signup-form-password"
                name="vaccineLot"
                placeholder="1001-101"
                onChange={this.handleChange}
              />
              <SubmitField value="Submit" />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditStuff.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  info: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  const subscription2 = Meteor.subscribe(Info.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the document
  const doc = Stuffs.collection.findOne(documentId);
  const info = Info.collection.find({}).fetch();
  return {
    doc,
    ready,
    info,
  };
})(EditStuff);