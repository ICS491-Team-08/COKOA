import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Select } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { UserInfo } from '../../api/userinfo/UserInfo';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const genderOptions = [
  { key: 'male', text: 'Male', value: 'M' },
  { key: 'male', text: 'Female', value: 'F' },
];

const vaccineOptions = [
  { key: 'pfizer', text: 'Pfizer', value: 1 },
  { key: 'moderna', text: 'Moderna', value: 2 },
  { key: 'janssen', text: 'Janssen', value: 3 },
  { key: 'no', text: 'No vaccine', value: 4 },
];

const CovidDb = Meteor.subscribe('Covid');

class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: 'M',
      vaccine: '4',
      error: '',
      redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, gender, vaccine } = this.state;
    const user = email;
    Accounts.createUser({ email, username: email, password, gender, vaccine }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        swal('Success', 'Thanks for registering', 'success');
        this.setState({ error: '', redirectToReferer: true });
      }
    });
    UserInfo.insert({ user, firstName, lastName, gender, vaccine });
  }

  cancle = () => {
    this.setState({ error: '', redirectToReferer: true });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
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
                <Form.Group widths='equal'>
                  <Form.Input
                      fluid
                      name="firstName"
                      placeholder="First Name"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      fluid
                      name="lastName"
                      placeholder="Last Name"
                      onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                      fluid
                      name="gender"
                      placeholder="Gender"
                      control={Select}
                      options={genderOptions}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      fluid
                      name="vaccine"
                      placeholder="Vaccine"
                      control={Select}
                      options={vaccineOptions}
                      onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
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
