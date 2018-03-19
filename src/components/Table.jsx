import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';


const rowInstance = (
<Grid>
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


class Table extends Component {
	// Used to set initial state
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="col-lg-9">
				<Grid>
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
			</div>
			);
	}
}

Table.propTypes = {
};

export default Table;