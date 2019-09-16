import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

// Calendar extras
import AddToCal from 'react-add-to-calendar';

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
			emailObj: {}
		};
	}

	handleChange = (date) => {
		let stringDate = `${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`;
		this.setState({
			altDate: date,
			altString: stringDate
		});
	};




	render() {
		if(this.props.alt) {
			let email = {
				title: `Alt day for ${this.props.user}`,
				description: `[Remember to CC your manager!]\nAlternative day for weekend/holiday: ${this.props.date}`,
				location: 'Boston, MA',
				startTime: this.props.alt, 
				endTIme: this.props.alt
			}
			// this.setState({
			// 	emailObj:

			// })
		}
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
									{(!this.props.alt) ? <Button type="submit">Submit</Button> : <Button type="submit" disabled>Submit</Button>}
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


// return (
// 			<div>
// 				<form>
// 					<Table>
// 						<tbody>
// 							<tr><td>{this.props.date}</td>
// 							<td><DatePicker selected={this.state.altDate} onChange={this.handleChange} /></td>
// 							<td><Button type="submit">Submit</Button></td></tr>
// 						</tbody>
// 					</Table>
// 				</form>
// 			</div>
// 		);