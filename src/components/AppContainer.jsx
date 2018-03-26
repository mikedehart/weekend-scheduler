import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, BrowserRouter, Route, NavLink } from 'react-router-dom';

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
		const testVals = [
	{
		id: 1222018,
		date: '1/22/2018',
		day: 'Sat',
		users: [{
				name: 'bchin',
				id: 'bchin'
			},
			{
				name: 'jting',
				id: 'jting'
			}]
	},
	{
		id: 1232018,
		date: '1/23/2018',
		day: 'Sat',
		users: [{
				name: 'mbartrum',
				id: 'mbartrum'
			},
			{
				name: 'mdehart',
				id: 'mdehart'
			}]
	},
	{
		id: 1242018,
		date: '1/24/2018',
		day: 'Sun',
		users: [{
				name: 'dwhite',
				id: 'dwhite'
			},
			{
				name: 'jdever',
				id: 'jdever'
			}]
	}];
		return(
			<div className="container">
				<ModalStruct />
				<div className="row">
					<TopNav user={this.props.user} />
				</div>
				<div className="row">
					<ErrorAlert />
				</div>
				<BrowserRouter>
					<div className="row">
						<div className="col-lg-2 col-md-2">
							<div className="list-group">
						        <NavLink to="/ase" className="list-group-item">ASE</NavLink>
						        <NavLink to="/iq" className="list-group-item">IQ</NavLink>
						        <NavLink to="/rep" className="list-group-item">REP</NavLink>
					  		</div>
						</div>
						<div className="col-lg-10 col-md-10">
							<div className="col-lg-10 col-md-10">
								<Switch>
									<Route exact path="/" render={() => <MainTable dates={aseVals} />} />
									<Route path="/ase" render={() => <MainTable dates={aseVals} />} />
									<Route path="/iq" render={() => <MainTable dates={iqVals} />} />
									<Route path="/rep" render={() => <MainTable dates={repVals} />} />
								</Switch>
							</div>
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

AppContainer.propTypes = {
	title: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired
};

export default AppContainer;