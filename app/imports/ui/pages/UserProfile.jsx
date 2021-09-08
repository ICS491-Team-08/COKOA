import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Container, Header, Loader, Grid, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfo } from '../../api/userinfo/UserInfo';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const fontStyle = {
      fontFamily: ['Antics', 'serif'],
    };

    return (
        <Container textAling='center'>
          <Header as='h1'>My Profile</Header>
          <Table celled style={fontStyle}>
            <Table.Header><Table.Row>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Vaccine</Table.HeaderCell>

            </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.userinfo.map((listuser) => <Table.Row key={listuser._id}>
                <Table.Cell>{listuser.user}</Table.Cell>
                <Table.Cell>{listuser.firstName}</Table.Cell>
                <Table.Cell>{listuser.lastName}</Table.Cell>
                <Table.Cell>{listuser.gender}</Table.Cell>
                <Table.Cell>{listuser.vaccine}</Table.Cell>
              </Table.Row>) }
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  userinfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('UserInfo');

  return {
    userinfo: UserInfo.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserProfile);