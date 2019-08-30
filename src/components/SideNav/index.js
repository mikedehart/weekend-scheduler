import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';
import { Nav, NavItem, Label, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

import SelectedTable from './SelectedTable';


const SideNav = (props) => {
	// get all qtrs that are unlocked
	const unlockedQtrs = props.qtrList.filter(qtr => qtr.locked === false);
	// flatten qtr obj array (to pass in return), objs not valid react children
	const qtrArray = unlockedQtrs.flatMap(qtr => [[qtr.quarter, qtr.year]]).filter((qtr) => {
		if(qtr[1] === props.year) return qtr;
	});
	// get distinct years for the year select box
	const distinctYears = unlockedQtrs.flatMap(qtr => qtr.year).filter((yr, idx, self) => self.indexOf(yr) === idx);
	return(
		<div>
			<h3 className="product_header">{props.product}</h3>
			<FormGroup controlId="formControlsSelect">
			  <ControlLabel>Year</ControlLabel>
			  <FormControl componentClass="select" defaultValue={props.year} onChange={props.changeYear}>
			  	{distinctYears.map((yr, idx) => <option key={idx} value={yr}>{yr}</option>)}
			  </FormControl>
			</FormGroup>

			<Nav bsStyle="pills" stacked activeKey={parseInt(props.qtr, 10)} onSelect={key => props.changeQtr(key)}>
				{qtrArray.map((qtr, idx) => <NavItem key={idx} eventKey={qtr[0]}>Quarter {qtr[0]}</NavItem>)}
				<NavItem eventKey={5}>
					Holidays
				</NavItem>
			</Nav>
			<hr className="divider" />
			<SelectedTable 
				selectedDates={props.selectedDates}
				removeDate={props.removeDate}
				confirmDate={props.confirmDate}
			/>
		</div>
	);
};

SideNav.propType = {
	qtr: PropTypes.string.isRequired,
	year: PropTypes.string.isRequired,
	product: PropTypes.string.isRequired,
	qtrList: PropTypes.array.isRequired,
	changeQtr: PropTypes.func.isRequired,
	changeYear: PropTypes.func.isRequired,
	selectedDates: PropTypes.array.isRequired,
	removeDate: PropTypes.func.isRequired,
	confirmDate: PropTypes.func.isRequired
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