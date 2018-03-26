import React from 'react';
import '../scss/main.scss';
import { NavLink } from 'react-router-dom';

const Nav = () => (
	<div className="list-group">
        <NavLink to="/ase" className="list-group-item">ASE</NavLink>
        <NavLink to="/iq" className="list-group-item">IQ</NavLink>
        <NavLink to="/rep" className="list-group-item">REP</NavLink>
  	</div>
);

export default Nav;