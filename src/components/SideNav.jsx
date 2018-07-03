import React from 'react';
import '../scss/main.scss';
import { NavLink } from 'react-router-dom';

const SideNav = () => (
	<div className="list-group">
		<a className="list-group-item">ASE</a>
		<a className="list-group-item">IQ</a>
		<a className="list-group-item">REP</a>
  	</div>
);

export default SideNav;