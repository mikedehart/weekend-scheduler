import React from 'react';
import '../scss/main.scss';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ModalStruct from './ModalStruct';



const TopNav = (props) => (
	<Navbar collapseOnSelect>
	  <Navbar.Header>
	    <Navbar.Brand>
	      <a href="#home">Weeknd Scheduler</a>
	    </Navbar.Brand>
	    <Navbar.Toggle />
	  </Navbar.Header>
	  <Navbar.Collapse>
	  	<Nav>
		    <NavDropdown eventKey={3} title="Schedules" id="basic-nav-dropdown">
		      <MenuItem eventKey={3.1} onSelect={props.changeProd}>ASE</MenuItem>
		      <MenuItem eventKey={3.2} onSelect={props.changeProd}>IQ</MenuItem>
		      <MenuItem eventKey={3.3} onSelect={props.changeProd}>REP</MenuItem>
		    </NavDropdown>
		    <NavItem eventKey={1} href="#">
		      Link
		    </NavItem>
		    <NavItem eventKey={2} href="#">
		      Link
		    </NavItem>
		  </Nav>
		  <div className="user_btn">
		  	<ModalStruct 
		  		authenticated={props.authenticated}
		  		username={props.username}
		  		inum={props.inum}
		  		handleRedirect={props.handleRedirect}
		  		getUserDetails={props.getUserDetails}
		  	/>
		  </div>
	  </Navbar.Collapse>
	</Navbar>
);

TopNav.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired,
	inum: PropTypes.string.isRequired,
	handleRedirect: PropTypes.func,
	changeProd: PropTypes.func,
	getUserDetails: PropTypes.func
};

export default TopNav;


// Throws warning
// <Navbar.Text pullRight>{this.props.generateButton()}</Navbar.Text>