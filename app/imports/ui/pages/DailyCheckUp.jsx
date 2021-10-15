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
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css";
import swal from "sweetalert";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Status } from "../../api/stuff/Stuff";
import PropTypes from "prop-types";
import AnimationWraper from "../components/AnimationWraper";

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
        <Table.HeaderCell>Symptoms</Table.HeaderCell>
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
          <Accordion collapsible>
          <AccordionItem>
          <AccordionButton>Click</AccordionButton>
        <AccordionPanel>
          <b>Fever:</b> {el.fever} <br /> <b>Cough:</b> {el.cough} <br /><b>Muscle Aches:</b> {el.muscle} <br /><b>Sore Throat:</b> {el.throat} <br /><b>Shortness of Breath:</b> {el.breath} <br /><b>Chill:</b> {el.chill} <br /><b>Headache:</b> {el.headache} <br /><b>Loss of Smell or Taste:</b> {el.headache}
        </AccordionPanel>
      </AccordionItem>
      </Accordion>
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
      fever: "no",
      cough: "no",
      muscle: "no",
      throat: "no",
      breath: "no",
      chill: "no",
      headache: "no",
      loss: "no",
    };
  }
  // On submit, insert the data.
  submit = () => {
    const date = new Date();
    const now = date.toLocaleString();
    const { location, mood,fever, cough, muscle, throat, breath, chill, headache, loss } = this.state;
    const owner = Meteor.user().username;
    Status.collection.insert(
      { date: now, location, mood, fever, cough, muscle, throat, breath, chill, headache, loss, owner },
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

  //temp = {};
  handleChange1 = (e, { value }) => this.setState({ fever: value });
  handleChange2 = (e, { value }) => this.setState({ cough: value });
  handleChange3 = (e, { value }) => this.setState({ muscle: value });
  handleChange4 = (e, { value }) => this.setState({ throat: value });
  handleChange5 = (e, { value }) => this.setState({ breath: value });
  handleChange6 = (e, { value }) => this.setState({ chill: value });
  handleChange7 = (e, { value }) => this.setState({ headache: value });
  handleChange8 = (e, { value }) => this.setState({ loss: value });



  //this part of the code needs to be changed to go back and forth between yes and no



  render() {
    const date = new Date();
    return (
      <AnimationWraper visible={this.props.ready}>
        <Grid centered className="checkup-container">
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
                <label>Do you have a fever (temperature over 100.3°F) without having taken any fever
                reducing medications?</label>
                <div>
                <Checkbox
                radio
                label='Yes'
                name='checkboxRadioGroup'
                value='yes'
                checked={this.state.fever === 'yes'}
                onChange={this.handleChange1}
                /><br />
                <Checkbox
                radio
                label='No'
                name='checkboxRadioGroup'
                value='no'
                checked={this.state.fever === 'no'}
                onChange={this.handleChange1}
                />
                </div>
                </Form.Field>
                <Form.Field>
                <label>Do you have a Cough?</label>
                <Checkbox
                radio
                label='Yes'
                name='checkboxRadioGroup'
                value='yes'
                checked={this.state.cough === 'yes'}
                onChange={this.handleChange2}
                /><br />
                <Checkbox
                radio
                label='No'
                name='checkboxRadioGroup'
                value='no'
                checked={this.state.cough === 'no'}
                onChange={this.handleChange2}
                />
                </Form.Field>
                <Form.Field>
                <label>Do you have a Muscle Aches?</label>
                <Checkbox
                radio
                label='Yes'
                name='checkboxRadioGroup'
                value='yes'
                checked={this.state.muscle === 'yes'}
                onChange={this.handleChange3}
                /><br />
                <Checkbox
                radio
                label='No'
                name='checkboxRadioGroup'
                value='no'
                checked={this.state.muscle === 'no'}
                onChange={this.handleChange3}
                />
                </Form.Field>
                <Form.Field>
                <label>Do you have a Sore Throat?</label>
                <Checkbox
                radio
                label='Yes'
                name='checkboxRadioGroup'
                value='yes'
                checked={this.state.throat === 'yes'}
                onChange={this.handleChange4}
                /><br />
                <Checkbox
                radio
                label='No'
                name='checkboxRadioGroup'
                value='no'
                checked={this.state.throat === 'no'}
                onChange={this.handleChange4}
                />
                </Form.Field>
                <Form.Field>
                <label>Do you have a Shortness of Breath?</label>
                <Checkbox
                radio
                label='Yes'
                name='checkboxRadioGroup'
                value='yes'
                checked={this.state.breath === 'yes'}
                onChange={this.handleChange5}
                /><br />
                <Checkbox
                radio
                label='No'
                name='checkboxRadioGroup'
                value='no'
                checked={this.state.breath === 'no'}
                onChange={this.handleChange5}
                />
                </Form.Field>
                <Form.Field>
                <label>Do you have Chills?</label>
                <Checkbox
                radio
                label='Yes'
                name='checkboxRadioGroup'
                value='yes'
                checked={this.state.chill === 'yes'}
                onChange={this.handleChange6}
                /><br />
                <Checkbox
                radio
                label='No'
                name='checkboxRadioGroup'
                value='no'
                checked={this.state.chill === 'no'}
                onChange={this.handleChange6}
                />
                </Form.Field>
                <Form.Field>
                <label>Do you have a Headache?</label>
                <Checkbox
                radio
                label='Yes'
                name='checkboxRadioGroup'
                value='yes'
                checked={this.state.headache === 'yes'}
                onChange={this.handleChange7}
                /><br />
                <Checkbox
                radio
                label='No'
                name='checkboxRadioGroup'
                value='no'
                checked={this.state.headache === 'no'}
                onChange={this.handleChange7}
                />
                </Form.Field>
                <Form.Field>
                <label>Do you have a Loss of Smell or Taste?</label>
                <Checkbox
                radio
                label='Yes'
                name='checkboxRadioGroup'
                value='yes'
                checked={this.state.loss === 'yes'}
                onChange={this.handleChange8}
                /><br />
                <Checkbox
                radio
                label='No'
                name='checkboxRadioGroup'
                value='no'
                checked={this.state.loss === 'no'}
                onChange={this.handleChange8}
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
      </AnimationWraper>
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
