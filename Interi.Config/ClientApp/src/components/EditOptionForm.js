import React, { Component } from 'react';
import { Input, Spinner, Row, Col, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Form, FormGroup, FormText } from "reactstrap";
import OptionService from "../services/OptionService";

export default class EditOptionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            option: { id: 0, title: "Новая опция" },
            disableSave: true,
            errors: [],
        };
    }

    componentDidMount() {        
        this.setState({
            option: this.props.option
        });
    }

    hideModal = (event) => {
        this.props.handleCancel({ option: this.props.option });
    };

    handleSubmit = ev => {
        this.setState({
            loading: true,
        });
        var option = this.state.option;

        if (option.id > 0) {
            OptionService.putOption(option)
                .then((response) => {
                    this.setState({
                        loading: false,
                    });
                    this.props.editCompleted(option);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            OptionService.postOption(option)
                .then((response) => {
                    this.setState({
                        loading: false,
                    });
                    this.props.addCompleted(option);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    onChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var option = this.state.option;

        switch (name) {
            case "title":
                option.title = value;
                break;
        }

        this.setState({
            option: option,
            disableSave: false
        });

    };

    render() {
        return (
            <Modal isOpen={this.props.visible} className="modal-dialog modal-sm">
                <ModalHeader>{this.state.option.title}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Название опции</Label>
                            <Input
                                value={this.state.option.title}
                                onChange={this.onChange}
                                type="text"
                                label="title"
                                name="title"
                                placeholder="Название опции" />
                            <FormText>
                                Не более 64 символов
                            </FormText>
                        </FormGroup>
                    </Form>

                    <Alert isOpen={this.state.errors.length > 0} color="danger">
                        <ul>
                            {this.state.errors.map((item, index) => {
                                return (
                                    <li key={item.code}>{item.description}</li>
                                );
                            })}
                        </ul>
                    </Alert>

                </ModalBody>
                <ModalFooter>
                    {this.state.loading && <Spinner color="primary" />}
                    <Button
                        color="primary"
                        disabled={this.state.disableSave}
                        onClick={this.handleSubmit}>
                        Сохранить
                    </Button>{" "}
                    <Button color="secondary" onClick={this.hideModal}>
                        Отмена
                    </Button>
                </ModalFooter>
            </Modal>


        );
    }
}