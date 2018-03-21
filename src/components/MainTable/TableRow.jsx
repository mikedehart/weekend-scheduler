import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';

import TableCell from './TableCell'


const TableRow = (props) =>
			<tr>
				<td>{props.date}</td>
				<td>{props.day}</td>
	  			{props.users.map((user, index) =>
	  				<TableCell 
	  					name={user.name}
	  					key={user.id}
  					/>
					)}
  			</tr>


TableRow.propTypes = {
	date: PropTypes.string.isRequired,
	day: PropTypes.string.isRequired,
	users: PropTypes.array
}

export default TableRow;
