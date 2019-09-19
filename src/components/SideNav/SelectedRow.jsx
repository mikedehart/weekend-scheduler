import React from 'react';
import PropTypes from 'prop-types';

import Timer from './Timer';
import '../../scss/main.scss';

const SelectedRow = (props) => (

	<tr>
		<td>{props.date}</td>
		<td>{props.product}</td>
		<td className="remove_row" onClick={() => {props.removeDate(props.dateid)}}>❌</td>
		<td className="confirm_row" onClick={() => {props.confirmDate(props.dateid)}}>✔️</td>
	</tr>

);


SelectedRow.propTypes = {

}
// TODO: Timer not working. When timer active, deleting a 'selected date'
// actually deletes 2 rows instead of just selected row. Narrowed issue down to this timer component
// <Timer 
// 			confirmDate={props.confirmDate}
// 			dateid={props.dateid}
// 		/>
export default SelectedRow;