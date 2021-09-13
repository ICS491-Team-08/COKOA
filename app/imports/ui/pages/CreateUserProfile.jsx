import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { User } from '../../api/user/User';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  gender: String,
  vaccineType: String,
  vaccineLot: Number,
  vaccineCard: {
    type: 'String',
    defaultValue: 'https://bloximages.chicago2.vip.townnews.com/greenevillesun.com/content/tncms/assets/v3/editorial/9/f5/9f58c8e7-41c2-58d7-99a8-90bddda28675/60cc8afe6a1e0.image.png',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, gender, vaccineType, vaccineLot, vaccineCard } = data;
    const owner = Meteor.user().username;
    User.collection.insert({ firstName, lastName, gender, vaccineType, vaccineLot, vaccineCard, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            this.setState({ redirectToReferer: true });
          }
        });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    const { from } = this.props.location.state || { from: { pathname: '/userprofile' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Grid container centered className="orangebg">
          <Grid.Column>
            <Header as="h2" textAlign="center">Create Profile</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='vaccineCard'/>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <TextField name='gender'/>
                <TextField name='vaccineType'/>
                <TextField name='vaccineLot'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}
CreateUserProfile.propTypes = {
  location: PropTypes.object,
};
export default CreateUserProfile;
