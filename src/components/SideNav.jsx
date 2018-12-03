import React from 'react';
import PropTypes from 'prop-types';
import '../scss/main.scss';
import { Nav, NavItem, Label, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const SideNav = (props) => (

	<div>
		<h3 className="product_header">{props.product}</h3>
		<FormGroup controlId="formControlsSelect">
		  <ControlLabel>Year</ControlLabel>
		  <FormControl componentClass="select" placeholder={props.year} onChange={props.changeYear}>
		    <option value="2018">2018</option>
		    <option value="2019">2019</option>
		    <option value="2020">2020</option>
		  </FormControl>
		</FormGroup>

		<Nav bsStyle="pills" stacked activeKey={parseInt(props.qtr, 10)} onSelect={key => props.changeQtr(key)}>
			<NavItem eventKey={1}>
				Quarter 1
			</NavItem>
			<NavItem eventKey={2}>
				Quarter 2
			</NavItem>
			<NavItem eventKey={3}>
				Quarter 3
			</NavItem>
			<NavItem eventKey={4}>
				Quarter 4
			</NavItem>
		</Nav>
	</div>
);

SideNav.propType = {
	qtr: PropTypes.string.isRequired,
	year: PropTypes.string.isRequired,
	product: PropTypes.string.isRequired,
	changeQtr: PropTypes.func.isRequired,
	changeYear: PropTypes.func.isRequired
};

export default SideNav;


// <Nav bsStyle="pills" stacked activeKey={parseInt(props.qtr, 10)}>
// 		<NavItem eventKey={1} onClick={props.getDates(1, parseInt(props.year, 10), props.product)}>
// 			Quarter 1
// 		</NavItem>
// 		<NavItem eventKey={2} onClick={props.getDates(2, parseInt(props.year, 10), props.product)}>
// 			Quarter 2
// 		</NavItem>
// 		<NavItem eventKey={3} onClick={props.getDates(3, parseInt(props.year, 10), props.product)}>
// 			Quarter 3
// 		</NavItem>
// 		<NavItem eventKey={4} onClick={props.getDates(4, parseInt(props.year, 10), props.product)}>
// 			Quarter 4
// 		</NavItem>
// 	</Nav>