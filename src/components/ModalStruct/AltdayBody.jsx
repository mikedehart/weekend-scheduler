import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

// Calendar extras
import AddToCal from 'react-add-to-calendar';
import moment from 'moment';

import '../../scss/main.scss';
import '../../scss/table.scss';
import '../../scss/react-datepicker.min.css';

import { Table, Button, FormControl } from 'react-bootstrap';


class AltdayBody extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			altDate: new Date(),
			altString: '',
		};
		// List Google cal or Outlook for saving calendar details
		this.listItems = [{ outlook: 'Outlook' }, { google: 'Google '}];
	}

	handleChange = (date) => {
		let stringDate = `${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`;
		this.setState({
			altDate: date,
			altString: stringDate
		});
	};


	setEmail = () => {
		if(this.props.alt || this.state.altString !== '') {
			const d = (this.props.alt) ? new Date(this.props.alt).toISOString() : new Date(this.state.altString).toISOString();
			let _startTime = moment(d).hour(7).minute(0);
			let _endTime = moment(d).hour(7).minute(15);

			let email = {
				title: `Alt day for ${this.props.user}`,
				description: `[Remember to add your manager!] Alternative day for weekend/holiday: ${this.props.date}`,
				location: 'Boston, MA',
				startTime: _startTime.toISOString(),
				endTime: _endTime.toISOString()
			}
			return email;
	}
}

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
									{(!this.props.alt) ? <Button type="submit">Submit</Button> : <AddToCal buttonClassClosed="btn btn-default" buttonClassOpen="btn btn-default" dropdownClass="cal-class" event={this.setEmail()} listItems={this.listItems} displayItemIcons={false}  />}
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