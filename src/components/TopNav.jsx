import React from 'react';
import '../scss/main.scss';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

class TopNav extends React.Component {
	constructor(props) {
		super(props);
		this.state
	}

	render() {
		return (
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
				  <Navbar.Text pullRight>Signed in as: <span className="topnav-user">{this.props.user}</span></Navbar.Text>
			  </Navbar.Collapse>
			</Navbar>
		);
	}
}

TopNav.propTypes = {
	user: PropTypes.string.isRequired
};

export default TopNav;