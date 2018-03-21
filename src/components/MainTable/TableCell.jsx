import React from 'react';
import PropTypes from 'prop-types';

const TableCell = (props) =>
	<td>
		{props.name}
	</td>;

TableCell.propTypes = {
	name: PropTypes.string
}

export default TableCell;