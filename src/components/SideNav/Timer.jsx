import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import '../../scss/main.scss';

class Timer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			run: false,
			start: 60
		};


		this.secondsTicked = 0;
		this.intervalHandle;

		// Timer functions
		this.onStart = this.onStart.bind(this);
		this.onStop = this.onStop.bind(this);
		this.tick = this.tick.bind(this);

	}

	onStart() {
		console.log('timer started');
		this.intervalHandle = setInterval(this.tick, 1000);
	}

	tick() {
		if(this.state.start > 0) {
			this.setState({
				start: this.state.start - 1
			});
		this.secondsTicked++;

		} else {
			this.onStop();
		}
	}

	onStop() {
		console.log('timer stopped');
		this.setState({
			run: false
		})
		clearInterval(this.intervalHandle);
		this.props.confirmDate(this.props.dateid);

	}

	componentDidMount() {
		this.onStart();
	}

	componentWillUnmount() {
		this.onStop();
	}


	render() {
		return(
			<td>
				<span>{this.state.start}</span>
			</td>
		);
	}

}

Timer.propTypes = {
	confirmDate: PropTypes.func.isRequired,
	dateid: PropTypes.string.isRequired
};

export default Timer;