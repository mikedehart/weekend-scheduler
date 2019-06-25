import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import '../../scss/table.scss';
import * as api from '../../api';

import TableBody from './TableBody';

class MainTable extends Component {
	// Used to set initial state
	constructor(props) {
		super(props);

		this.state = {
			dates: [],
			qtr: this.props.qtr,
			year: this.props.year,
			product: this.props.product,
			assigned_product: this.props.assigned_product
		};
	}

	getDates = (qtr, year, product) => {
		api.getQtrDates(qtr, year, product)
			.then((dates) => {
				this.setState({
					dates
				});
			})
			.catch(err => console.error(err))
	};

	// Check if qtr has changed, if so, update qtr state
	static getDerivedStateFromProps(nextProp, prevState) {
		if(nextProp.qtr !== prevState.qtr || nextProp.year !== prevState.year || nextProp.product !== prevState.product) {
			return { qtr: nextProp.qtr, year: nextProp.year, product: nextProp.product };
		} else {
			return null;
		}
	}

	// If qtr changed (above), re-fetch dates
	// without 'if', app will constantly fetch from backend!
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.qtr !== this.state.qtr || prevProps.year !== this.state.year || prevProps.product !== this.state.product) {
			this.getDates(this.state.qtr, this.state.year, this.state.product);
		}
	}

	componentDidMount() {
		this.getDates(this.state.qtr, this.state.year, this.state.product);
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
				  <TableBody dates={this.state.dates} 
				  			clickCell={this.props.clickCell} />
				</Table>
			</div>
		);
	}
}

MainTable.propTypes = {
	qtr: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	product: PropTypes.string.isRequired,
	assigned_product: PropTypes.string.isRequired,
	clickCell: PropTypes.func.isRequired
};

export default MainTable;