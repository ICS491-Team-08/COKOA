import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.profile.firstName}</Table.Cell>
        <Table.Cell>{this.props.profile.lastName}</Table.Cell>
        <Table.Cell>{this.props.profile.gender}</Table.Cell>
        <Table.Cell>{this.props.profile.vaccine}</Table.Cell>
        <Table.Cell>
          <Link to={`/editprofile/${this.props.profile._id}`}>Change My Profile</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
    vaccine: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Profile);
