import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import '../scss/table.scss';



const rowInstance = (
<Grid className="s-row">
	<Row className="show-grid">
		<Col xs={7} md={4}>
			1/12/2018
		</Col>
		<Col xs={1} md={2}>
			Sat
		</Col>
		<Col xs={2} md={3}>
			Mbartrum
		</Col>
		<Col xs={2} md={3}>
			Jdever
		</Col>	
	</Row>
</Grid>
);


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
				<Table striped bordered condensed>
				  <thead>
				    <tr>
				      <th>Date</th>
				      <th>Day</th>
				      <th>Shift One</th>
				      <th>Shift Two</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr>
				      <td>1/6/2018</td>
				      <td>Sat</td>
				      <td>mbartrum</td>
				      <td>jdever</td>
				    </tr>
				    <tr>
				      <td>1/7/2018</td>
				      <td>Sun</td>
				      <td>dedicg</td>
				      <td>vwolffe</td>
				    </tr>
				    <tr>
				    	<td></td>
				    	<td></td>
				    	<UserItem name="jdever" />
				    	<UserItem name="mdehart" />
				    </tr>
				  </tbody>
				</Table>
		);
	}
}

MainTable.propTypes = {

};

export default MainTable;