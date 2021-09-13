import React from "react";
import { Header, Grid, Segment, Button, Table, Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

/** Renders a card for a user profile. See pages/EditUserProfile.jsx. */
class Users extends React.Component {
  render() {
    return (
      <Grid centered={true} style={{ width: "40rem" }}>
        <Grid.Column style={{ display: "flex", flexDirection: "column" }}>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">First Name</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.firstName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Last Name</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.lastName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Email</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.owner}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Gender</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.gender}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Vaccinated</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.vaccinated}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Vaccine Type</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.vaccineType}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Vaccine Lots</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.vaccineLot}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Segment>
            <Grid.Row>
              <Grid.Column>
                <Image
                  src={this.props.user.vaccineCard}
                  size="small"
                  centered={true}
                />
              </Grid.Column>
            </Grid.Row>
          </Segment>
          <Button
            as={NavLink}
            to={`/editprofile/${this.props.user._id}`}
            style={{ marginTop: "1rem" }}
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
    vaccineType: PropTypes.string,
    vaccineLot: PropTypes.number,
    vaccineCard: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Users);
