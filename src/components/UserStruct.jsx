import React from 'react';
import PropTypes from 'prop-types';
// Bootstrap imports
import {  
		Modal,
		FormGroup,
		ControlLabel,
		FormControl,
		Button
		} from 'react-bootstrap';

// Component Imports
//import UserHeader from './UserHeader';
//import UserBody from './UserBody';

//TODO: add form for switching user
const UserStruct = (props) => {
	return (
		<Modal backdrop="static" show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Switch Users</Modal.Title> 
			</Modal.Header>
			<Modal.Body>
				<form className="change_frm" type="post" onSubmit={props.changeUser}>
					<FormGroup controlId="user_change">
						<ControlLabel>Current User:</ControlLabel>
						<FormControl type="text" className="inum_disabled" readOnly name="current_user" value={props.current_user} />
						<FormControl type="hidden" className="inum_disabled" readOnly name="dateID" value={props.dateID} />
					</FormGroup>
					<FormGroup controlId="user_change">
						<ControlLabel>New User:</ControlLabel>
						<FormControl componentClass="select" name="new_user" placeholder="testing">
						{props.new_users.map((usr, idx) => <option key={idx} value={usr}>{usr}</option>)}
						</FormControl>
					</FormGroup>
					<Button type="submit">Submit</Button>
				</form>
			</Modal.Body>
		</Modal>
	);
};

UserStruct.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	new_users: PropTypes.array.isRequired,
	current_user: PropTypes.string,
	dateID: PropTypes.string,
	changeUser: PropTypes.func
};

export default UserStruct;