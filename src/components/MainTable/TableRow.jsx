import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';

import TableCell from './TableCell'


const TableRow = (props) =>
			<tr>
				<td>{props.date}</td>
				<td>{props.day}</td>
				{props.users[0] !== undefined ? 
					<TableCell 
						name={props.users[0].username}
						key={props.users[0]._id}
					/> : 
					<TableCell 
						className="free_cell"
					/>}

				{props.users[1] !== undefined ? 
					<TableCell 
						name={props.users[1].username}
						key={props.users[1]._id}
					/> : <TableCell />}
  			</tr>;


TableRow.propTypes = {
	date: PropTypes.string.isRequired,
	day: PropTypes.string.isRequired,
	users: PropTypes.array
}

// {props.users.map((user, index) =>
// 	  				<TableCell 
// 	  					name={user.username}
// 	  					key={user._id}
//   					/>
// 					)}

export default TableRow;
