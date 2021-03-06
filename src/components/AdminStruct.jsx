import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Bootstrap imports
import {  
		Modal,
		FormGroup,
		ControlLabel,
		FormControl,
		Button,
		Form
		} from 'react-bootstrap';

/*******************************
	Admin Modal
	=============
	- When admin clicks 'Admin Console'
		this modal is triggered

********************************/

const AdminStruct = (props) => {
	const lockedQtrs = props.qtrList.filter(qtr => qtr.locked === true);
	const unlockedQtrs = props.qtrList.filter(qtr => qtr.locked === false);

	return(
		<Modal size="lg" backdrop="static" show={props.show} onHide={props.toggleAdminHide}>
			<Modal.Header closeButton>
				<Modal.Title>Admin Console</Modal.Title> 
			</Modal.Header>
			<Modal.Body>
				<Form className="unlock_frm" type="post" onSubmit={props.toggleLockQtr}>
					<FormGroup controlId="unlock_change">
						<ControlLabel>Unlock Qtr:</ControlLabel>
						<FormControl componentClass="select" name="unlock_qtr" placeholder="Loading...">
						{lockedQtrs.map((qtr, idx) => <option key={idx} value={qtr._id}>{`${qtr.quarter} - ${qtr.year}`}</option>)}
						</FormControl>
						<Button type="submit">Submit</Button>
					</FormGroup>
				</Form>
				<Form className="lock_frm" type="post" onSubmit={props.toggleLockQtr}>
					<FormGroup controlId="lock_change">
						<ControlLabel>Lock Qtr:</ControlLabel>
						<FormControl componentClass="select" name="lock_qtr" placeholder="Loading...">
						{unlockedQtrs.map((qtr, idx) => <option key={idx} value={qtr._id}>{`${qtr.quarter} - ${qtr.year}`}</option>)}
						</FormControl>
						<Button type="submit">Submit</Button>
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.toggleAdminHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);

};

AdminStruct.propTypes = {
	show: PropTypes.bool.isRequired,
	qtrList: PropTypes.array.isRequired,
	toggleAdminHide: PropTypes.func.isRequired,
	toggleLockQtr: PropTypes.func.isRequired
};

export default AdminStruct;