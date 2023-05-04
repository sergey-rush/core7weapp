import React, { Component } from 'react';
import { Input, Spinner, Row, Col, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Form, FormGroup, FormText } from "reactstrap";
import ProductService from "../services/ProductService";

export default class EditProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            product: { id: 0, title: "Новый продукт" },
            disableSave: true,
            errors: [],
        };
    }

    componentDidMount() {
        
        this.setState({
            product: this.props.product
        });
    }

    hideModal = (event) => {
        this.props.handleCancel({ product: this.props.product });
    };

    handleSubmit = ev => {
        this.setState({
            loading: true,
        });
        var product = this.state.product;

        if (product.id > 0) {
            ProductService.putProduct(product)
                .then((response) => {
                    this.setState({
                        loading: false,
                    });
                    this.props.editCompleted(product);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            ProductService.postProduct(product)
                .then((response) => {
                    this.setState({
                        loading: false,
                    });
                    this.props.addCompleted(product);
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

        var product = this.state.product;

        switch (name) {
            case "title":
                product.title = value;
                break;
        }

        this.setState({
            product: product,
            disableSave: false
        });

    };

    render() {
        return (
            <Modal isOpen={this.props.visible} className="modal-dialog modal-sm">
                <ModalHeader>{this.state.product.title}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Название продукта</Label>
                            <Input
                                value={this.state.product.title}
                                onChange={this.onChange}
                                type="text"
                                label="title"
                                name="title"
                                placeholder="Название продукта" />
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