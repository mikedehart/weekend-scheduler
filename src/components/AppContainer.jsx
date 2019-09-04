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
		this.changeUser = this.changeUser.bind(this);
		this.toggleLockQtr = this.toggleLockQtr.bind(this);

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
			assigned_dates: [],
			qtrList: []
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

	// Three functions below handle
	// updating the calendar based on changes
	// to quarter, year, or product.
	changeQtr = (qtr) => {
		this.setState({
			qtr
		});
	};

	changeYear = (evt) => {
		this.setState({
			year: parseInt(evt.target.value, 10),
			qtr: 1
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
						this.triggerAlert('success', `User deleted from ${res.date}`, "User Deleted");
						let sArray = [...this.state.selected_dates];
						sArray = sArray.filter(obj => obj._id !== dateID);
						this.setState({
							selected_dates: sArray
						}, () => this.updateDates());
					})
					.catch(err => console.error(err));
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			});
	};


	changeUser(evt) {
		evt.preventDefault();
		const data = new FormData(evt.target);
		const _currentUsr = data.get('current_user');
		const _newUsr = data.get('new_user');
		const _dateID = data.get('dateID');
		api.findUser(_currentUsr)
			.then((usr) => {
				api.deleteUser(usr._id, _dateID)
					.then((res) => {
						api.findUser(_newUsr)
							.then((newusr) => {
								api.addUser(newusr._id, _dateID)
									.then((res) => {
										this.triggerAlert('success', `User changed for ${res.date}`, "User Changed");
										let sArray = [...this.state.selected_dates];
										sArray = sArray.filter(obj => obj._id !== _dateID);
										this.setState({
											selected_dates: sArray
										}, () => this.updateDates());
									})
									.catch((err) => {
										this.triggerAlert('danger', err.message, 'Error!');
										console.error(err);
									});
							})
							.catch((err) => {
								this.triggerAlert('danger', err.message, 'Error!');
								console.error(err);
							});
					})
					.catch((err) => {
						this.triggerAlert('danger', err.message, 'Error!');
						console.error(err);
					});
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			});
	};

	// Qtr functions

	getQtrs() {
		api.getAllQtrs()
			.then((res) => {
				this.setState({
					qtrList: res
				});
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			})

	};

	toggleLockQtr(evt) {
		evt.preventDefault();
		const data = new FormData(evt.target);
		let lockBool = false;
		let changedQtr = data.get('unlock_qtr');
		if(!changedQtr) {
			changedQtr = data.get('lock_qtr');
			lockBool = true;
		}
		api.toggleLockQtr(changedQtr, lockBool)
			.then((res) => {
				this.triggerAlert('success', `Quarter changed: ${res.quarter}-${res.year}: Locked: ${res.locked}`, 'Quarter Changed');
				this.getQtrs();
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			})
	}



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
		this.getQtrs();

	}

	componentDidMount() {
		// const d = new Date();
		// const yr = d.getFullYear();
		// const qtr = api.getQtr(d.getMonth());
		// this.getDates(this.state.qtr, this.state.year, this.state.product);
		//this.removeUser("test", "5c0579b5d6a5bd53182361e1");
		//console.log(api.getAllUsernames());
	}

	handleRedirect = () => {
		if(typeof window !== 'undefined') {
			window.location.replace(`${config.api.server}/auth/signin`);
		}
		else {
			console.log('Window undefined!');
		}
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
								qtrList={this.state.qtrList}
								getUserDetails={this.getUserDetails}
								designation={this.props.designation}
								toggleLockQtr={this.toggleLockQtr}
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
									qtrList={this.state.qtrList}
									changeQtr={this.changeQtr}
									changeYear={this.changeYear}
									selectedDates={this.state.selected_dates}
									removeDate={this.removeSelectedDate}
									confirmDate={this.confirmSelectedDate}
								/>
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
										changeUser={this.changeUser}
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