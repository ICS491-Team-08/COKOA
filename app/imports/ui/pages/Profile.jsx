import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { UserInfo } from '../../api/userinfo/UserInfo'
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Profile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
        <Container>
          <Table>
            <Table.Header><Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>

            </Table.Row>
            </Table.Header>
            <Table.Body><Table.Row>
                <Table.Cell>{this.props.userinfo.firstName}</Table.Cell>
                <Table.Cell>{this.props.userinfo.lastName}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

Profile.propTypes = {
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
})(Profile);
