import React from 'react';
import { Header, Grid, Segment, Button, Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a card for a user profile. See pages/EditUserProfile.jsx. */
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
    };
  }

  RowCell({ headerText, value }) {
    return value ? (
      <Table.Row>
        <Table.Cell width="eight">
          <Header as="h5">{headerText}</Header>
        </Table.Cell>
        <Table.Cell>{value}</Table.Cell>
      </Table.Row>
    ) : null;
  }

  render() {
    return (
      <Grid centered={true} className="users-container">
        <Grid.Column style={{ display: 'flex', flexDirection: 'column' }}>
          <Table>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell colSpan="2">User Info</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <this.RowCell
                headerText="First Name"
                value={this.props.user.firstName}
              />
              <this.RowCell
                headerText="Last Name"
                value={this.props.user.lastName}
              />
              <this.RowCell headerText="Email" value={this.props.user.owner} />
              <this.RowCell
                  headerText="Gender"
                  value={this.props.user.gender}
              />
              <this.RowCell
                  headerText="Date of Birth"
                  value={this.props.user.birthDate?.toString()}
              />
            </Table.Body>
          </Table>


          <Button
            as={NavLink}
            to={`/editUserProfile/${this.props.user._id}`}
            style={{ marginTop: '1rem' }}
          >
            Edit Profile
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
}

Users.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
    birthDate: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Users);
