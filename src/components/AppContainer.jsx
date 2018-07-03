import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import config from '../config/config';
import * as auth from '../auth';
import * as api from '../api';

import {aseVals, iqVals, repVals} from '../data/schedule.js';
import { testUser } from '../data/users.js';

import Header from './Header';
import SideNav from './SideNav';
import InfoPanel from './InfoPanel';
import MainTable from './MainTable';
import TopNav from './TopNav';
import AlertStruct from './AlertStruct';
import ModalStruct from './ModalStruct';

class AppContainer extends Component {
	// Used to set initial state
	constructor(props) {
		super(props);

		this.handleRedirect = this.handleRedirect.bind(this);

		this.state = {
			authenticated: this.props.authenticated
		};
		this.auth = auth;
	}

	componentWillMount() {
	}

	componentDidMount() {
	}

	handleRedirect = () => {
		window.location.replace(`${config.api.server}/auth/signin`);
	}

	render() {
		return(
					<div className="container">
						<div className="row">
								<TopNav className="nav_bar" 
									username={this.props.username || "Create Account"} 
									authenticated={this.props.authenticated} 
									handleRedirect={this.handleRedirect}
									inum={this.props.inum}
									/>
						</div>
							<AlertStruct 
							status='danger' 
							message='Test success!' 
							header='Testing 1 2 3' 
							show={true} />
						<div className="row">
							<div className="col-lg-2 col-md-2">
								<SideNav />
							</div>
							<div className="col-lg-10 col-md-10">
								<div className="col-lg-10 col-md-10">
									<MainTable dates={iqVals} />
								</div>
							</div>
						</div>
					</div>
		);
	}
}

AppContainer.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	username: PropTypes.string,
	inum: PropTypes.string,
	product: PropTypes.string,
	designation: PropTypes.string,
};

export default AppContainer;