// import React from 'react';
// import PropTypes from 'prop-types';
// import '../scss/main.scss';
// import {Alert, Button} from 'react-bootstrap';

/******************************

 TO BE REMOVED
 -------------

TODO;
Component not used for anything. Keeping for now for posterity
but will delete in future.

********************************/

// class ErrorAlert extends React.Component {
// 	constructor(props, context) {
// 		super(props, context);

// 		// binds functions to this class
// 		this.handleDismiss = this.handleDismiss.bind(this);
// 		this.handleShow = this.handleShow.bind(this);
// 		this.generateAlertButton = this.generateAlertButton.bind(this);

// 		// set initial state (show the alert)
// 		this.state = {
// 			show: true
// 		};
// 	}

// 	// handle dismissal of the alert
// 	handleDismiss() {
// 		this.setState({
// 			show: false
// 		});
// 	}

// 	// show the alert
// 	handleShow() {
// 		this.setState({
// 			show: true
// 		});
// 	}

// 	generateAlertButton = () => {
// 		const buttonType = this.props.status;
// 		const email = 'mike.dehart@sap.com';
// 		const error = this.props.message
// 		switch(buttonType) {
// 			case 'danger':
// 				return <Button href={`mailto:${email}?Subject=Weekend%20Error&body=${error}`} bsStyle={buttonType}>Email Developer</Button>;
// 				break;
// 			case 'success':
// 				return <Button onClick={this.props.handleClose} bsStyle={buttonType}>Take Action</Button>;
// 				break;
// 			case 'close':
// 				return <Button onClick={this.props.handleClose} bsStyle={buttonType}>Take Action</Button>;
// 				break;
// 			default:
// 				return "";
// 		}
// 	}

// 	// Generate alert type (danger, warning, success, or info)
// 	// based on props passed (status) and display passed header / message

// 	render() {

// 		let statusStyle = this.props.status;
// 		let header = this.props.header;
// 		let message = this.props.message;
// 		let alert = '';
// 		if (this.state.show) {
// 			alert = (
// 					<Alert bsStyle={statusStyle} onDismiss={this.handleDismiss}>
// 						<h4>{header}</h4>
// 						<p>{message}</p>
// 						<p>
// 							{this.generateAlertButton()}
// 						</p>
// 					</Alert>
// 			);
// 		} else {
// 			alert = (
// 				<div className="alert-margin"></div>
// 			);
// 		}

// 		return (
// 			<div className="row">
// 				{alert}
// 			</div>
// 		);
// 	}
// }

// ErrorAlert.propTypes = {
// 	status: PropTypes.string.isRequired,
// 	header: PropTypes.string.isRequired,
// 	message: PropTypes.string.isRequired,
// };

// export default ErrorAlert;