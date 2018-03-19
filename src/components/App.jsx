import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import InfoPanel from './InfoPanel.jsx';
import Table from './Table.jsx';


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
			<div className="container">
				<div className="row">
					<Header />
				</div>
				<div className="row">
					<Nav />
					<Table />
				</div>
				
			</div>
			);
	}
}

AppContainer.propTypes = {
	title: PropTypes.string.isRequired
};

export default AppContainer;