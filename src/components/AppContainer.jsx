import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import config from '../config/config';
import * as api from '../api';

//import {aseVals, iqVals, repVals} from '../data/schedule.js';
//import { testUser } from '../data/users.js';

import Header from './Header';
import SideNav from './SideNav';
import InfoPanel from './InfoPanel';
import MainTable from './MainTable';
import TopNav from './TopNav';
import AlertStruct from './AlertStruct';
import ModalStruct from './ModalStruct';
import UserOverlay from './UserOverlay';

class AppContainer extends Component {

	// Used to set initial state
	constructor(props) {
		super(props);

		// Bind functions to [AppContainer] scope
		this.handleRedirect = this.handleRedirect.bind(this);
		this.selectOpenDate = this.selectOpenDate.bind(this);
		this.removeSelectedDate = this.removeSelectedDate.bind(this);
		this.confirmSelectedDate = this.confirmSelectedDate.bind(this);
		this.updateDates = this.updateDates.bind(this);
		this.removeUser = this.removeUser.bind(this);

		// Current date to set initial view
		const d = new Date();
		const initialYear = d.getFullYear();
		const initialQtr = api.getQtr(d.getMonth());

		this.state = {
			authenticated: this.props.authenticated,
			assigned_product: this.props.product,
			product: this.props.product,
			qtr: initialQtr,
			year: initialYear,
			alert_show: false,
			alert_status: '',
			alert_msg: '',
			alert_header: '',
			dates: [],
			selected_dates: [],
			assigned_dates: []
		};
	}

	getUserDetails = () => {
		api.getUser().then((details) => {
			console.log(details);
			return details;
		}).catch((err) => {
			this.triggerAlert('danger', err.message, 'Error!');
			console.error(err);
		});
	};

	// ----- Schedule Functions -----

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

	changeProd = (key) => {
		let prodValue = "ASE";
		if (key === 3.2) prodValue = "IQ";
		else if (key === 3.3) prodValue = "REP";
		this.setState({
			product: prodValue
		});
	};

	updateDates() {
		const _qtr = parseInt(this.state.qtr, 10);
		const _year = parseInt(this.state.year, 10);
		const _prod = this.state.product;
		api.getQtrDates(_qtr, _year, _prod)
			.then((dates) => {
				this.setState({
					dates
				});
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			});
	}

	getDates = (qtr, year, product) => {
		api.getQtrDates(qtr, year, product)
			.then((dates) => {
				this.setState({
					dates
				});
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);

			});
	};

	// ----- Submit Functions -----

	// Select an available date
	// - Run in TableCell
	// Takes the dateID of the selected date
	// Adds to selected_dates state, updates dates
	selectOpenDate(dateID) {
		const _userID = this.props.userID;
		const _dateID = dateID;
		api.addUser(_userID, _dateID)
			.then((res) => {
				this.setState({
					selected_dates: [...this.state.selected_dates, res]
				}, () => this.updateDates());
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			});
	}


	// Remove selected date (from sidebar)
	// - Run in SelectedTable (SideNav)
	// - Removes user from date and removes
	// date obj from selected_dates state
	removeSelectedDate(dateID) {
		const _userID = this.props.userID;
		const _dateID = dateID;
		api.deleteUser(_userID, _dateID)
			.then((res) => {
				var sArray = [...this.state.selected_dates];
				sArray = sArray.filter(obj => obj._id !== _dateID);
				this.setState({
					selected_dates: sArray
				}, () => this.updateDates());
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			});
	}

	// Confirm selected date
	// Since user already added, all we have to do it remove
	// this row from the selected_list array.
	confirmSelectedDate(dateID) {
		const _dateID = dateID;
		let sArray = [...this.state.selected_dates];
		sArray = sArray.filter(obj => obj._id !== _dateID);
		this.setState({
			selected_dates: sArray
		}, () => this.updateDates());
	}

	// --------- Modal Alert Functions -----------

	// Trigger user notification through AlertStruct
	// status: one of ['info', 'success', 'warning', 'danger']
	// header: Title of the alert
	// msg: Text of the message
	triggerAlert = (status, msg, header) => {
		this.setState({
			alert_show: true,
			alert_status: status,
			alert_header: header,
			alert_msg: msg
		});
	};



	// ----------- Admin Functions -------------

	removeUser(username, dateID) {
		api.findUser(username)
			.then((usr) => {
				api.deleteUser(usr._id, dateID)
					.then((res) => {
						this.updateDates();
					})
					.catch(err => console.error(err));
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			});
	};

	// ------- Component-specific Functions -------

	handleAlertClose = () => {
		this.setState({ alert_show: false });
	};

	handleAlertOpen = () => {
		this.setState({ alert_show: true });
	};


	componentWillMount() {
		this.triggerAlert('info', 'Weekend scheduler details here...', `Welcome ${this.props.username}!`);
		this.getDates(this.state.qtr, this.state.year, this.state.product);

	}

	componentDidMount() {
		// const d = new Date();
		// const yr = d.getFullYear();
		// const qtr = api.getQtr(d.getMonth());
		// this.getDates(this.state.qtr, this.state.year, this.state.product);
		//this.removeUser("test", "5c0579b5d6a5bd53182361e1");
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
									changeProd={this.changeProd}
									getUserDetails={this.getUserDetails}
									/>
						</div>
							<AlertStruct 
							status={this.state.alert_status} 
							message={this.state.alert_msg}
							header={this.state.alert_header} 
							show={this.state.alert_show}
							handleClose={this.handleAlertClose}
							handleShow={this.handleAlertOpen}
							/>
						<div className="row">
							<div className="col-lg-2 col-md-2">
								<SideNav 
									qtr={this.state.qtr}
									year={this.state.year}
									product={this.state.product}
									changeQtr={this.changeQtr}
									changeYear={this.changeYear}
									selectedDates={this.state.selected_dates}
									removeDate={this.removeSelectedDate}
									confirmDate={this.confirmSelectedDate}
								/>
								<UserOverlay />
							</div>
							<div className="col-lg-10 col-md-10">
								<div className="col-lg-10 col-md-10">
									<MainTable 
										qtr={this.state.qtr}
										year={this.state.year}
										product={this.state.product}
										assigned_product={this.state.assigned_product}
										designation={this.props.designation}
										selectDate={this.selectOpenDate}
										dates={this.state.dates}
										getDates={this.getDates}
										// Admin functions
										removeUser={this.removeUser}
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
	userID: PropTypes.string
};

export default AppContainer;