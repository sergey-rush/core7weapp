import React, { Component } from 'react';
import {
    Alert, Spinner, Row, Col, Label, Button, Form, FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";

export default class ConfirmForm extends Component {

    constructor(props) {
        super(props);
    }    

    hideModal = () => {
        this.props.handleCancel();
    };

    handleConfirm = () => {
        this.props.handleConfirm(this.props.confirm);
    }

    render() {
        return (
            <Modal isOpen={this.props.visible} className="modal-dialog modal-md">
                <ModalHeader>{this.props.confirm.header}</ModalHeader>
                <ModalBody>
                    <Alert color="danger">                        
                         <p>{this.props.confirm.info}</p>                         
                    </Alert>
                    <hr/>
                         <p className="mb-0">{this.props.confirm.warn}</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={this.handleConfirm}
                    >Подтверждаю
                    </Button>{" "}
                    <Button color="secondary" onClick={this.hideModal}>
                        Отмена
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}