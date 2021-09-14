import React from 'react';
import { Grid, Segment, Header, Form, Select } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
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
  gender: {
    type: String,
    allowedValues: ['Male', 'Female', '3'],
  },
  vaccineType: {
    type: String,
    allowedValues: ['Pfizer', 'Moderna', 'Janssen', 'ETC', 'No vaccine'],
  },
  vaccineLot: {
    type: Number,
    optional: true,
  },
  vaccinated: {
    type: 'Boolean',
    optional: true,
  },
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
    const { firstName, lastName, gender, vaccineType, vaccineLot, vaccinated, vaccineCard } = data;
    const owner = Meteor.user().username;
    User.collection.insert({ firstName, lastName, gender, vaccineType, vaccineLot, vaccinated, vaccineCard, owner },
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
                <Form.Group inline="true">
                  <label>Are you vaccinated?</label>
                  <Form.Radio
                      label="Yes"
                      value={true}
                      name="vaccinated"
                  />
                  <Form.Radio
                      label="No"
                      value={false}
                      name="vaccinated"
                  />
                </Form.Group>
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
                      label="What vaccine did you get?"
                      name="vaccineType"
                      placeholder="Vaccine"
                      control={Select}
                  />
                </Form.Group>
                <TextField
                    label="What is the lot number? (optional)"
                    name="vaccineLot"
                    placeholder="1001-101"
                />
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
