import React from 'react';
import PropTypes from 'prop-types';

import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';

// Bootstrap imports
import { 
			Popover, 
			Modal,
			Tooltip,
			OverlayTrigger,
			Button,
			FormGroup,
			ControlLabel,
			FormControl,
			HelpBlock
		} from 'react-bootstrap';

import AlertStruct from '../AlertStruct';

import * as api from '../../api';
import * as auth from '../../auth';

function isNumeric(num) {
	return !isNaN(parseFloat(num)) && isFinite(num);
}

class ModalStruct extends React.Component {
	constructor(props) {
		super(props);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateINum = this.validateINum.bind(this);
		this.handleErrorClose = this.handleErrorClose.bind(this);

		this.state = {
			show: this.props.show,
			username: this.props.username,
			inum_val: '',
			error: false,
			msg: '',
			submitted: false,
		};
		this.api = api;
		this.auth = auth;
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow(){
		this.setState({ show:true });
	}

	handleErrorClose = () => {
		this.setState({
			error: false
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		const data = new FormData(evt.target);
		const validate = this.finalValidation(data.get('inumber'), data.get('username'), data.get('product'));
		if(!validate[0]){
			this.setState({
				error: true,
				msg: validate[1]
			});
		} else {
			api.createUser(data.get('inumber'), data.get('username'), data.get('product'))
			.then((data) => {
				this.setState({
					submitted: true,
					error: false,
					msg: `User added!\nID: ${data.inum} Username: ${data.username} Product: ${data.product}`
				});
			})
			.catch((err) => {
				let errorTxt = err.toString().split(':');
				console.log(err.toString());
				this.setState({ 
					error: true,
					submitted: false,
					msg: errorTxt[0] + errorTxt[2],
				});
			});		
		}
	}

	handleChange(evt) {
		this.setState({ inum_val: evt.target.value });
	}

	validateINum(inum) {
		const length = inum.length;
		const firstLetter = inum.slice(0,1);
		const nums = inum.slice(1);

		if(length !== 7) return 'error';
		else if (['I', 'i', 'C', 'c', 'D', 'd'].indexOf(firstLetter) === -1) return 'error';
		else if (!isNumeric(nums)) return 'error'
		else return 'success';
	}

	finalValidation(inumber, username, product) {
		let valid = false;
		let msg = '';
		if(!inumber || this.validateINum(inumber) === 'error') {
			return [valid, 'Invalid I-number entered!'];
		} else if(!username || username.length > 20) {
			return [valid, 'Username blank or too long! Must be < 20 characters'];
		} else if (!product) {
			return [valid, 'Invalid product!'];
		} else {
			valid = true;
			return [valid, 'Confirmed'];
		}
	}

	loginRedirect = () => {
		setTimeout(() => {
			this.props.handleRedirect();
		}, 2000);
	}

	render() {
		let isError = this.state.error;
		let isSuccess = this.state.submitted;

		return(
			<div>
				<Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
					{this.state.username}
				</Button>
				<Modal backdrop="static" show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<ModalHeader authenticated={this.props.authenticated} username={this.props.username} />
					</Modal.Header>
					<Modal.Body>
						{isSuccess ? (
							<AlertStruct 
							status='success' 
							message={"Redirecting in 2 seconds..."}
							header='User Added!' 
							loginRedirect={this.loginRedirect} 
							show={true} />
							) : ""}

						{isError ? (
							<AlertStruct 
							status='danger' 
							message={this.state.msg} 
							header='An Error Occurred!' 
							show={true} 
							handleErrorClose={this.handleErrorClose} />
							) : ""}
						<ModalBody 
							authenticated={this.props.authenticated} 
							username={this.props.username} 
							inum={this.props.inum}
							altDays={this.props.altDays}
							handleSubmit={this.handleSubmit}
							validateINum={this.validateINum}
							inum_value={this.state.inum_val}
							handleChange={this.handleChange}
							updateUserAltDay={this.props.updateUserAltDay}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

ModalStruct.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired,
	inum: PropTypes.string.isRequired,
	handleRedirect: PropTypes.func,
	altDays: PropTypes.array.isRequired,
	updateUserAltDay: PropTypes.func.isRequired
};

export default ModalStruct;

// <Modal.Body>
// 						<h4>Text in a modal</h4>
// 			            <p>
// 			              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
// 			            </p>

// 			            <h4>Popover in a modal</h4>
// 			            <p>
// 			              there is a{' '}
// 			              <OverlayTrigger overlay={popover}>
// 			                <a href="#popover">popover</a>
// 			              </OverlayTrigger>{' '}
// 			              here
// 			            </p>

// 			            <h4>Tooltips in a modal</h4>
// 			            <p>
// 			              there is a{' '}
// 			              <OverlayTrigger overlay={tooltip}>
// 			                <a href="#tooltip">tooltip</a>
// 			              </OverlayTrigger>{' '}
// 			              here
// 			            </p>
			            
// 			            <hr />

// 			            <h4>Additional Text here</h4>
// 			            <p>
//             				Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
// 			              	dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
// 			              	ac consectetur ac, vestibulum at eros.
// 			            </p>
// 			            <p>
//             				Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
// 			              	dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
// 			              	ac consectetur ac, vestibulum at eros.
// 			            </p>
// 			            <p>
//             				Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
//               				cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
//               				dui. Donec ullamcorper nulla non metus auctor fringilla.
// 			            </p>
// 					</Modal.Body>


				// 	<p>
				// 		It looks like your I-Number isn't registered in this application. Please fill out your details below to fully access the site.
				// 	</p>
				// 	<div className="newuser_input">
				// 		<label htmlFor="inumber" className="newuser_lbl">I-Number: </label>
				// 		<input id="inumber" name="inumber" type="text" className="newuser_txt" />
				// 	</div>
				// 	<div className="newuser_input">
				// 		<label htmlFor="username" className="newuser_lbl">Username: </label>
				// 		<input id="username" name="username" type="text" className="newuser_txt" />
				// 	</div>
				// 	<div className="newuser_input">
				// 		<label htmlFor="product" className="newuser_lbl">Product: </label>
				// 		<select id="product" name="product" className="newuser_txt">
				// 			<option value="ase">ASE</option>
				// 			<option value="iq">IQ</option>
				// 			<option value="rep">REP</option>
				// 		</select>
				// 	</div>
				// 	<Button type="submit">Submit</Button>
				// </form>