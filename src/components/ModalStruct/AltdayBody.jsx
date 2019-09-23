import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

// For generating iCal
import CalBuilder from './CalBuilder';
import moment from 'moment';

// CSS
import '../../scss/main.scss';
import '../../scss/table.scss';
import '../../scss/react-datepicker.min.css';

import { Table, Button, FormControl } from 'react-bootstrap';


class AltdayBody extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			altDate: '',
			altString: '',
		};
		// List Google cal or Outlook for saving calendar details
		this.listItems = [{ outlook: 'Outlook' }, { google: 'Google '}];
	}

	handleChange = (date) => {
		if(!date || date === '') {
			throw new Error('No date passed!');
			this.setState({
				altDate: new Date()
			});
		}
		let stringDate = `${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`;
		this.setState({
			altDate: date,
			altString: stringDate
		});
	};


	setTimes = () => {
		const d = new Date(this.props.alt);
		let _start = moment(d).hour(7).minute(0);
		let _end = moment(d).hour(7).minute(15);
		return new Object({
			start: _start.toISOString(),
			end: _end.toISOString()
		});
	};

	componentDidMount() {

	}


	render() {
		return (
			<div>
				<Table className="alt_table" size="sm">
					<thead>
						<tr className="alt_row"><th className="alt_head">Selected Date</th><th className="alt_head">Alt date</th><th> </th></tr>
					</thead>
					<tbody>
						<tr>
							<td>{this.props.date}</td>
							{(!this.props.alt) ? 
								<td><DatePicker selected={this.state.altDate} onChange={this.handleChange} /></td>
								: <td>{this.props.alt}</td>}
							<td>
								<form type="post" onSubmit={this.props.updateUserAltDay}>
									<FormControl type="hidden" readOnly name="altID" value={this.props.id} />
									<FormControl type="hidden" readOnly name="dateVal" value={this.state.altString} />
									{(!this.props.alt) ? 
										<Button type="submit">Submit</Button> : 
										<CalBuilder
											key={this.props.id}
											times={this.setTimes()}
											date={this.props.date}
											user={this.props.user}
											email={this.props.email}
											mgr={this.props.mgr}
											id={this.props.id}
										/>}
								</form>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}

}

AltdayBody.propTypes = {
	id: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired,
	alt: PropTypes.string,
	email: PropTypes.string.isRequired,
	mgr: PropTypes.string.isRequired,
	qtr: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	updateUserAltDay: PropTypes.func.isRequired
};

export default AltdayBody;


/****** Old function for using state in email gen. Better to just return it.
		Left here in-case there is a use-case for moving back to state ********/
// setEmail = () => {
// 		if(this.props.alt || this.state.altString !== '') {
// 			const d = (this.props.alt) ? new Date(this.props.alt).toISOString() : new Date(this.state.altString).toISOString();
// 			let _startTime = moment(d).hour(7).minute(0);
// 			let _endTime = moment(d).hour(7).minute(15);

// 			let email = {
// 				title: `Alt day for ${this.props.user}`,
// 				description: `[Remember to add your manager!] Alternative day for weekend/holiday: ${this.props.date}`,
// 				location: 'Boston, MA',
// 				startTime: _startTime.toISOString(),
// 				endTime: _endTime.toISOString()
// 			},
// 			listItems = [
// 				{ outlook: 'Outlook' },
// 				{ google: 'Google '}
// 			];

// 			console.log(email);
// 			this.setState({
// 				emailObj: email,
// 				listItems: listItems
// 			});
// 		}
// 	};