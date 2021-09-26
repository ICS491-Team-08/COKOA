import React from "react";
import { Header, Grid, Segment, Button, Table, Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

/** Renders a card for a user profile. See pages/EditUserProfile.jsx. */
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
    };
  }

  componentDidMount() {
    fetch("https://uj0flxl0te.execute-api.us-east-1.amazonaws.com/prod/test", {
      method: "POST",
      body: JSON.stringify({
        type: "getUriForGet",
        params: {
          key: this.props.user._id + this.props.user.imgType,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ img: res }));
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
        <Grid.Column style={{ display: "flex", flexDirection: "column" }}>
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
              <this.RowCell
                headerText="Vaccine Type"
                value={this.props.user.firstVaccineType}
              />
              <this.RowCell
                headerText="Vaccine Lot"
                value={this.props.user.firstVaccineLot}
              />
              <this.RowCell
                headerText="Date"
                value={this.props.user.firstDate?.toString()}
              />
              <this.RowCell
                headerText="Healthcare or Clinic Site"
                value={this.props.user.firstSite}
              />
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
              <this.RowCell
                headerText="Vaccine Type"
                value={this.props.user.secondVaccineType}
              />
              <this.RowCell
                headerText="Vaccine Lot"
                value={this.props.user.secondVaccineLot}
              />
              <this.RowCell
                headerText="Date"
                value={this.props.user.secondDate?.toString()}
              />
              <this.RowCell
                headerText="Healthcare or Clinic Site"
                value={this.props.user.secondSite}
              />
            </Table.Body>
          </Table>

          <Segment>
            <Grid.Row>
              <Grid.Column>
                <Image src={this.state.img} size="small" centered={true} />
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
