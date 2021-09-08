import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  dob: String,
  gender: {
    type: String,
    allowedValues: ['Would rather not say', 'Male', 'Female', 'Etc'],
    defaultValue: 'Would rather not say',
  },
  address: String,
  status: {
    type: String,
    allowedValues: ['Not Sure', 'Positive', 'Negative'],
    defaultValue: 'Not Sure',
  },
  vaccination: {
    type: String,
    allowedValues: ['Yes, I am fully vaccinated', 'I only got 1st shot', 'No, I am not vaccinated'],
    defaultValue: 'Yes, I am fully vaccinated',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, dob, gender, address, status, vaccination } = data;
    const owner = Meteor.user().username;

    console.log(this.props.stuffs.length);

    if(this.props.stuffs.length !== 0){
      alert("Your profile is already registered!");
    }

    else {Stuffs.collection.insert({ name, dob, gender, address, status, vaccination, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
    }
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Your Profile</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='name'/>
              <TextField name='dob' label='Date of Birth' placeholder='DD/MM/YYYY'/>
              <SelectField name='gender'/>
              <TextField name='address' placeholder='ex) 1113 Sunshine St apt 303, Honolulu, HI, 96814'/>
              <SelectField name='status' label='COVID Status'/>
              <SelectField name='vaccination'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddStuff.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(AddStuff);
