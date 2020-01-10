import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../config/config';
import * as api from '../api';

import SideNav from './SideNav';
import MainTable from './MainTable';
import TopNav from './TopNav';
import AlertStruct from './AlertStruct';
import ModalStruct from './ModalStruct';

/*******************************
	Application Container
	=====================
	- This is the main parent component of
	entire react frontend. State that affects
	whole app is set and modified here.
	- Initial user info is passed from index.js and used to set
	state information for app.

********************************/

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
			qtrList: [],
			altDays: []
		};
	}

/**********************************
 *
 *	Schedule Functions
 *
 *	- Used to alter year/quarter/product in schedule
 *
 **********************************/

/*
	Change quarters (used in Maintable)
*/
	changeQtr = (qtr) => {
		this.setState({
			qtr
		});
	};

/*
	Change year (used in Maintable)
*/
	changeYear = (evt) => {
		this.setState({
			year: parseInt(evt.target.value, 10),
			qtr: 1
		});
	};

/*
	Change product (used in Maintable)
*/
	changeProd = (key) => {
		let prodValue = "ASE";
		if (key === 3.2) prodValue = "IQ";
		else if (key === 3.3) prodValue = "REP";
		this.setState({
			product: prodValue
		});
	};


/*
	Refresh/update dates from database
*/
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

/*
	Get dates from the database
*/

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

/**********************************
 *
 *	Submit Functions
 *
 *	- User functions to select/remove/confirm a selected date
 *
 **********************************/
/*
	Select open date cell
		- Run in TableCell
		- Takes dateID of selected date(mongo _id value)
		- Once saved, adds date to selected_dates state array
			and updates dates(corresponding alt day handled on backend)
		- If user's current table view is qtr 5 (holiday qtr), add to holidays instead
*/
	selectOpenDate(dateID) {
		const _userID = this.props.userID;
		const _designation = this.props.designation || "TSE";
		const _dateID = dateID;
		if (this.state.qtr !== 5) {
			api.addUser(_userID, _designation, _dateID)
				.then((res) => {
					// Result is json of 2 json docs: altday and newdate
					let newAlt = new Object({ id: res.altday._id, date: res.altday.dateId.date, user: res.altday.userId.username, qtr: res.altday.qtr, year: res.altday.year, alt: res.altday.alternative });
					// Add param to determine if holiday or not
					res.newdate.holiday = false;
					this.setState({
						selected_dates: [...this.state.selected_dates, res.newdate],
						altDays: [...this.state.altDays, newAlt]
					}, () => { this.updateDates(); this.getUserAltDays() });
					this.triggerAlert('success', `Date added: ${res.newdate.date}. Alternative date added.`, "Date Added");
				})
				.catch((err) => {
					if (!_userID) {
						this.triggerAlert('danger', 'You must be signed in to select dates!', 'Error!');
					} else {
						this.triggerAlert('danger', err.message, 'Error!');
					}
					
				});
		}
		else {
			api.addHolidayUser(_userID, _designation, _dateID)
				.then((res) => {
					// Result is json of 2 json docs: altday and newdate
					let newAlt = new Object({ id: res.altday._id, date: res.altday.dateId.date, user: res.altday.userId.username, qtr: res.altday.qtr, year: res.altday.year, alt: res.altday.alternative });
					// Add param to determine if holiday or not
					res.newdate.holiday = true;
					this.setState({
						selected_dates: [...this.state.selected_dates, res.newdate],
						altDays: [...this.state.altDays, newAlt]
					}, () => { this.updateDates(); this.getUserAltDays() });
					this.triggerAlert('success', `Date added: ${res.newdate.date}. Alternative date added.`, "Date Added");
				})
				.catch((err) => {
					if (!_userID) {
						this.triggerAlert('danger', 'You must be signed in to select dates!', 'Error!');
					} else {
						this.triggerAlert('danger', err.message, 'Error!');
					}
				});
		}
	}

/*
	Remove selected date
		- When user clicks 'X' for selected date
		- Removes user from date and deletes date from
			selected_dates state.
		- Alt day automatically removed on backend
		- Runs in SelectedTable (SideNav)
		- Works for holidays if isHoliday bool is true
*/
	removeSelectedDate(dateID, isHoliday) {
		const _userID = this.props.userID;
		const _dateID = dateID;
		if(!isHoliday) {
			api.deleteUser(_userID, _dateID)
				.then((res) => {
					let sArray = [...this.state.selected_dates],
						altArray = [...this.state.altDays];
					let sIdx = sArray.findIndex((date) => date._id === _dateID),
						altIdx = altArray.findIndex((altday) => altday.id === res.altday._id);
					if (sIdx !== -1) {
						sArray.splice(sIdx, 1);
					}
					if(altIdx !== -1) {
						altArray.splice(altIdx, 1);
					}
					this.setState({
						selected_dates: sArray,
						altDays: altArray
					}, () => { this.updateDates(); this.getUserAltDays() });
					if(!res.altday) {
						this.triggerAlert('warning', `Date removed: ${res.removeDate.date}. No alternative day found!`, "Date Removed");
					} else {
						this.triggerAlert('success', `Date removed: ${res.removeDate.date}. Alternative date removed.`, "Date Removed");
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
					let sArray = [...this.state.selected_dates],
						altArray = [...this.state.altDays];
					let sIdx = sArray.findIndex((date) => date._id === _dateID),
						altIdx = altArray.findIndex((altday) => altday.id === res.altday._id);
					if (sIdx !== -1) {
						sArray.splice(sIdx, 1);
					}
					if(altIdx !== -1) {
						altArray.splice(altIdx, 1);
					}
					this.setState({
						selected_dates: sArray,
						altDays: altArray
					}, () => { this.updateDates(); this.getUserAltDays() });
					if(!res.altday) {
						this.triggerAlert('warning', `Date removed: ${res.removeDate.date}. No alternative day found!`, "Date Removed");
					} else {
						this.triggerAlert('success', `Date removed: ${res.removeDate.date}. Alternative date removed.`, "Date Removed");
					}
				})
				.catch((err) => {
					this.triggerAlert('danger', err.message, 'Error!');
					console.error(err);
				});

		}
	}

/*
	Confirm selected date
		- When user clicks check mark (need to change to timer)
		- 'Confirms' already selected date.
			- Since user already added, all this does is remove the date
			from selected_dates. After which, no longer removable by the user
*/
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
		}, () => { this.updateDates(); this.getUserAltDays() });
	}


/**********************************
 *
 *	Alert Trigger
 *
 *	- Used to trigger 'alert' banner to users
 *	- Used to show errors / success / info to users
 *	- Used to send feedback to user from a LOT 
 *		of user-facing components
 *	- PARAMETERS:
 *		alert_show: [true | false] - whether or not to show alert
 *		alert_status: ['info' | 'success' | 'warning' | 'danger'] - changes display of alert
 *		alert_header: [String] -  title of the alert
 *		alter_msg: [String] - description to display in alert
 *
 **********************************/
	triggerAlert = (status, msg, header) => {
		this.setState({
			alert_show: true,
			alert_status: status,
			alert_header: header,
			alert_msg: msg
		});
	};

	handleAlertClose = () => {
		this.setState({ alert_show: false });
	};

	handleAlertOpen = () => {
		this.setState({ alert_show: true });
	};


/**********************************
 *
 *	Admin Functions
 *
 *	- Used by admins to alert users / schedule 
 *	- Generally these are triggered either in user overlay (see TableCell)
 *		or in Admin console (see TopNav)
 *
 ***********************************/

/*
	Remove user from a date/holiday
	- Since not tied to current user, need to
		find the user first and use _id to remove from date
*/
	removeUser(username, dateID) {
		let uID, dID = dateID;
		api.findUser(username)
			.then((usr) => {
				uID = usr._id;
				if(this.state.qtr !== 5) {
					api.deleteUser(usr._id, dateID)
						.then((res) => {						
							let sArray = [...this.state.selected_dates],
								altArray = [...this.state.altDays];
							let sIdx = sArray.findIndex((date) => date._id === dID),
								altIdx = altArray.findIndex((altday) => altday._id === res.altday._id);
							if (sIdx !== -1) {
								sArray.splice(sIdx, 1);
							}
							if(altIdx !== -1) {
								altArray.splice(altIdx, 1);
							}
							this.setState({
								selected_dates: sArray,
								altDays: altArray
							}, () => { this.updateDates(); this.getUserAltDays() });
							// User removed, remove associated alt-day
							if(!res.altday) {
								this.triggerAlert('warning', `User deleted from ${res.removeDate.date}. No AltDay found!`, "User Deleted");
							} else {
								this.triggerAlert('success', `User deleted from date. AltDay deleted.`, "User Deleted");
							}
						})
						.catch((err) => {
							this.triggerAlert('danger', err.message, 'Error!');
							console.error(err);
						});
				} 
				else {
					api.deleteHolidayUser(usr._id, dateID)
						.then((res) => {
							let sArray = [...this.state.selected_dates],
								altArray = [...this.state.altDays];
							let sIdx = sArray.findIndex((date) => date._id === dID),
								altIdx = altArray.findIndex((altday) => altday._id === res.altday._id);
							if (sIdx !== -1) {
								sArray.splice(sIdx, 1);
							}
							if(altIdx !== -1) {
								altArray.splice(altIdx, 1);
							}
							this.setState({
								selected_dates: sArray,
								altDays: altArray
							}, () => { this.updateDates(); this.getUserAltDays() });
							// User removed, remove associated alt-day
							if(!res.altday) {
								this.triggerAlert('warning', `User deleted from ${res.removeDate.date}. No AltDay found!`, "User Deleted");
							} else {
								this.triggerAlert('success', `User deleted from date. AltDay deleted.`, "User Deleted");
							}
						})
						.catch(err => console.error(err));
				}
			})
			.catch((err) => {
				this.triggerAlert('danger', err.message, 'Error!');
				console.error(err);
			});
	};

/*
	Change user assigned to date/holiday
		- Ugly function, needs a re-write
		- Currently has to find user, then delete user,
			then find new user and add that user
			- All use separate API calls (not great, move to backend?)

*/
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
											let sArray = [...this.state.selected_dates],
												altArray = [...this.state.altDays];
											sArray = sArray.filter(obj => obj._id !== _dateID);
											altArray = altArray.filter(obj => obj.id !== res.altday._id)
											this.setState({
												selected_dates: sArray,
												altDays: altArray
											}, () => { this.updateDates(); this.getUserAltDays() });
											this.triggerAlert('success', `User changed for ${res.newdate.date}`, "User Changed");
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
									api.addHolidayUser(newusr._id, _designation, _dateID)
										.then((res) => {
											let sArray = [...this.state.selected_dates],
												altArray = [...this.state.altDays];
											sArray = sArray.filter(obj => obj._id !== _dateID);
											altArray = altArray.filter(obj => obj.id !== res.altday._id)
											this.setState({
												selected_dates: sArray,
												altDays: altArray
											}, () => { this.updateDates(); this.getUserAltDays() });
											this.triggerAlert('success', `User changed for holiday: ${res.newdate.date}`, "User Changed");
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

/*
	Get all quarters and save to state
*/
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

/*
	Lock/Unlock a quarter
		- Used for both locking/unlocking depending on data submitted
		- Passed to TopNav
*/
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


/**********************************
 *
 *	Alternative Day Functions
 *
 *	- Client able to schedule an alt day or take pager pay for
 * 		each weekend date selected
 *	- Adding/deleting alt days handled on the backend
 *	- Allows users to submit/view alternative days
 *
 ***********************************/

/*
	Get all alt-days associated with current user
*/
	getUserAltDays() {
	let _userid = this.props.userID;
	api.getUserAltDays(_userid)
		.then((res) => {
			let altArray = [];
			if (res.length !== 0) {
				altArray = res.map((day) => {
					return new Object({ 
						id: day._id, 
						date: day.dateId.date, 
						user: day.userId.username, 
						email: day.userId.email,
						mgr: day.userId.mgr_email,
						pay: day.pay,
						qtr: day.qtr, 
						year: day.year, 
						alt: day.alternative 
					});
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

/*
	Update an alt day for user.
		- Used by ModalStruct to select altday
		- Can select either altday or pager pay
			- If both or neither selected, throw error
			- Needs to be EITHER alt date or pager pay (boolean)
*/
	updateUserAltDay(evt) {
		evt.preventDefault();
		const data = new FormData(evt.target);
		let altdaysId = data.get('altID');
		let dateVal = data.get('dateVal');
		let pagerStr = data.get('pagerVal');
		let pagerVal = (pagerStr === "true") ? true : false;
		if(!altdaysId || (!dateVal && pagerVal === false)) {
			this.triggerAlert('danger', 'No alt day / pager pay selected!', 'Error adding alt day');
			return;
		} else if(dateVal && pagerVal !== false) {
			this.triggerAlert('danger', 'Alt day AND pay selected! Please select only a date or pager checkbox.', 'Error adding alt day');
			return;
		}
		if(dateVal) {
			api.updateAltDay(altdaysId, dateVal)
				.then((res) => {
					let altArray = [...this.state.altDays];
					let idx = altArray.findIndex((alt) => alt.id === res._id);
					if(idx > -1) {
						altArray[idx].alt = res.alternative;
					}
					this.setState({
						altDays: altArray
					})
					this.triggerAlert('success', `Alt day added: ${res.alternative}`, 'Alt Day Added');
				})
				.catch((err) => {
					console.error(err);
					return err;
				});
		} else {
			api.updatePagerPay(altdaysId, pagerVal)
				.then((res) => {
					let altArray = [...this.state.altDays];
					let idx = altArray.findIndex((alt) => alt.id === res._id);
					if(idx > -1) {
						altArray[idx].pay = res.pay;
					}
					this.setState({
						altDays: altArray
					})
					this.triggerAlert('success', `Pager pay added: ${res.pay}`, 'Alt Day Added');
				})
				.catch((err) => {
					console.error(err);
					return err;
				});


		}
	}


/********************************
	Component-specific Functions

*********************************/

	UNSAFE_componentWillMount() {
		// DO NOT USE
		// Considered unsafe
	}

	componentDidMount() {
		this.triggerAlert('info', 'Click on a cell to select a date. Dates can be removed from the left-hand column. Alternative days can be accessed via the button in the upper right.', `Welcome ${this.props.username || 'New User'}!`);
		this.getDates(this.state.qtr, this.state.year, this.state.product);
		this.getQtrs();
		this.getUserAltDays();
	}

	handleRedirect = () => {
		if(typeof window !== 'undefined') {
			window.location.replace(`${config.api.server}/auth/signin`);
		}
		else {
			console.error('Window undefined!');
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