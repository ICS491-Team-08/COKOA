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
  AutoForm,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
  RadioField,
} from "uniforms-semantic";
import swal from "sweetalert";
import { Meteor } from "meteor/meteor";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";
import { Stuffs } from "../../api/stuff/Stuff";

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  // yesorno: Boolean,
  condition: {
    type: String,
    allowedValues: ["excellent", "good", "fair", "poor"],
    defaultValue: "good",
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const TableExampleStriped = () => (
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
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie Harington</Table.Cell>
        <Table.Cell>January 11, 2014</Table.Cell>
        <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill Lewis</Table.Cell>
        <Table.Cell>May 11, 2014</Table.Cell>
        <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie Harington</Table.Cell>
        <Table.Cell>January 11, 2014</Table.Cell>
        <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill Lewis</Table.Cell>
        <Table.Cell>May 11, 2014</Table.Cell>
        <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {
  // On submit, insert the data.
  submit(data, formRef) {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert({ name, quantity, condition, owner }, (error) => {
      if (error) {
        swal("Error", error.message, "error");
      } else {
        swal("Success", "Item added successfully", "success");
        formRef.reset();
      }
    });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    const date = new Date();
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Current Health Status
          </Header>
          <Segment>
            <Form>
              <Form.Field>
                <label>Date</label>
                <input value={date.toLocaleString()} disabled/>
              </Form.Field>
              <Form.Field>
                <label>Location</label>
                <input placeholder="Location" />
              </Form.Field>
              <Form.Field>
                <label>Mood</label>
                <Rating
                  maxRating={5}
                  defaultRating={5}
                  icon="star"
                  size="huge"
                />
              </Form.Field>
              <Form.Field>
                <Checkbox label="I feel sick today. I need to rest." />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </Segment>
          <TableExampleStriped />
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddStuff;
