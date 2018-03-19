import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';



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


class MainTable extends Component {
	// Used to set initial state
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="col-lg-9">
				<Table striped bordered condensed hover>
				  <thead>
				    <tr>
				      <th>#</th>
				      <th>First Name</th>
				      <th>Last Name</th>
				      <th>Username</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr>
				      <td>1</td>
				      <td>Mark</td>
				      <td>Otto</td>
				      <td>@mdo</td>
				    </tr>
				    <tr>
				      <td>2</td>
				      <td>Jacob</td>
				      <td>Thornton</td>
				      <td>@fat</td>
				    </tr>
				    <tr>
				      <td>3</td>
				      <td colSpan="2">Larry the Bird</td>
				      <td>@twitter</td>
				    </tr>
				  </tbody>
				</Table>
			</div>
		);
	}
}

MainTable.propTypes = {

};

export default MainTable;