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
import { Vac } from '../../api/vac/Vac';

const bridge = new SimpleSchema2Bridge(Vac.schema);

/** Renders the Page for editing a single document. */
class EditVaccineRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false, firstVaccineType: '' };
    this.imgType = React.createRef('');
    this.modelTransform = this.modelTransform.bind(this);
    this.disableFirstField = this.disableFirstField.bind(this);
    this.disableSecondField = this.disableSecondField.bind(this);
  }

  userUpdate({ id, data }) {
    const type = this.imgType.current;
    console.log(this.imgType);
    if (id === 'new') {
      Vac.collection.insert(
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
      Vac.collection.update(
        id,
        { $set: { ...data, imgType: type || data.imgType } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Vaccine Record Updated', 'success');
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

  componentDidUpdate(prev) {
    if (prev.doc?.firstVaccineType !== this.props.doc?.firstVaccineType) {
      this.setState({ firstVaccineType: this.props.doc.firstVaccineType });
    }
    if (prev.doc?.secondVaccineType !== this.props.doc?.secondVaccineType) {
      this.setState({ secondVaccineType: this.props.doc.secondVaccineType });
    }
  }

  modelTransform(mode, model) {
    if (mode === 'form') {
      if (model.firstVaccineType === 'No vaccine') {
        model.firstVaccineLot = '';
        model.firstDate = null;
        model.firstSite = '';
        this.state.firstVaccineType !== model.firstVaccineType &&
          this.setState({ firstVaccineType: 'No vaccine' });
      } else if (this.state.firstVaccineType === 'No vaccine') {
        this.setState({ firstVaccineType: '' });
      }

      if (model.secondVaccineType === 'No vaccine') {
        model.secondVaccineLot = '';
        model.secondDate = null;
        model.secondSite = '';
        this.state.secondVaccineType !== model.secondVaccineType &&
          this.setState({ secondVaccineType: 'No vaccine' });
      } else if (this.state.secondVaccineType === 'No vaccine') {
        this.setState({ secondVaccineType: '' });
      }
    }
    return model;
  }

  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  disableFirstField() {
    return this.state.firstVaccineType === 'No vaccine';
  }

  disableSecondField() {
    return this.state.secondVaccineType === 'No vaccine';
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const { from } = this.props.location.state || {
      from: { pathname: '/vaccineRecord' },
    };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from} />;
    }
    return (
      <Grid centered className="edit-vaccine-container">
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Edit Vaccine Record
          </Header>
          <AutoForm
            schema={bridge}
            onSubmit={(data) => this.submit(data)}
            model={this.props.doc}
            modelTransform={this.modelTransform}
          >
            <Segment>
              <Header
                as="h3"
                style={{ textAlign: 'center', padding: '1rem 0rem' }}
              >
                1st Dose of Covid-19
              </Header>
              <Form.Group widths="equal">
                <SelectField
                  fluid
                  label="Product Name/Manufacturer"
                  name="firstVaccineType"
                  placeholder="Vaccine Type"
                  control={Select}
                />
                <TextField
                  name="firstVaccineLot"
                  disabled={this.disableFirstField()}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <DateField
                  name="firstDate"
                  label="Date"
                  disabled={this.disableFirstField()}
                  max={new Date(2100, 1, 1)}
                  min={new Date(2000, 1, 1)}
                />
                <TextField
                  name="firstSite"
                  label="Healthcare Professional or Clinic Site"
                  disabled={this.disableFirstField()}
                />
              </Form.Group>

              <Header
                as="h3"
                style={{ textAlign: 'center', padding: '1rem 0rem' }}
              >
                2st Dose of Covid-19
              </Header>
              <Form.Group widths="equal">
                <SelectField
                  fluid
                  label="Product Name/Manufacturer"
                  name="secondVaccineType"
                  placeholder="Vaccine"
                  control={Select}
                />
                <TextField
                  name="secondVaccineLot"
                  disabled={this.disableSecondField()}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <DateField
                  name="secondDate"
                  label="Date"
                  disabled={this.disableSecondField()}
                  max={new Date(2100, 1, 1)}
                  min={new Date(2000, 1, 1)}
                />
                <TextField
                  name="secondSite"
                  label="Healthcare Professional or Clinic Site"
                  disabled={this.disableSecondField()}
                />
              </Form.Group>
              <Header
                as="h3"
                style={{ textAlign: 'center', padding: '1rem 0rem' }}
              >
                Vaccine Record Card
              </Header>
              <UploadImg id={this.props.documentId} imgType={this.imgType} />
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
EditVaccineRecord.propTypes = {
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
  const subscription = Meteor.subscribe(Vac.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Vac.collection.findOne(documentId);
  return {
    doc,
    ready,
    documentId,
  };
})(EditVaccineRecord);
