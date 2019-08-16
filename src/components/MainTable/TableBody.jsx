import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';

import TableRow from './TableRow';


const TableBody = (props) =>
	<tbody>
	{props.dates.map((date) =>
		<TableRow
			key={date._id}
			dateID={date._id}
			date={date.date}
			day={date.day}
			users={date.users}
			selectDate={props.selectDate}
		/>
	)}
	</tbody>;

TableBody.propTypes = {
	dates: PropTypes.array.isRequired,
	selectDate: PropTypes.func.isRequired
}

export default TableBody;

