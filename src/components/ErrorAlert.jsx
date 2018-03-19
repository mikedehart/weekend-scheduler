import React from 'react';
import '../scss/main.scss';
import {Alert, Button} from 'react-bootstrap';

class ErrorAlert extends React.Component {
	constructor(props, context) {
		super(props, context);

		// binds functions to this class
		this.handleDismiss = this.handleDismiss.bind(this);
		this.handleShow = this.handleShow.bind(this);

		// set initial state (show the error)
		this.state = {
			show: true
		};
	}

	// handle dismissal of the error alert
	handleDismiss() {
		this.setState({
			show: false
		});
	}

	// show the error alert
	handleShow() {
		this.setState({
			show: true
		});
	}



	render() {
		// if show set to true, render the alert
		if (this.state.show){
			return (
				<Alert bsStyle="danger" onDismiss={this.handleDismiss}>
					<h4>Uh oh! An error occurred!</h4>
					<p>Pass in information about the error.</p>
					<p>
						<Button bsStyle="danger">Take action</Button>
						<span> or </span>
						<Button onClick={this.handleDismiss}>Hide Alert</Button>
					</p>
				</Alert>
			);
		}
		//Used for testing. Remove later
		return <Button onClick={this.handleShow}>Show Alert</Button>
	}
}

export default ErrorAlert;