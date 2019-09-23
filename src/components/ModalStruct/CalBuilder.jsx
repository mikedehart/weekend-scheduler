import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import '../../scss/main.scss';

import * as api from '../../api';
import config from '../../config/config';

/***************
	CalBuilder
	- Builds iCal event based on alternative date information.
	- iCal is built and saved in API /tmp folder.
	- Then, open url to the file to download (window.open)

****************/

const CalBuilder = (props) => {

	const getDownload = () => {
		const startDateTime = props.times.start;
		const endDateTime = props.times.end;
		api.writeiCal(startDateTime, endDateTime, props.user, props.date, props.email, props.mgr, props.id)
			.then((res) => {
				if(!res) {
					return new Error('No ical info returned!');
				} else {
					const fileName = res;
					if(typeof window !== 'undefined') {
						window.open(`${config.api.server}/api/users/download/${fileName}`);
					}
				}
			})
			.catch((err) => {
				console.error(err);
			})
		}

	// Return button. OnClick run the function above.
	return (
		<Button onClick={getDownload}>Save to Calendar</Button>
	);

}

CalBuilder.propTypes = {
	times: PropTypes.object.isRequired,
	email: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired,
	mgr: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired
};

export default CalBuilder;