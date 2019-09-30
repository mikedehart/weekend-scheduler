import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';

/*******************************
	Modal Header
	=====================
	- Sets header for Modal

********************************/

const ModalHeader = (props) => {
	if (props.authenticated) {		 
			return <Modal.Title>Details: {props.username}</Modal.Title>;
	} else {
			return <Modal.Title>Create An Account</Modal.Title>;
	}
};

ModalHeader.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired,
	
};

export default ModalHeader;