import React from "react";
import { Meteor } from "meteor/meteor";
import { Header, Loader } from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import Users from "../components/Users";
import { User } from "../../api/user/User";
import { Redirect } from "react-router-dom";

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return this.props.users?.length === 0 ? (
      <Redirect to={{ pathname: "/editUserProfile/new" }} />
    ) : (
      <div className="flex-column">
        <Header as="h2" style={{ textAlign: "center" }}>
          My Profile
        </Header>
        {this.props.users.map((user, index) => (
          <Users key={index} user={user} />
        ))}
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
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
})(UserProfile);
