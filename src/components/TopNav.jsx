import React from 'react';
import '../scss/main.scss';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class TopNav extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Navbar>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="#home">Weeknd Scheduler</a>
			    </Navbar.Brand>
			  </Navbar.Header>
			  <Nav>
			    <NavItem eventKey={1} href="#">
			      Link
			    </NavItem>
			    <NavItem eventKey={2} href="#">
			      Link
			    </NavItem>
			    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
			      <MenuItem eventKey={3.1}>Action</MenuItem>
			      <MenuItem eventKey={3.2}>Another action</MenuItem>
			      <MenuItem eventKey={3.3}>Something else here</MenuItem>
			      <MenuItem divider />
			      <MenuItem eventKey={3.4}>Separated link</MenuItem>
			    </NavDropdown>
			  </Nav>
			</Navbar>
		);
	}
}

export default TopNav;