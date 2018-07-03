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
		      <MenuItem eventKey={3.1}>ASE</MenuItem>
		      <MenuItem eventKey={3.2}>IQ</MenuItem>
		      <MenuItem eventKey={3.3}>REP</MenuItem>
		      <MenuItem divider />
		      <MenuItem eventKey={3.4}>Separated link</MenuItem>
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
		  	/>
		  </div>
	  </Navbar.Collapse>
	</Navbar>
);

TopNav.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired,
	inum: PropTypes.string.isRequired,
	handleRedirect: PropTypes.func
};

export default TopNav;


// Throws warning
// <Navbar.Text pullRight>{this.props.generateButton()}</Navbar.Text>