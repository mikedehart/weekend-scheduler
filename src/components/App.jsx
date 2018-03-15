import React, { Component } from 'react';
import PropTypes from 'prop-types';


class AppContainer extends Component {
	// Used to set initial state
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title,
			val1: 0
		}

	}

	render() {
		return(
			<div>
				<h1>{this.props.title}</h1>
			</div>
			);
	}
}

AppContainer.propTypes = {
	title: PropTypes.string.isRequired
};

export default AppContainer;