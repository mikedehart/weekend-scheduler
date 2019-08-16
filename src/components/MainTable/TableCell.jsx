import React from 'react';
import PropTypes from 'prop-types';

const TableCell = (props) => (
	<td className={props.className} onClick={() => props.selectDate(props.dateID)}>{props.name}</td>
);

TableCell.propTypes = {
	name: PropTypes.string,
	dateID: PropTypes.string,
	selectDate: PropTypes.func,
	className: PropTypes.string
}

export default TableCell;