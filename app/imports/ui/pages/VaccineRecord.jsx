import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { User } from '../../api/user/User';
import AnimationWraper from '../components/AnimationWraper';
import Vaccine from '../components/Vaccine';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class VaccineRecord extends React.Component {
  render() {
    return this.props.ready && this.props.users?.length === 0 ? (
      <Redirect to={{ pathname: 'vaccineRecord' }} />
    ) : (
      <AnimationWraper visible={this.props.ready}>
        <div className="flex-column">
          <Header as="h2" style={{ textAlign: 'center' }}>
            My Vaccine Record
          </Header>
          {this.props.users.map((user, index) => (
            <Vaccine key={index} user={user} />
          ))}
        </div>
      </AnimationWraper>
    );
  }
}

// Require an array of Stuff documents in the props.
VaccineRecord.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(User.userPublicationName);
  const ready = subscription.ready();
  const users = User.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(VaccineRecord);
