import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const AdminCell = (props) => (
	<td className={props.className}>{props.name}</td>
);

AdminCell.propTypes = {
	name: PropTypes.string,
	dateID: PropTypes.string,
	className: PropTypes.string
}

export default AdminCell;