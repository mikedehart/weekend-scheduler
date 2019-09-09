import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import '../../scss/table.scss';
import * as api from '../../api';

import SelectedRow from './SelectedRow';

const SelectedTable = (props) => (
	<Table className="selection_tbl" striped bordered condensed>
			<thead><tr><td colSpan="4">Selected</td></tr></thead>
		<tbody>
			{props.selectedDates.map((date, idx) => 
				<SelectedRow 
					key={date.dateid + idx}
					date={date.date}
					product={date.product}
					dateid={date._id}
					removeDate={props.removeDate}
					confirmDate={props.confirmDate}
				/>
			)}
		</tbody>
	</Table>
);

SelectedTable.propTypes = {
	selectedDates: PropTypes.array.isRequired,
	removeDate: PropTypes.func.isRequired,
	confirmDate: PropTypes.func.isRequired
}

export default SelectedTable;