import React from "react";
import {
  Grid,
  Segment,
  Header,
  Rating,
  Table,
  Form,
  Button,
  Checkbox,
} from "semantic-ui-react";
import swal from "sweetalert";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Status } from "../../api/stuff/Stuff";
import PropTypes from "prop-types";

// // Create a schema to specify the structure of the data to appear in the form.
// const formSchema = new SimpleSchema({
//   name: String,
//   quantity: Number,
//   // yesorno: Boolean,
//   condition: {
//     type: String,
//     allowedValues: ["excellent", "good", "fair", "poor"],
//     defaultValue: "good",
//   },
// });

// const bridge = new SimpleSchema2Bridge(formSchema);

const TableExampleStriped = ({ doc }) => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Location</Table.HeaderCell>
        <Table.HeaderCell>Mood</Table.HeaderCell>
        <Table.HeaderCell>Sick</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {doc.map((el) => (
        <Table.Row key={el._id}>
          <Table.Cell>{el.date}</Table.Cell>
          <Table.Cell>{el.location}</Table.Cell>
          <Table.Cell>
            <Rating
              maxRating={5}
              defaultRating={el.mood}
              icon="star"
              size="huge"
              disabled
            />
          </Table.Cell>
          <Table.Cell>
            <Checkbox
              label="I feel sick today. I need to rest."
              checked={el.sick}
              disabled
            />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

/** Renders the Page for adding a document. */
class DailyCheckUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "home",
      mood: 5,
      sick: false,
    };
  }
  // On submit, insert the data.
  submit = () => {
    const date = new Date();
    const now = date.toLocaleString();
    const { location, mood, sick } = this.state;
    const owner = Meteor.user().username;
    Status.collection.insert(
      { date: now, location, mood, sick, owner },
      (error) => {
        if (error) {
          swal("Error", error.message, "error");
        } else {
          swal("Success", "Item added successfully", "success");
          // formRef.reset();
        }
      }
    );
  };

  checkboxHandler = () => {
    this.setState((prevState) => ({ sick: !prevState.sick }));
  };
  handleRate = (e, { rating }) => this.setState({ mood: rating });
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms

  locationOnChange = (e) => this.setState({ location: e.target.value });

  render() {
    const date = new Date();
    return (
      <Grid centered style={{width: "40rem"}}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Current Health Status
          </Header>
          <Segment>
            <Form>
              <Form.Field>
                <label>Date</label>
                <input value={date.toLocaleString()} disabled />
              </Form.Field>
              <Form.Field>
                <label>Location</label>
                <input
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.locationOnChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Mood</label>
                <Rating
                  maxRating={5}
                  defaultRating={5}
                  icon="star"
                  size="huge"
                  onRate={this.handleRate}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label="I feel sick today. I need to rest."
                  checked={this.state.sick}
                  onChange={this.checkboxHandler}
                />
              </Form.Field>
              <Button type="submit" onClick={this.submit}>
                Submit
              </Button>
            </Form>
          </Segment>
          <TableExampleStriped doc={this.props.doc} />
        </Grid.Column>
      </Grid>
    );
  }
}

DailyCheckUp.propTypes = {
  doc: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Status.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Status.collection.find({}).fetch();
  return {
    doc,
    ready,
  };
})(DailyCheckUp);
