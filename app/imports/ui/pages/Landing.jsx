import React from "react";
import { Grid, Image, Message, Statistic } from "semantic-ui-react";

const items = [
  { key: "faves", label: "Faves", value: "22" },
  { key: "views", label: "Views", value: "31,200" },
  { key: "members", label: "Members", value: "22" },
];

const StatisticExampleGroupShorthand = () => <Statistic.Group items={items} />;

const MessageExampleInfo = () => (
  <Message info>
    <Message.Header>
      Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
      consectetur, adipisci velit?
    </Message.Header>
    <p>
      Did you know it's been a while?There is no one who loves pain itself, who
      seeks after it and wants to have it, simply because it is pain...click{" "}
      <a href="#">
        <b>here</b>
      </a>
    </p>
  </Message>
);

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid
        id="landing-page"
        verticalAlign="middle"
        textAlign="center"
        container
        divided="vertically"
      >
        <Grid.Column width={16}>
          <MessageExampleInfo />
        </Grid.Column>
        <Grid.Column
          width={16}
          style={{
            display: "flex",
            "align-items": "center",
            height: "15rem",
            "justify-content": "center",
          }}
        >
          <StatisticExampleGroupShorthand />
        </Grid.Column>
        <Grid.Row
          columns={2}
          style={{
            display: "flex",
            "align-items": "center",
            height: "25rem",
            "justify-content": "center",
          }}
        >
          <Grid.Column width={4}>
            <Image size="small" circular src="/images/meteor-logo.png" />
          </Grid.Column>

          <Grid.Column width={10}>
            <h1>Welcome to Covid-19 App</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              suscipit faucibus ligula sed dapibus. Etiam sagittis urna sit amet
              lacus aliquet luctus. Mauris bibendum lobortis nisl, eget semper
              nulla cursus non. Etiam sollicitudin sem vel lectus laoreet, sit
              amet volutpat odio euismod. Vivamus vel nisi malesuada, faucibus
              mauris id, imperdiet ipsum. Nullam facilisis pulvinar dolor
              finibus efficitur. Ut quis sodales magna. Cras consequat metus nec
              ligula dapibus commodo. Ut ac ipsum in sapien euismod lacinia in
              quis urna. Fusce hendrerit tincidunt lacinia. Donec ut enim id
              magna pulvinar varius vel in libero. Ut fermentum tincidunt
              aliquam. Mauris commodo dolor tortor. Mauris vel risus sit amet
              sapien lacinia rutrum eget ut lectus.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          columns={2}
          style={{
            display: "flex",
            "align-items": "center",
            height: "25rem",
            "justify-content": "center",
          }}
        >
          <Grid.Column width={10}>
            <h1>Our Service</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              suscipit faucibus ligula sed dapibus. Etiam sagittis urna sit amet
              lacus aliquet luctus. Mauris bibendum lobortis nisl, eget semper
              nulla cursus non. Etiam sollicitudin sem vel lectus laoreet, sit
              amet volutpat odio euismod. Vivamus vel nisi malesuada, faucibus
              mauris id, imperdiet ipsum. Nullam facilisis pulvinar dolor
              finibus efficitur. Ut quis sodales magna. Cras consequat metus nec
              ligula dapibus commodo. Ut ac ipsum in sapien euismod lacinia in
              quis urna. Fusce hendrerit tincidunt lacinia. Donec ut enim id
              magna pulvinar varius vel in libero.
            </p>
          </Grid.Column>
          <Grid.Column width={4}>
            <Image size="small" circular src="/images/meteor-logo.png" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
