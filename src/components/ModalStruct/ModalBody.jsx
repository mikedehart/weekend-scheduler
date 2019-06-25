import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';
import * as api from '../../api';

import { 
	Modal, 
	Button,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock  
		} from 'react-bootstrap';

const details = () => {
	api.getUser().then((details) => {
		details;
	}).catch(err => console.error(err));
};

const ModalBody = (props) => {
	if (!props.authenticated) {
		return (
		<form className="newuser_frm" onSubmit={props.handleSubmit}>
			<p className="newuser_msg">
				It looks like your SAP ID isn't registered in our system. Please create an account below to use this site.
			</p>

				{props.inum ? 
					<FormGroup controlId="newuser_input">
						<ControlLabel>I-Number:</ControlLabel>
						<FormControl type="text" className="inum_disabled" readOnly name="inumber" value={props.inum} />
						<FormControl.Feedback />
						<HelpBlock>I-Number must be 7 characters, and begin with I, C, or D followed by 6 numbers.</HelpBlock>
					</FormGroup>
					: 
					<FormGroup controlId="newuser_input" validationState={props.validateINum(props.value)}>
						<ControlLabel>I-Number:</ControlLabel>
						<FormControl type="text" name="inumber" value={props.value} placeholder="Enter I-Number" onChange={props.handleChange} />
						<FormControl.Feedback />
						<HelpBlock>I-Number must be 7 characters, and begin with I, C, or D followed by 6 numbers.</HelpBlock>
					</FormGroup>
				}


			<FormGroup controlId="newuser_input">
				<ControlLabel>Username:</ControlLabel>
				<FormControl type="text" name="username" placeholder="Enter Username" />
				<FormControl.Feedback />
				<HelpBlock>Your displayed username in the scheduler.</HelpBlock>
			</FormGroup>
			<FormGroup controlId="newuser_input">
				<ControlLabel>Product:</ControlLabel>
				<FormControl componentClass="select" name="product" placeholder="Product">
					<option value="ASE">ASE</option>
		 			<option value="IQ">IQ</option>
		 			<option value="REP">REP</option>
				</FormControl>
				<FormControl.Feedback />
				<HelpBlock>Product that you cover.</HelpBlock>
			</FormGroup>
			<Button type="submit">Submit</Button>
		</form>);
	} else {
		//TODO: Getting user details not working
		console.log(props.getUserDetails());
		return (
			<Modal.Body>
			<h4>User Details</h4>
			<p>Username: <span>{props.username}</span></p>
			<p>Details: <span>{props.getUserDetails()}</span></p>
		</Modal.Body>
		);
	}

};

ModalBody.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	username: PropTypes.string,
	inum: PropTypes.string,
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
	validateINum: PropTypes.func,
	value: PropTypes.string,
	getUserDetails: PropTypes.func
};

export default ModalBody;