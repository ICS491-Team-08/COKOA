import React from 'react';
import { Table, Image, Card, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  render() {
    return (

      <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.stuff.name}</Card.Header>
            <br></br>
            <Card.Meta>DOB: {this.props.stuff.dob}</Card.Meta>
            <Card.Meta>Gender: {this.props.stuff.gender}</Card.Meta>
            <Card.Meta>Address: {this.props.stuff.address}</Card.Meta>
            <br></br>
            <Card.Description> COVID Status: {this.props.stuff.status}</Card.Description>
            <Card.Description> Vaccinated?: {this.props.stuff.vaccination}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
            </Feed>
          </Card.Content>
        </Card>
    );
  }
}

// Require a document to be passed to this component.
StuffItem.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    dob: PropTypes.string,
    gender: PropTypes.string,
    address: PropTypes.string,
    status: PropTypes.string,
    vaccination: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(StuffItem);
