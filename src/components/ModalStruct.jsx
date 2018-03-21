import React from 'react';
import PropTypes from 'prop-types';

// Bootstrap imports
import { 
			Popover, 
			Modal,
			Tooltip,
			OverlayTrigger,
			Button
		} from 'react-bootstrap';


class ModalStruct extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false
		};
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow(){
		this.setState({ show:true });
	}

	render() {
		const popover = (
			<Popover id="modal-popover" title="popover">
				Testing 1 2 3
			</Popover>
		);

		const tooltip = <Tooltip id="modal-tooltip">Cool</Tooltip>

		return(
			<div>
				<Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
					Launch Modal
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal Heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Text in a modal</h4>
			            <p>
			              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
			            </p>

			            <h4>Popover in a modal</h4>
			            <p>
			              there is a{' '}
			              <OverlayTrigger overlay={popover}>
			                <a href="#popover">popover</a>
			              </OverlayTrigger>{' '}
			              here
			            </p>

			            <h4>Tooltips in a modal</h4>
			            <p>
			              there is a{' '}
			              <OverlayTrigger overlay={tooltip}>
			                <a href="#tooltip">tooltip</a>
			              </OverlayTrigger>{' '}
			              here
			            </p>
			            
			            <hr />

			            <h4>Additional Text here</h4>
			            <p>
            				Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
			              	dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
			              	ac consectetur ac, vestibulum at eros.
			            </p>
			            <p>
            				Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
			              	dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
			              	ac consectetur ac, vestibulum at eros.
			            </p>
			            <p>
            				Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              				cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              				dui. Donec ullamcorper nulla non metus auctor fringilla.
			            </p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default ModalStruct;