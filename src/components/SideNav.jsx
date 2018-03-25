import React from 'react';
import '../scss/main.scss';
import { BrowserRouter, Route } from 'react-router-dom';

const Nav = ({match}) => {
	return (
		<BrowserRouter>
			<div className="list-group">
		        <NavLink to="#" className="list-group-item active">Calendar</NavLink>
		        <NavLink to="#" className="list-group-item">Alt. Days</NavLink>
		        <NavLink to="#" className="list-group-item">Switch Shifts</NavLink>


		        <Switch>
		        	<Route path="/ase" render={() => <MainTable />} />
			        <Route path="/iq" render={() => <MainTable />} />
			        <Route path="/rep" render={() => <MainTable />} />
		        </Switch>
		  	</div>
	  	</BrowserRouter>	
	);
};

export default Nav;