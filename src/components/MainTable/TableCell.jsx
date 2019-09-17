import React from 'react';
import PropTypes from 'prop-types';
import '../../scss/main.scss';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';

import * as api from '../../api';

import UserStruct from '../UserStruct';


class TableCell extends React.Component {
	constructor(props) {
		super(props);

		this.showUserModal = this.showUserModal.bind(this);
		this.hideUserModal = this.hideUserModal.bind(this);
		this.getUsernames = this.getUsernames.bind(this);

		this.state = {
			show_modal: false,
			new_users: []
		};
	}

	showUserModal() {
		this.setState({ show_modal: true });
	}

	hideUserModal() {
		this.setState({ show_modal: false });
	}

	//TODO: Filter by product?
	getUsernames() {
		api.getAllUsernames()
			.then((usrs) => {
				const arr = Object.keys(usrs).map(x => usrs[x].username);
				this.setState({
					new_users: arr
				});
			})
			.catch(err => console.error(err));
	};


	componentWillMount() {}

	componentDidMount() {
		this.getUsernames();
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

// 	return (props.className === 'occupied_cell' ?
// 		<td className={props.className}>{props.name}</td>
// 		:
// 		<td className={props.className} onClick={() => props.selectDate(props.dateID)}></td>
// 		);
// };


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