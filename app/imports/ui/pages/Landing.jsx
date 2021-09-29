import React from "react";
import {
  Segment,
  Grid,
  Divider,
  Header,
  Icon,
  Button,
  Image,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class PreLanding extends React.Component {
  componentDidMount() {
  }
  render() {
    return this.props.userId ? (
      <Redirect to={{ pathname: "/home" }} />
    ) : (
      <div className="prelanding">
        <Segment>
          <div className="prelanding" style={{ margin: "2rem 0rem" }}>
            <Image src="/images/cokoa.png" size="big" circular />
          </div>
          <Header as="h1" style={{ textAlign: "center" }}>
            Welcome to COKOA!
          </Header>
          <br />
          <Segment placeholder style={{ border: "unset" }}>
            <Grid columns={2} stackable textAlign="center">
              <Divider vertical className="or-divider">
                Or
              </Divider>

              <Grid.Row verticalAlign="middle">
                <Grid.Column>
                  <Header icon>
                    <Icon name="sign-in" />
                  </Header>

                  <Button as={NavLink} exact to="/signin" primary>
                    Sign-In
                  </Button>
                </Grid.Column>

                <Grid.Column>
                  <Header icon>
                    <Icon name="signup" />
                  </Header>
                  <Button color="green" as={NavLink} exact to="/signup">
                    Sign-Up
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Segment>
      </div>
    );
  }
}

export default withTracker(({ match }) => {
  const userId = Meteor.userId();
  return {
    userId,
  };
})(PreLanding);
