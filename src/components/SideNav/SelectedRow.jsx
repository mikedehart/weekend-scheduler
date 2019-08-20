import React from 'react';
import PropTypes from 'prop-types';
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


export default SelectedRow;