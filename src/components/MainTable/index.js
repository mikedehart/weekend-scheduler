import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import '../../scss/table.scss';

import TableBody from './TableBody';


const getWeekendsInMonth = (month, year) => {
	let _year = parseInt(year, 10);
	let _month = parseInt(month, 10);
	let currentMonth = _month;
	let initialDate = new Date(_year, _month, 1);
	let weekends = [];

	while (initialDate.getMonth() === currentMonth) {
		if(initialDate.getDay() === 0 || initialDate.getDay() === 6) {
			weekends.push(''+(initialDate.getMonth()+1)+"/"+initialDate.getDate()+"/"+initialDate.getFullYear());
		}
		initialDate.setDate(initialDate.getDate() + 1);
	}
	return weekends;
}


class MainTable extends Component {
	// Used to set initial state
	constructor(props) {
		super(props);
	}

	render() {
		const weekendArray = getWeekendsInMonth(1, 2018);
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