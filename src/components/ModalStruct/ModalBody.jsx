import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import '../../scss/main.scss';

import { 
	Modal, 
	Button,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock  
		} from 'react-bootstrap';

import AltdayBody from './AltdayBody';

/*******************************
	Modal Body
	=====================
	- Sets content in Modal

********************************/

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
					<FormGroup controlId="newuser_input" validationState={props.validateINum(props.inum_value)}>
						<ControlLabel>I-Number:</ControlLabel>
						<FormControl type="text" name="inumber" value={props.inum_value} placeholder="Enter I-Number" onChange={props.handleChange} />
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
			<FormGroup>
				<ControlLabel>Email:</ControlLabel>
				<FormControl type="text" name="email" placeholder="Email" />
				<FormControl.Feedback />
				<HelpBlock>Your SAP email (only used for generating calendar events.)</HelpBlock>
			</FormGroup>
			<FormGroup>
				<ControlLabel>Manager Email:</ControlLabel>
				<FormControl type="text" name="mgr_email" placeholder="Email" />
				<FormControl.Feedback />
				<HelpBlock>Your Manager's SAP email (only used for generating calendar events.)</HelpBlock>
			</FormGroup>
			<Button type="submit">Submit</Button>
		</form>);
	} else {
		//TODO: Getting user details not working
		return (
			<Modal.Body>
				<h4>Alternative Days</h4>
				{props.altDays.map((alt, idx) => {
					return (
						<AltdayBody
							key={alt.id + idx}
							id={alt.id}
							date={alt.date}
							user={alt.user}
							alt={alt.alt}
							pay={alt.pay}
							email={alt.email}
							mgr={alt.mgr}
							qtr={alt.qtr}
							year={alt.year}
							updateUserAltDay={props.updateUserAltDay}
						/>

					);
				})}
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
	inum_value: PropTypes.string,
	altDays: PropTypes.array,
	updateUserAltDay: PropTypes.func.isRequired
};

export default ModalBody;