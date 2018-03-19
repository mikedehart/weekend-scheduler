import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import InfoPanel from './InfoPanel.jsx';
import MainTable from './MainTable.jsx';
import TopNav from './TopNav.jsx';
import ErrorAlert from './ErrorAlert.jsx';


class AppContainer extends Component {
	// Used to set initial state
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title,
			user: this.props.user
		}

	}

	render() {
		return(
			<div className="container">
				<div className="row">
					<TopNav user={this.props.user} />
				</div>
				<div className="row">
					<ErrorAlert />
				</div>
				<div className="row">
					<div className="col-lg-2 col-md-2">
						<Nav />
					</div>
					<div className="col-lg-10 col-md-10">
						<MainTable />
					</div>
				</div>
				
			</div>
			);
	}
}

AppContainer.propTypes = {
	title: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired
};

export default AppContainer;