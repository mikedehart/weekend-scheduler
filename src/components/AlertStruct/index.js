import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';
import {Alert, Button} from 'react-bootstrap';

class AlertStruct extends React.Component {
	constructor(props) {
		super(props);

		this.handleDismiss = this.handleDismiss.bind(this);
		this.handleShow = this.handleShow.bind(this);

		this.state = {
			show: this.props.show || false
		};
	}


	// handle dismissal of the alert
	handleDismiss() {
		this.setState({
			show: false
		});
		if(this.props.handleErrorClose) this.props.handleErrorClose();
	}

	// show the alert
	handleShow() {
		this.setState({
			show: true
		});
	}

	render() {
		if (this.state.show) {
			return (
				<div className="row">
					<Alert bsStyle={this.props.status} onDismiss={this.handleDismiss}>
						<h4>{this.props.header}</h4>
						<p>{this.props.message}</p>
						{this.props.loginRedirect ? this.props.loginRedirect() : ''}
					</Alert>
				</div>
			);
		} else {
			return (
				<div className="row">
					<div className="alert-margin"></div>
				</div>
			);
		}
	}
}

AlertStruct.propTypes = {
	status: PropTypes.string.isRequired,
	header: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	show: PropTypes.bool,
	loginRedirect: PropTypes.func
};

export default AlertStruct;