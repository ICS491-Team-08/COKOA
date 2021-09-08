import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
//import { Profiles } from '../../api/profile/Profile';
import { UserInfo } from '../../api/userinfo/UserInfo';

const bridge = new SimpleSchema2Bridge(UserInfo.schema);

/** Renders the Page for editing a single document. */
class MyProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { firstName, lastName, gender, vaccine } = data;
    UserInfo.collection.update(_id, { $set: { firstName, lastName, gender, vaccine } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
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
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <SelectField name='gender'/>
                <SelectField name='vaccine'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='user'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
MyProfile.propTypes = {
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
  const subscription = Meteor.subscribe('UserInfo');
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = UserInfo.findOne(documentId);
  return {
    doc,
    ready,
  };
})(MyProfile);
