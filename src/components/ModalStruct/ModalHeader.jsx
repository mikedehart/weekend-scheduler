import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';

const ModalHeader = (props) => {
	if (props.authenticated) {		 
			return <Modal.Title>User Details</Modal.Title>;
	} else {
			return <Modal.Title>Create An Account</Modal.Title>;
	}
};

ModalHeader.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired,
	
};

export default ModalHeader;