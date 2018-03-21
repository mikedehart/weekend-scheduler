import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import '../../scss/table.scss';

import TableBody from './TableBody';


const UserItem = (name) => {
	return (
		<td>{name}</td>
	);
};

class MainTable extends Component {
	// Used to set initial state
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<Table striped bordered condensed>
				  <thead>
				    <tr>
				      <th>Date</th>
				      <th>Day</th>
				      <th>Shift One</th>
				      <th>Shift Two</th>
				    </tr>
				  </thead>
				  <TableBody dates={this.props.dates} />
				</Table>
			</div>
		);
	}
}

MainTable.propTypes = {
	dates: PropTypes.array.isRequired
};

export default MainTable;