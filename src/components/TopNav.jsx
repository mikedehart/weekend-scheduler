import React, { Component } from 'react';
import '../scss/main.scss';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ModalStruct from './ModalStruct';
import AdminStruct from './AdminStruct';

import * as api from '../api';

/*******************************
	Top Nav
	=====================
	- Handles/displays top nav bar in UI
	- Allows changing products, admin panel (for admins only)
	- Button to create user or select alt days

********************************/


class TopNav extends Component {
	constructor(props) {
		super(props);


		this.toggleAdminShow = this.toggleAdminShow.bind(this);
		this.toggleAdminHide = this.toggleAdminHide.bind(this);

		this.state = {
			adminShow: false
		};

		this.api = api;
	}

	toggleAdminShow() {
		this.setState({
			adminShow: true
		});
	}

	toggleAdminHide() {
		this.setState({
			adminShow: false
		});
	}

	// toggleLockQtr(evt) {
	// 	evt.preventDefault();
	// 	const data = new FormData(evt.target);
	// 	let lockBool = false;
	// 	let changedQtr = data.get('unlock_qtr');
	// 	if(!changedQtr) {
	// 		changedQtr = data.get('lock_qtr');
	// 		lockBool = true;
	// 	}
	// 	api.toggleLockQtr(changedQtr, lockBool)
	// 		.then((res) => {
	// 			return res;
	// 		})
	// 		.catch((err) => {
	// 			throw new Error(err.response.data);
	// 		})
	// }


	adminButton(designation) {
		if(designation === 'TSM') {
			return (
				<NavItem eventKey={1} onClick={this.toggleAdminShow}>
			      Admin Mode
			    </NavItem>
			);
		} else {
			return ("");
		}
	}


	render() {
		return(
			<Navbar collapseOnSelect>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="#home">Weekend Scheduler</a>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			  	<Nav>
				    <NavDropdown eventKey={3} title="Schedules" id="basic-nav-dropdown">
				      <MenuItem eventKey={3.1} onSelect={this.props.changeProd}>ASE</MenuItem>
				      <MenuItem eventKey={3.2} onSelect={this.props.changeProd}>IQ</MenuItem>
				      <MenuItem eventKey={3.3} onSelect={this.props.changeProd}>REP</MenuItem>
				    </NavDropdown>
				    {this.adminButton(this.props.designation)}
				    <AdminStruct 
				    	show={this.state.adminShow}
				    	qtrList={this.props.qtrList}
				    	toggleAdminHide={this.toggleAdminHide}
				    	toggleLockQtr={this.props.toggleLockQtr}
				    />
				    <NavItem eventKey={2} href="#">
				      Link
				    </NavItem>
				  </Nav>
				  <div className="user_btn">
				  	<ModalStruct 
				  		authenticated={this.props.authenticated}
				  		username={this.props.username}
				  		inum={this.props.inum}
				  		altDays={this.props.altDays}
				  		handleRedirect={this.props.handleRedirect}
				  		updateUserAltDay={this.props.updateUserAltDay}
				  	/>
				  </div>
			  </Navbar.Collapse>
			</Navbar>
		);
	}



}

TopNav.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired,
	inum: PropTypes.string.isRequired,
	designation: PropTypes.string.isRequired,
	qtrList: PropTypes.array.isRequired,
	altDays: PropTypes.array.isRequired,
	handleRedirect: PropTypes.func,
	changeProd: PropTypes.func,
	toggleLockQtr: PropTypes.func,
	updateUserAltDay: PropTypes.func
};

export default TopNav;


// Throws warning
// <Navbar.Text pullRight>{this.props.generateButton()}</Navbar.Text>