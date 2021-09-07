import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class StuffItemAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.stuff.name}</Table.Cell>
        <Table.Cell>{this.props.stuff.dob}</Table.Cell>
        <Table.Cell>{this.props.stuff.gender}</Table.Cell>
        <Table.Cell>{this.props.stuff.address}</Table.Cell>
        <Table.Cell>{this.props.stuff.vaccination}</Table.Cell>
        <Table.Cell>{this.props.stuff.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
StuffItemAdmin.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    dob: PropTypes.string,
    gender: PropTypes.string,
    address: PropTypes.string,
    vaccination: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default StuffItemAdmin;
