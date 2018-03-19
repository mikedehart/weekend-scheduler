import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import InfoPanel from './InfoPanel.jsx';
import MainTable from './MainTable.jsx';
import TopNav from './TopNav.jsx';


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
					<TopNav />
				</div>
				<div className="row">
					<Nav />
					<MainTable />
				</div>
				
			</div>
			);
	}
}

AppContainer.propTypes = {
	title: PropTypes.string.isRequired
};

export default AppContainer;