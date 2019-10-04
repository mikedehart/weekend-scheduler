import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';

import * as api from '../../api';

import UserStruct from './UserStruct';

/*******************************
	Table Cell
	=====================
	- User cells for each table
	- Displays open for open dates, or username for
	selected dates.
	- Triggers an overlay for admins allowing to delete
		or change an individual user

********************************/

class TableCell extends React.Component {
	constructor(props) {
		super(props);

		this.showUserModal = this.showUserModal.bind(this);
		this.hideUserModal = this.hideUserModal.bind(this);

		this.state = {
			show_modal: false,
			new_users: []
		};
	}

	showUserModal() {
		// As separate function, gets called EVERY time a cell is rendered.
		// Now just get usernames when modal is loaded.
		api.getAllUsernames()
			.then((usrs) => {
				const arr = Object.keys(usrs).map(x => usrs[x].username);
				this.setState({
					new_users: arr,
					show_modal: true
				});
			})
			.catch(err => console.error(err));
	}

	hideUserModal() {
		this.setState({ show_modal: false });
	}

	componentDidMount() {
	}


	render() {
		const popover = (
		<Popover id="popover-positioned-bottom" title="User Actions">
				<div>
					<Button className="hello" bsStyle="primary" bsSize="small" onClick={() => this.props.removeUser(this.props.name, this.props.dateID)}>
						Delete User
					</Button>
					<Button bsStyle="primary" bsSize="small" onClick={() => this.showUserModal()}>
						Change User
					</Button>
					<UserStruct 
						show={this.state.show_modal}
						current_user={this.props.name}
						handleClose={this.hideUserModal}
						new_users={this.state.new_users}
						changeUser={this.props.changeUser}
						dateID={this.props.dateID}
					/>
				</div>
			</Popover>
		);


		if (this.props.className === 'occupied_cell') {
			if(this.props.designation === 'TSM') {
				return (
					<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
						<td className={this.props.className}>{this.props.name}</td>
					</OverlayTrigger>);
			} else {
				return <td className={this.props.className}>{this.props.name}</td>
			}
		} else {
			return <td className={this.props.className} onClick={() => this.props.selectDate(this.props.dateID)}></td>
		}
	}


}


TableCell.propTypes = {
	name: PropTypes.string,
	dateID: PropTypes.string.isRequired,
	selectDate: PropTypes.func,
	className: PropTypes.string.isRequired,
	designation: PropTypes.string,
	// Admin functions
	removeUser: PropTypes.func,
	changeUser: PropTypes.func
}

export default TableCell;