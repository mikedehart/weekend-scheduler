import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';
import { Popover, OverlayTrigger } from 'react-bootstrap';

// const popover = (
// 	<Popover id="popover-positioned-bottom" title="User Actions">
// 		<div>
// 			<h5 onClick={this.props.removeUser}>Delete User</h5>
// 			<h5>Change User</h5>
// 		</div>
// 	</Popover>
// );
//TODO: Test out "TSM" designation. Also, find a way to add TSM users via app?


const TableCell = (props) => {
	const popover = (
		<Popover id="popover-positioned-bottom" title="User Actions">
			<div>
				<h5 onClick={() => props.removeUser(props.name, props.dateID)}>Delete User</h5>
				<h5>Change User</h5>
			</div>
		</Popover>
	);


	if (props.className === 'occupied_cell') {
		if(props.designation === 'TSM') {
			return (
				<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
					<td className={props.className}>{props.name}</td>
				</OverlayTrigger>);
		} else {
			return <td className={props.className}>{props.name}</td>
		}
	} else {
		return <td className={props.className} onClick={() => props.selectDate(props.dateID)}></td>
	}
};


// 	return (props.className === 'occupied_cell' ?
// 		<td className={props.className}>{props.name}</td>
// 		:
// 		<td className={props.className} onClick={() => props.selectDate(props.dateID)}></td>
// 		);
// };


TableCell.propTypes = {
	name: PropTypes.string,
	dateID: PropTypes.string,
	selectDate: PropTypes.func,
	className: PropTypes.string,
	removeUser: PropTypes.func
}

export default TableCell;