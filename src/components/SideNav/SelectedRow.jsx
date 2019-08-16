import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';


const SelectedRow = (props) => (

	<tr>
		<td>{props.date}</td>
		<td>{props.product}</td>
		<td onClick={() => {props.removeDate(props.dateid)}}>✖</td>
	</tr>

);


SelectedRow.propTypes = {

}


export default SelectedRow;