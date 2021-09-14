import React from "react";
import {
  Header,
  Grid,
  Segment,
  Button,
  Table,
  Image,
} from "semantic-ui-react";
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
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell colSpan="2">User Info</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell width="eight">
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
            </Table.Body>
          </Table>

          <Table>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell colSpan="2">
                  1st Dose of COVID-19
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell width="eight">
                  <Header as="h5">Vaccine Type</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.firstVaccineType}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Vaccine Lot</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.firstVaccineLot}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Date</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.firstDate}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Healthcare or Clinic Site</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.firstSite}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Table>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell colSpan="2">
                  2st Dose of COVID-19
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell width="eight">
                  <Header as="h5">Vaccine Type</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.secondVaccineType}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Vaccine Lot</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.secondVaccineLot}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Date</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.secondDate}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">Healthcare or Clinic Site</Header>
                </Table.Cell>
                <Table.Cell>{this.props.user.secondSite}</Table.Cell>
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
            to={`/editUserProfile/${this.props.user._id}`}
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
    firstVaccineType: PropTypes.string,
    firstVaccineLot: PropTypes.number,
    firstDate: PropTypes.string,
    firstSite: PropTypes.string,
    secondVaccineType: PropTypes.string,
    secondVaccineLot: PropTypes.number,
    secondDate: PropTypes.string,
    secondSite: PropTypes.string,
    vaccineCard: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Users);
