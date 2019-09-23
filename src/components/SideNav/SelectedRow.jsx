import React from 'react';
import PropTypes from 'prop-types';

import Timer from './Timer';
import '../../scss/main.scss';

const SelectedRow = (props) => (

	<tr>
		<td>{props.date}</td>
		<td>{props.product}</td>
		<td className="remove_row" onClick={() => {props.removeDate(props.dateid, props.isHoliday)}}>❌</td>
		<td className="confirm_row" onClick={() => {props.confirmDate(props.dateid)}}>✔️</td>
	</tr>

);


SelectedRow.propTypes = {
	date: PropTypes.string.isRequired,
	product: PropTypes.string.isRequired,
	dateid: PropTypes.string.isRequired,
	isHoliday: PropTypes.bool.isRequired,
	removeDate: PropTypes.func.isRequired,
	confirmDate: PropTypes.func.isRequired
};
// TODO: Timer not working. When timer active, deleting a 'selected date'
// actually deletes 2 rows instead of just selected row. Narrowed issue down to this timer component
// <Timer 
// 			confirmDate={props.confirmDate}
// 			dateid={props.dateid}
// 		/>
export default SelectedRow;