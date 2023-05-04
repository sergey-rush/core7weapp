import React, { Component } from 'react';
import { Input, Spinner, Row, Col, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Form, FormGroup, FormText } from "reactstrap";
import Loader from './Layout/Loader';
import OrderService from "../services/OrderService";
import ProductService from "../services/ProductService";
import OptionService from "../services/OptionService";

export default class EditOrderForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            productType: 0,
            options: [],
            optionType: 0,
            order: { id: 0, orderId:"0", title: "Новый заказ", productId:0, optionId:0 },
            disableSave: true,
            errors: [],
        };
    }

    componentDidMount() {
        this.setState({
            order: this.props.order
        });
        this.loadProducts();
    }

    loadProducts() {
        ProductService.getProductList()
            .then((response) => {
                var item = { id: 0, title: "Выберите продукт" };
                response.data.push(item);
                this.setState({
                    products: response.data.reverse()
                });
                this.loadOptions();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    loadOptions() {
        OptionService.getOptionList()
            .then((response) => {
                var item = { id: 0, title: "Выберите опцию" };
                response.data.push(item);
                this.setState({
                    loading: false,
                    options: response.data.reverse()
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    hideModal = (event) => {
        this.props.handleCancel({ order: this.props.order });
    };

    handleSubmit = (event) => {
        this.setState({
            loading: true,
        });
        var order = this.state.order;

        console.log(JSON.stringify(order));

        OrderService.postOrder(order)
            .then((response) => {
                this.setState({
                    loading: false,
                });
                this.props.addCompleted(order);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        //console.log(value);
        var order = this.state.order;
        switch (name) {
            case "productType":
                order.productId = value;
                if (target.options) {
                    order.title = target.options[target.selectedIndex].text;
                }
                break;
            case "optionType":
                order.optionId = value;
                if (target.options) {
                    order.info = target.options[target.selectedIndex].text;
                }
                break;
        }

        let disableSave = true;

        if (order.productId != 0 & order.optionId != 0) {
            disableSave = false;
        } else {
            disableSave = true;
        }
        //console.log(order.productId + " " + order.optionId + " = " + disableSave);

        this.setState({
            order: order,
            disableSave: disableSave
        });

    };

    render() {
        if (this.state.loading) {
            return <Loader />;
        }
        return (
            <Modal isOpen={this.props.visible} className="modal-dialog modal-md">
                <ModalHeader>{this.state.order.title}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Продукт</Label>
                            <Input
                                name="productType"
                                type="select"
                                defaultValue={this.state.productType}
                                onChange={this.onChange}>
                                {this.state.products.map((item, index) => <option value={item.id} key={item.id}>{item.title}</option>)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Опция</Label>
                            <Input
                                name="optionType"
                                type="select"
                                defaultValue={this.state.optionType}
                                onChange={this.onChange}>
                                {this.state.options.map((item, index) => <option value={item.id} key={item.id}>{item.title}</option>)}
                            </Input>
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