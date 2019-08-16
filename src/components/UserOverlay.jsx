import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Overlay, OverlayTrigger } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


const popover = (
	<Popover id="popover-positioned-bottom" title="User Actions">
		<ul>
			<li>Change User</li>
			<li>Remove User</li>
		</ul>
	</Popover>
);


const UserOverlay = () => {

	return (
		<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
			<Button variant="success">Click me</Button>
		</OverlayTrigger>
	);
};

UserOverlay.propTypes = {

}


export default UserOverlay;