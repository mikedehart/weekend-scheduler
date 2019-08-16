import React from 'react';
import PropTypes from 'prop-types';

const AdminCell = (props) => (
	<td className={props.className}>{props.name}</td>
);

AdminCell.propTypes = {
	name: PropTypes.string,
	dateID: PropTypes.string,
	className: PropTypes.string
}

export default AdminCell;