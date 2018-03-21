import React from 'react';
import '../scss/main.scss';

const Nav = () => {
	return (
		<div className="list-group">
	        <a href="#" className="list-group-item active">Calendar</a>
	        <a href="#" className="list-group-item">Alt. Days</a>
	        <a href="#" className="list-group-item">Switch Shifts</a>
	  	</div>		
	);
};

export default Nav;