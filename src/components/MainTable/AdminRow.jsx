import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';
import { Popover, OverlayTrigger } from 'react-bootstrap';

import AdminCell from './AdminCell'

const popover = (
	<Popover id="popover-positioned-bottom" title="User Actions">
		<ul>
			<li>Change User</li>
			<li>Remove User</li>
		</ul>
	</Popover>
);

const AdminRow = (props) =>
			<tr>
				<td>{props.date}</td>
				<td>{props.day}</td>
				{props.users[0] !== undefined ? 
					<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
					<AdminCell 
						name={props.users[0].username}
						key={props.users[0]._id}
						className="occupied_cell"
						dateID={props.dateID}
					/> 
					</OverlayTrigger> 
					: 
					<AdminCell 
						className="free_cell"
						selectDate={props.selectDate}
						dateID={props.dateID}
					/>}

				{props.users[1] !== undefined ? 
					<AdminCell 
						name={props.users[1].username}
						key={props.users[1]._id}
						className="occupied_cell"
						selectDate={props.selectDate}
						dateID={props.dateID}
					/> :
					<AdminCell 
						className="free_cell"
						selectDate={props.selectDate}
						dateID={props.dateID}
					/>}
  			</tr>;


AdminRow.propTypes = {
	date: PropTypes.string.isRequired,
	day: PropTypes.string.isRequired,
	users: PropTypes.array,
	selectDate: PropTypes.func
}

// {props.users.map((user, index) =>
// 	  				<TableCell 
// 	  					name={user.username}
// 	  					key={user._id}
//   					/>
// 					)}

export default AdminRow;
