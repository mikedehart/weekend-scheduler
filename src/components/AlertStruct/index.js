import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';
import {Alert, Button} from 'react-bootstrap';

/*******************************
	Alert Structure
	==========
	- Displays alert when an error or success message is generated
		for the user.
	- Used by multiple components/functions

********************************/

class AlertStruct extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: this.props.show
		};
	}

	componentDidUpdate() {
		if(this.props.show !== this.state.show){
			this.setState({
				show: this.props.show
			});
		}
	}

	render() {
		if (this.state.show) {
			return (
				<div className="row">
					<Alert bsStyle={this.props.status} onDismiss={this.props.handleClose}>
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
	loginRedirect: PropTypes.func,
	handleClose: PropTypes.func,
	handleShow: PropTypes.func
};

export default AlertStruct;