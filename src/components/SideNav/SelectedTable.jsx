import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import '../../scss/table.scss';
import * as api from '../../api';

import SelectedRow from './SelectedRow';

const SelectedTable = (props) => (
	<Table className="selection_tbl" striped bordered condensed>
			<thead><tr><td colSpan="3">Selected</td></tr></thead>
		<tbody>
			{props.selectedDates.map((date) => 
				<SelectedRow 
					key={date.dateid}
					date={date.date}
					product={date.product}
					dateid={date._id}
					removeDate={props.removeDate}
				/>
			)}
		</tbody>
	</Table>
);

SelectedTable.propTypes = {
	selectedDates: PropTypes.array.isRequired,
	removeDate: PropTypes.func.isRequired
}

export default SelectedTable;