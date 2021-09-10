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

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class PreLanding extends React.Component {
  render() {
    return (
      <div className="prelanding">
        <Segment>
          <div className="prelanding" style={{margin: "2rem 0rem"}}>
            <Image
              src="https://react.semantic-ui.com/logo.png"
              size="small"
              circular
            />
          </div>
          <Header as="h1">Welcome to Virtual ID for Covid-19</Header>
          <br />
          <Segment placeholder style={{ border: "unset" }}>
            <Grid columns={2} stackable textAlign="center">
              <Divider vertical>Or</Divider>

              <Grid.Row verticalAlign="middle">
                <Grid.Column>
                  <Header icon>
                    <Icon name="sign-in" />
                  </Header>

                  <Button primary>Sign-In</Button>
                </Grid.Column>

                <Grid.Column>
                  <Header icon>
                    <Icon name="signup" />
                  </Header>
                  <Button color="green">Sign-Up</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Segment>
      </div>
    );
  }
}

export default PreLanding;
