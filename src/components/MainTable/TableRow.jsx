import React from 'react';
import PropTypes from 'prop-types';

import TableCell from './TableCell'

/*******************************
	Table Row
	=====================
	- Displays each date as a table row.
	- Calls TableCell to handle adding/removing/changing users

********************************/

const TableRow = (props) =>
			<tr>
				<td>{props.date}</td>
				<td>{props.day}</td>
				{props.isHoliday ? <td>{props.desc}</td> : null}
				{props.users[0] !== undefined ? 
					<TableCell 
						name={props.users[0].username}
						key={`${props.users[0]._id}1`}
						className="occupied_cell"
						dateID={props.dateID}
						designation={props.designation}
						removeUser={props.removeUser}
						changeUser={props.changeUser}
					/> 
					: 
					<TableCell 
						className="free_cell"
						selectDate={props.selectDate}
						dateID={props.dateID}
					/>}

				{props.users[1] !== undefined ? 
					<TableCell 
						name={props.users[1].username}
						key={`${props.users[1]._id}2`}
						className="occupied_cell"
						dateID={props.dateID}
						designation={props.designation}
						removeUser={props.removeUser}
						changeUser={props.changeUser}
					/> 
					:
					<TableCell 
						className="free_cell"
						selectDate={props.selectDate}
						dateID={props.dateID}
					/>}
  			</tr>;


TableRow.propTypes = {
	date: PropTypes.string.isRequired,
	day: PropTypes.string.isRequired,
	dateID: PropTypes.string.isRequired,
	designation: PropTypes.string.isRequired,
	isHoliday: PropTypes.bool.isRequired,
	users: PropTypes.array,
	selectDate: PropTypes.func,
	// Admin functions
	removeUser: PropTypes.func,
	changeUser: PropTypes.func
};

// {props.users.map((user, index) =>
// 	  				<TableCell 
// 	  					name={user.username}
// 	  					key={user._id}
//   					/>
// 					)}

export default TableRow;
