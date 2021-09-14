import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Loader, Header, Segment, Select, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { User } from '../../api/user/User';

const bridge = new SimpleSchema2Bridge(User.schema);

/** Renders the Page for editing a single document. */
class EditUserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  // On successful submit, insert the data.
  submit(data) {
    const { firstName, lastName, gender, vaccineType, vaccineLot, vaccineCard } = data;
    User.collection.update(this.props.documentId, { $set: { firstName, lastName, gender, vaccineType, vaccineLot, vaccineCard } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'User Profile Updated', 'success');
        this.setState({ redirectToReferer: true });
      }
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/userprofile' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='vaccineCard'/>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <Form.Group widths='equal'>
                <SelectField
                    fluid
                    label="Gender"
                    name="gender"
                    placeholder="Gender"
                    control={Select}
                />
                <SelectField
                    fluid
                    label="what vaccine did you get?"
                    name="vaccineType"
                    placeholder="Vaccine"
                    control={Select}
                />
              </Form.Group>
              <TextField name='vaccineLot'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditUserProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  documentId: PropTypes.string,
  location: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(User.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = User.collection.findOne(documentId);
  console.log(doc);
  return {
    doc,
    ready,
    documentId,
  };
})(EditUserProfile);
