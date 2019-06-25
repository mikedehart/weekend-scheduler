import React from 'react';
import PropTypes from 'prop-types';

const TableCell = (props) => (
	<td onClick={props.clickCell}>{props.name}</td>
);

// TableCell.propTypes = {
// 	name: PropTypes.obj
// }

export default TableCell;