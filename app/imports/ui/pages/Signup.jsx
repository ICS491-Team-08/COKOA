import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { Accounts } from "meteor/accounts-base";
import { Info } from "../../api/stuff/Stuff";

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */

class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      gender: "Male",
      vaccinated: false,
      vaccineType: "",
      vaccineLot: "",
      error: "",
      redirectToReferer: false,
      vaccinated: false,
    };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    console.log(name);
    this.setState({ [name]: value });
  };
  genderOnChange =(e) =>{
    console.log(e.target.value)
  }
  componentDidUpdate() {
    console.log(this.state);
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    const{ name, gender, vaccinated, vaccineType, vaccineLot} = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: "", redirectToReferer: true });
      }
    });
    Info.collection.insert({ name, gender, vaccinated, vaccineType, vaccineLot, owner: email }, (error) => {
      if (error) {
        swal("Error", error.message, "error");
      } else {
        swal("Success", "Item added successfully", "success");
        // formRef.reset();
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/add" },
    };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from} />;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Name"
                  id="signup-form-password"
                  name="name"
                  placeholder="Your name"
                  onChange={this.handleChange}
                />
                <Form.Group widths="equal">
                  <Form.Field label="Gender" control="select" onChange={this.genderOnChange}>
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
                    checked={this.state.vaccinated}
                    onChange={this.handleChange}
                  />
                  <Form.Radio
                    label="No"
                    value={false}
                    name="vaccinated"
                    checked={!this.state.vaccinated}
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
                <Form.Button id="signup-form-submit" content="Submit" />
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === "" ? (
              ""
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
