import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';

import TableRow from './TableRow';


const TableBody = (props) =>
	<tbody>
	{props.dates.map((date) =>
		<TableRow
			key={date.id}
			date={date.date}
			day={date.day}
			users={date.users}
		/>
	)}
	</tbody>;

TableBody.propTypes = {
	dates: PropTypes.array.isRequired
}

export default TableBody;

