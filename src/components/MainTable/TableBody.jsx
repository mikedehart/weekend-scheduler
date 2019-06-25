import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';

import TableRow from './TableRow';


const TableBody = (props) =>
	<tbody>
	{props.dates.map((date) =>
		<TableRow
			key={date._id}
			date={date.date}
			day={date.day}
			users={date.users}
			clickCell={props.clickCell}
		/>
	)}
	</tbody>;

TableBody.propTypes = {
	dates: PropTypes.array.isRequired,
	clickCell: PropTypes.func.isRequired
}

export default TableBody;

