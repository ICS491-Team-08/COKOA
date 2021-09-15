import React from "react";
import { Grid, Segment, Header, Form, Select } from "semantic-ui-react";
import {
  AutoForm,
  ErrorsField,
  SelectField,
  SubmitField,
  TextField,
  HiddenField,
} from "uniforms-semantic";
import swal from "sweetalert";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";
import { User } from "../../api/user/User";

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  firstVaccineType: {
    type: String,
    allowedValues: ["Pfizer", "Moderna", "Janssen", "ETC", "No vaccine"],
  },
  firstVaccineLot: {
    type: Number,
    optional: true,
  },
  firstDate: {
    type: String,
    optional: true,
  },
  firstSite: {
    type: String,
    optional: true,
  },
  secondVaccineType: {
    type: String,
    allowedValues: ["Pfizer", "Moderna", "Janssen", "ETC", "No vaccine"],
  },
  secondVaccineLot: {
    type: Number,
    optional: true,
  },
  secondDate: {
    type: String,
    optional: true,
  },
  secondSite: {
    type: String,
    optional: true,
  },
  vaccineCard: {
    type: "String",
    defaultValue:
      "https://bloximages.chicago2.vip.townnews.com/greenevillesun.com/content/tncms/assets/v3/editorial/9/f5/9f58c8e7-41c2-58d7-99a8-90bddda28675/60cc8afe6a1e0.image.png",
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
    const {
      firstName,
      lastName,
      firstVaccineType,
      firstVaccineLot,
      firstDate,
      firstSite,
      secondVaccineType,
      secondVaccineLot,
      secondDate,
      secondSite,
      vaccineCard,
    } = data;
    const owner = Meteor.user().username;
    User.collection.insert(
      {
        firstName,
        lastName,
        firstVaccineType,
        firstVaccineLot,
        firstDate,
        firstSite,
        secondVaccineType,
        secondVaccineLot,
        secondDate,
        secondSite,
        vaccineCard,
        owner,
      },
      (error) => {
        if (error) {
          swal("Error", error.message, "error");
        } else {
          swal("Success", "Item added successfully", "success");
          formRef.reset();
          this.setState({ redirectToReferer: true });
        }
      }
    );
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    const { from } = this.props.location.state || {
      from: { pathname: "/userprofile" },
    };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from} />;
    }
    return (
      <Grid centered className="orangebg" style={{width: "40rem"}}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Create Profile
          </Header>
          <AutoForm
            ref={(ref) => {
              fRef = ref;
            }}
            schema={bridge}
            onSubmit={(data) => this.submit(data, fRef)}
          >
            <Segment>
              <TextField name="vaccineCard" />
              <TextField name="firstName" />
              <TextField name="lastName" />

              <Header
                as="h3"
                style={{ textAlign: "center", padding: "1rem 0rem" }}
              >
                1st Dose of Covid-19
              </Header>
              <Form.Group widths="equal">
                <SelectField
                  fluid
                  label="Product Name/Manufacturer"
                  name="firstVaccineType"
                  placeholder="Vaccine"
                  control={Select}
                />
                <TextField name="firstVaccineLot" />
              </Form.Group>
              <Form.Group widths="equal">
                <TextField icon="calendar" name="firstDate" label="Date" placeholder="MM/DD/YY" />
                <TextField
                  name="firstSite"
                  label="Healthcare Professional or Clinic Site"
                />
              </Form.Group>

              <Header
                as="h3"
                style={{ textAlign: "center", padding: "1rem 0rem" }}
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
                <TextField name="secondVaccineLot" />
              </Form.Group>
              <Form.Group widths="equal">
                <TextField icon="calendar" name="secondDate" label="Date" placeholder="MM/DD/YY" />
                <TextField
                  name="secondSite"
                  label="Healthcare Professional or Clinic Site"
                />
              </Form.Group>

              <SubmitField value="Submit" style={{ width: "100%" }} />
              <ErrorsField />
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
