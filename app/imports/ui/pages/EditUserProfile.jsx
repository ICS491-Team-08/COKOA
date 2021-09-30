import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Grid,
  Loader,
  Header,
  Segment,
  Select,
  Form,
} from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  SelectField,
  SubmitField,
  TextField,
  DateField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { User } from '../../api/user/User';
import UploadImg from '../components/UploadImg';

const bridge = new SimpleSchema2Bridge(User.schema);

/** Renders the Page for editing a single document. */
class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false, birthDate: '' };
    this.imgType = React.createRef('');
    //this.modelTransform = this.modelTransform.bind(this);
    //this.disableFirstField = this.disableFirstField.bind(this);
    //this.disableSecondField = this.disableSecondField.bind(this);
  }

  userUpdate({ id, data }) {
    const type = this.imgType.current.imgTypeRef.current;
    if (id === 'new') {
      User.collection.insert(
        {
          ...data,
          owner: Meteor.user().username,
          imgType: type || data.imgType,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'User Profile Added Successfully', 'success');
            this.setState({ redirectToReferer: true });
          }
        },
      );
    } else {
      User.collection.update(
        id,
        { $set: { ...data, imgType: type || data.imgType } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'User Profile Updated', 'success');
            this.setState({ redirectToReferer: true });
          }
        },
      );
    }
  }

  // On successful submit, insert the data.
  submit(data) {
    this.userUpdate({ id: this.props.documentId, data });
  }

  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const { from } = this.props.location.state || {
      from: { pathname: '/userProfile' },
    };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from} />;
    }
    return (
      <Grid centered className="edit-profile-container">
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Edit Profile
          </Header>
          <AutoForm
            schema={bridge}
            onSubmit={(data) => this.submit(data)}
            model={this.props.doc}
           // modelTransform={this.modelTransform}
          >
            <Segment>
              <TextField name="firstName" />
              <TextField name="lastName" />

              <Form.Group widths="equal">
                <SelectField
                  fluid
                  label="Gender"
                  name="gender"
                  placeholder="Gender"
                  control={Select}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <DateField
                  name="birthDate"
                  label="Date of Birth"
                  //disabled={this.disableFirstField()}
                  max={new Date(2021, 1, 1)}
                  min={new Date(1900, 1, 1)}
                  //timeFormat="ampm"
                />
              </Form.Group>

              <UploadImg id={this.props.documentId} ref={this.imgType} />
              <SubmitField value="Submit" style={{ width: '100%' }} />
              <ErrorsField />
              <HiddenField name="owner" />
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
  return {
    doc,
    ready,
    documentId,
  };
})(EditUserProfile);
