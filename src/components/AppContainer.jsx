import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import {aseVals, iqVals, repVals} from '../data/schedule.js';


import Header from './Header';
import SideNav from './SideNav';
import InfoPanel from './InfoPanel';
import MainTable from './MainTable';
import TopNav from './TopNav';
import ErrorAlert from './ErrorAlert';
import ModalStruct from './ModalStruct';


class AppContainer extends Component {
	// Used to set initial state
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title,
			user: this.props.user
		}

	}

	// TODO: Implement routes (route for modalstruct?)

	render() {
		return(
		<BrowserRouter>
			<div className="container">
				<ModalStruct />
				<div className="row">
					<TopNav user={this.props.user} />
				</div>
				<div className="row">
					<ErrorAlert />
				</div>
				<div className="row">
					<div className="col-lg-2 col-md-2">
						<SideNav />
					</div>
					<div className="col-lg-10 col-md-10">
						<div className="col-lg-10 col-md-10">
							<Switch>
								<Route exact path="/" render={() => <Redirect to="/ase" />} />
								<Route path="/ase" render={() => <MainTable dates={aseVals} />} />
								<Route path="/iq" render={() => <MainTable dates={iqVals} />} />
								<Route path="/rep" render={() => <MainTable dates={repVals} />} />
							</Switch>
						</div>
					</div>
				</div>
			</div>
		</BrowserRouter>
		);
	}
}

AppContainer.propTypes = {
	title: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired
};

export default AppContainer;