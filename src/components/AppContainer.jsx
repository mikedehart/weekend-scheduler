import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import config from '../config/config';
import * as api from '../api';

import SideNav from './SideNav';
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
		this.getUserAltDays = this.getUserAltDays.bind(this);
		this.updateUserAltDay = this.updateUserAltDay.bind(this);

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
			qtrList: [],
			altDays: []
		};
	}

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
	// also adds corresponding alternative day
	selectOpenDate(dateID) {
		const _userID = this.props.userID;
		const _designation = this.props.designation || "TSE";
		const _dateID = dateID;
		if (this.state.qtr !== 5) {
			api.addUser(_userID, _designation, _dateID)
				.then((res) => {
					this.setState({
						selected_dates: [...this.state.selected_dates, res]
					}, () => this.updateDates());
						let _qtr = this.state.qtr,
						_year = this.state.year;
					api.addAltDay(_dateID, _userID, _qtr, _year)
						.then((res) => {
							this.triggerAlert('success', `Date added. Alternative date added.`, "Date Added");
							let newAlt = new Object({ id: res._id, date: res.dateId.date, user: res.userId.username, qtr: res.qtr, year: res.year, alt: res.alternative });
							this.setState({
								altDays: [...this.state.altDays, newAlt]
							})
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
		}
		else {
			api.addHolidayUser(_userID, _designation, _dateID)
				.then((res) => {
					this.setState({
						selected_dates: [...this.state.selected_dates, res]
					}, () => this.updateDates());
					let _userID = this.props.userID,
						_qtr = this.state.qtr,
						_year = this.state.year;
					api.addAltDay(dateID, _userID, _qtr, _year)
						.then((res) => {
							this.triggerAlert('success', `Holiday added. Alternative date added.`, "Date Added");
							let newAlt = new Object({ id: res._id, date: res.dateId.date, user: res.userId.username, qtr: res.qtr, year: res.year, alt: res.alternative })
							this.setState({
								altDays: [...this.state.altDays, newAlt]
							})
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
		}
	}


	// Remove selected date (from sidebar)
	// - Run in SelectedTable (SideNav)
	// - Removes user from date and removes
	// date obj from selected_dates state
	removeSelectedDate(dateID) {
		const _userID = this.props.userID;
		const _dateID = dateID;
		if(this.state.qtr !== 5) {
			api.deleteUser(_userID, _dateID)
				.then((res) => {
					let sArray = [...this.state.selected_dates];
					let idx = sArray.findIndex((date) => date._id === _dateID);
					if (idx !== -1) {
						sArray.splice(idx, 1);
					}
					this.setState({
						selected_dates: sArray
					}, () => this.updateDates());
					// User removed, remove associated alt-day
					let _altDay = this.state.altDays.filter((alt) => alt.date === res.date);
					if (_altDay.length > 0) {
						const altID = _altDay[0].id;
						this.deleteUserAltDay(altID)
							.then((res) => {
								// Delete the alt day from the array
								this.triggerAlert('success', `Date Removed. Alternative date removed.`, "Date Removed");
								let altArray = [...this.state.altDays];
								let idx = altArray.findIndex((altday) => altday.id === res._id);
								if(idx !== -1) {
									altArray.splice(idx, 1);
								}
								this.setState({
									altDays: altArray
								})
							})
							.catch((err) => {
								this.triggerAlert('danger', err.message, 'Error!');
								console.error(err);
							});
					}
				})
				.catch((err) => {
					this.triggerAlert('danger', err.message, 'Error!');
					console.error(err);
				});
		}
		else {
			api.deleteHolidayUser(_userID, _dateID)
				.then((res) => {
					let sArray = [...this.state.selected_dates];
					let idx = sArray.findIndex((date) => date._id === _dateID);
					if (idx !== -1) {
						sArray.splice(idx, 1);
					}
					this.setState({
						selected_dates: sArray
					}, () => this.updateDates());
					// User removed, remove associated alt-day
					let _altDay = this.state.altDays.filter((alt) => alt.date === res.date);
					if (_altDay.length > 0) {
						const altID = _altDay[0].id;
						this.deleteUserAltDay(altID)
							.then((res) => {
								this.triggerAlert('success', `Holiday Removed. Alternative date removed.`, "Holiday Removed");
								let altArray = [...this.state.altDays];
								let idx = altArray.findIndex((altday) => altday.id === res._id);
								if(idx !== -1) {
									altArray.splice(idx, 1);
								}
								this.setState({
									altDays: altArray
								})
							})
							.catch((err) => {
								this.triggerAlert('danger', err.message, 'Error!');
								console.error(err);
							});
					}
				})
				.catch((err) => {
					this.triggerAlert('danger', err.message, 'Error!');
					console.error(err);
				});

		}
	}

	// Confirm selected date
	// Since user already added, all we have to do it remove
	// this row from the selected_list array.
	confirmSelectedDate(dateID) {
		const _dateID = dateID;
		let sArray = [...this.state.selected_dates];
		//sArray = sArray.filter(obj => obj._id !== _dateID); // Fails for duplicate days
		let idx = sArray.findIndex((date) => date._id === _dateID);
		if (idx !== -1) {
			sArray.splice(idx, 1);
		}
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
		let uID, dID = dateID;
		api.findUser(username)
			.then((usr) => {
				uID = usr._id;
				if(this.state.qtr !== 5) {
					api.deleteUser(usr._id, dateID)
						.then((res) => {
							console.log('deleteinfo: ', res);
							
							let sArray = [...this.state.selected_dates];
							sArray = sArray.filter(obj => obj._id !== dateID);
							this.setState({
								selected_dates: sArray
							}, () => this.updateDates());
							// User removed, remove associated alt-day
							console.log("IDS: ", uID, dID);
							this.deleteSpecificAltDay(uID, dID)
								.then((res) => {
									console.log("result after delete: ", res);
									if(!res) {
										this.triggerAlert('warning', `User deleted from date. No AltDay found!`, "User Deleted");
									} else {
										this.triggerAlert('success', `User deleted from date. AltDay deleted.`, "User Deleted");
									}
								})
								.catch((err) => {
									this.triggerAlert('danger', err.message, 'Error!');
									console.error(err);
								})
						})
						.catch(err => console.error(err));
				} 
				else {
					api.deleteHolidayUser(usr._id, dateID)
						.then((res) => {
							this.triggerAlert('success', `User deleted from ${res.date}`, "User Deleted");
							let sArray = [...this.state.selected_dates];
							sArray = sArray.filter(obj => obj._id !== dateID);
							this.setState({
								selected_dates: sArray
							}, () => this.updateDates());
							// removing altday
							this.deleteSpecificAltDay(uID, dID)
								.then((res) => {
									console.log("result after delete: ", res);
									if(!res) {
										this.triggerAlert('warning', `User deleted from date. No AltDay found!`, "User Deleted");
									} else {
										this.triggerAlert('success', `User deleted from date. AltDay deleted.`, "User Deleted");
									}
								})
								.catch((err) => {
									this.triggerAlert('danger', err.message, 'Error!');
									console.error(err);
								})
						})
						.catch(err => console.error(err));
				}
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			});
	};


// Function to change a user on specific date.
// Ugly function, needs rewrite.
// TODO remove/add altday when user changed.
	changeUser(evt) {
		evt.preventDefault();
		const data = new FormData(evt.target);
		const _currentUsr = data.get('current_user');
		const _newUsr = data.get('new_user');
		const _dateID = data.get('dateID');
		const _designation = this.props.designation || "TSE";
		let currentID, newID;
		api.findUser(_currentUsr)
			.then((usr) => {
				currentID = usr._id;
				if(this.state.qtr !== 5) {
					api.deleteUser(usr._id, _dateID)
						.then((res) => {
							api.findUser(_newUsr)
								.then((newusr) => {
									newID = newusr._id;
									api.addUser(newusr._id, _designation, _dateID)
										.then((res) => {
											this.triggerAlert('success', `User changed for ${res.date}`, "User Changed");
											let sArray = [...this.state.selected_dates];
											sArray = sArray.filter(obj => obj._id !== _dateID);
											this.setState({
												selected_dates: sArray
											}, () => this.updateDates());
											this.deleteSpecificAltDay(currentID, _dateID)
												.then((res) => {
													console.log("deletealt: ", res);
													api.addAltDay(_dateID, newID, this.state.qtr, this.state.year)
														.then((res) => {
															console.log("addalt: ", res);
															this.triggerAlert('success', `User changed, altday changed.`, "User Changed");

														})
														.catch((err) => {
															this.triggerAlert('danger', err.message, 'Error!');
															console.error(err);
														})
												})
												.catch((err) => {
													this.triggerAlert('danger', err.message, 'Error!');
													console.error(err);
												})
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
				}
				else {
					api.deleteHolidayUser(usr._id, _dateID)
						.then((res) => {
							api.findUser(_newUsr)
								.then((newusr) => {
									newID = newusr._id;
									this.deleteSpecificAltDay(currentID, _dateID)
											.then((res) => {
												console.log("deletealt: ", res);
												api.addAltDay(_dateID, newID, this.state.qtr, this.state.year)
													.then((res) => {
														console.log("addalt: ", res);
														this.triggerAlert('success', `User changed, altday changed.`, "User Changed");

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
				}
				
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


	// Used for both locking and unlocking of qtrs based on data submitted
	// Passed to TopNav

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

	// ------------ Alternative Day / User Detail functions ----------
	/// Passed to ModalStruct

	getUserDetails = () => {
			api.getUser().then((details) => {
				console.log(details);
				return details;
			}).catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			});
		};

	// Get all alt days associated with user
	getUserAltDays() {
	let _userid = this.props.userID;
	console.log('in getaltdays');
	api.getUserAltDays(_userid)
		.then((res) => {
			let altArray = [];
			if (res.length !== 0) {
				altArray = res.map((day) => {
					return new Object({ id: day._id, date: day.dateId.date, user: day.userId.username, qtr: day.qtr, year: day.year, alt: day.alternative });
				})
			}
			this.setState({
				altDays: altArray
			});
		})
		.catch((err) => {
			console.error(err);
			return err;
		})

	}

	// Find altday by user / date IDs then delete
	deleteSpecificAltDay(_userId, _dateId) {
		let uID = _userId, dID = _dateId;
		return new Promise(function(resolve, reject) {
			api.getSpecificAltDay(uID, dID)
				.then((res) => {
					if(res.length > 0 && res[0]._id) {
						const _id = res[0]._id;
						api.deleteAltDay(_id)
							.then((res) => {
								resolve(res);
							})
							.catch((err) => {
								console.log(err);
								reject(err);
							})

					} else {
						resolve(undefined);
					}
				})
				.catch((err) => {
					reject(err);
				})
		})
	}

	// Used by ModalStruct to add alt day for user
	updateUserAltDay(evt) {
		evt.preventDefault();
		const data = new FormData(evt.target);
		let altdaysId = data.get('altID');
		let dateVal = data.get('dateVal');
		api.updateAltDay(altdaysId, dateVal)
			.then((res) => {
				let altArray = [...this.state.altDays];
				let idx = altArray.findIndex((alt) => alt.id === res._id);
				console.log("id/array: ", idx, altArray);
				if(idx > -1) {
					altArray[idx].alt = res.alternative;
				}
				console.log('after adding alt: ', altArray);
				this.setState({
					altDays: altArray
				})
				this.triggerAlert('success', `Alt day added: ${res.alternative}`, 'Alt Day Added');
			})
			.catch((err) => {
				console.error(err);
				return err;
			})

	}

	// Delete altday by ALT DAY ID
	deleteUserAltDay(_altID) {
		const altID = _altID;
		return new Promise(function(resolve, reject) {
			api.deleteAltDay(altID)
				.then((res) => {
					if(res) {
						resolve(res);
					} else {
						reject();
					}
				})
				.catch((err) => {
					console.log(err);
					reject(err);
				})
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
		// this.triggerAlert('info', 'Weekend scheduler details here...', `Welcome ${this.props.username || 'New User'}!`);
		// this.getDates(this.state.qtr, this.state.year, this.state.product);
		// this.getQtrs();
		// this.getUserAltDays();

	}

	componentDidMount() {
		this.triggerAlert('info', 'Weekend scheduler details here...', `Welcome ${this.props.username || 'New User'}!`);
		this.getDates(this.state.qtr, this.state.year, this.state.product);
		this.getQtrs();
		this.getUserAltDays();
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
								designation={this.props.designation}
								toggleLockQtr={this.toggleLockQtr}
								altDays={this.state.altDays}
								updateUserAltDay={this.updateUserAltDay}
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