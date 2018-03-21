import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import SideNav from './SideNav';
import InfoPanel from './InfoPanel';
import MainTable from './MainTable';
import TopNav from './TopNav';
import ErrorAlert from './ErrorAlert';
import ModalStruct from './ModalStruct';


class AppContainer extends Component {
	// Used to set initial state
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title,
			user: this.props.user
		}

	}

	toggleModal = (e) => {
		e.preventDefault();
	};

	render() {
		const testVals = [
	{
		id: 1222018,
		date: '1/22/2018',
		day: 'Sat',
		users: [{
				name: 'bchin',
				id: 'bchin'
			},
			{
				name: 'jting',
				id: 'jting'
			}]
	},
	{
		id: 1232018,
		date: '1/23/2018',
		day: 'Sat',
		users: [{
				name: 'mbartrum',
				id: 'mbartrum'
			},
			{
				name: 'mdehart',
				id: 'mdehart'
			}]
	},
	{
		id: 1242018,
		date: '1/24/2018',
		day: 'Sun',
		users: [{
				name: 'dwhite',
				id: 'dwhite'
			},
			{
				name: 'jdever',
				id: 'jdever'
			}]
	}];
		return(
			<div className="container">
				<ModalStruct />
				<div className="row">
					<TopNav user={this.props.user} />
				</div>
				<div className="row">
					<ErrorAlert />
				</div>
				<div className="row">
					<div className="col-lg-2 col-md-2">
						<SideNav />
					</div>
					<div className="col-lg-10 col-md-10">
						<MainTable dates={testVals} />
					</div>
				</div>
				
			</div>
			);
	}
}

AppContainer.propTypes = {
	title: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired
};

export default AppContainer;