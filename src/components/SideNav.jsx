import React from 'react';
import '../scss/main.scss';
import { NavLink, BrowserRouter } from 'react-router-dom';

const Nav = () => {
	return (
		<BrowserRouter>
			<div className="list-group">
		        <NavLink to="/ase" className="list-group-item active">ASE</NavLink>
		        <NavLink to="/iq" className="list-group-item">IQ</NavLink>
		        <NavLink to="/rep" className="list-group-item">REP</NavLink>
		  	</div>
	  	</BrowserRouter>
	);
};

export default Nav;