import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button} from 'react-bootstrap';

const ModalAlert = (props) => (
	<Alert bsStyle={statusStyle} onDismiss={props.handleDismiss}>
		<h4>{props.header}</h4>
		<p>{props.message}</p>
	</Alert>
);

ModalAlert.propTypes = {
	status: PropTypes.string.isRequired,
	header: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	handleDismiss: PropTypes.func.isRequired,
	loginRedirect: PropTypes.func
};

export default ModalAlert;