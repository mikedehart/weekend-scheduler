import React from 'react';
import '../scss/main.scss';

const Nav = () => {
	return (
			<div className="col-lg-3">
				<h1 className="my-4"></h1>
				<div className="list-group">
		            <a href="#" className="list-group-item active">Category 1</a>
		            <a href="#" className="list-group-item">Category 2</a>
		            <a href="#" className="list-group-item">Category 3</a>
	          	</div>		
			</div>
	);
};

export default Nav;