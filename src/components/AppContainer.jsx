import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import config from '../config/config';
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

// TODO: order by for dates!

class AppContainer extends Component {

	// Used to set initial state
	constructor(props) {
		super(props);

		this.handleRedirect = this.handleRedirect.bind(this);

		const d = new Date();
		const initialYear = d.getFullYear();
		const initialQtr = api.getQtr(d.getMonth());

		this.state = {
			authenticated: this.props.authenticated,
			product: this.props.product,
			qtr: initialQtr,
			year: initialYear
		};
	}

	// getDates = (qtr, year, product) => {
	// 	api.getQtrDates(qtr, year, product)
	// 		.then((dates) => {
	// 			console.log(dates);
	// 			dates;
	// 		})
	// 		.catch(err => console.error(err))
	// };

	changeQtr = (qtr) => {
		this.setState({
			qtr
		});
	};

	changeYear = (evt) => {
		this.setState({
			year: parseInt(evt.target.value, 10)
		});
	};

	updateDates() {
		const _qtr = parseInt(this.state.qtr, 10);
		const _year = parseInt(this.state.year, 10);
		const _prod = this.state.product;
		console.log(`After parse: ${_qtr} ${_year} ${_prod}`);
		api.getQtrDates(_qtr, _year, product)
			.then((dates) => {
				this.setState({
					dates
				});
			})
			.catch(err => console.error(err))
	}

	componentWillMount() {

	}

	componentDidMount() {
		// const d = new Date();
		// const yr = d.getFullYear();
		// const qtr = api.getQtr(d.getMonth());
		// this.getDates(this.state.qtr, this.state.year, this.state.product);
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
								<SideNav 
									qtr={this.state.qtr}
									year={this.state.year}
									product={this.state.product}
									changeQtr={this.changeQtr}
									changeYear={this.changeYear}
								/>
							</div>
							<div className="col-lg-10 col-md-10">
								<div className="col-lg-10 col-md-10">
									<MainTable 
										qtr={this.state.qtr}
										year={this.state.year}
										product={this.state.product}
									/>
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