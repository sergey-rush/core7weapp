import React, { Component } from 'react';
import { Input, Spinner, Row, Col, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, FormGroup, Form } from "reactstrap";
import OptionService from "../services/OptionService";
import ProductOptionService from "../services/ProductOptionService";

export default class EditProductOptionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            product: { id: 0, title: "" },
            disableSave: true,
            options: [],
            error: "",
            productOption: { id: 0, title: "", productId: 0, optionId: 0, required: 0 },
            isOpen: false
        };
    }

    componentDidMount() {
        this.setState({
            product: this.props.product,
            productOption: this.props.productOption
        });

        

        this.loadData()
    }

    loadData() {
        OptionService.getOptionList()
            .then((response) => {

                if (this.state.productOption.id == 0) {
                    var option = { id: 0, title: "Выберите опцию" };
                    response.data.push(option);
                }

                this.setState({
                    loading: false,
                    options: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    hideModal = (event) => {
        this.props.handleCancel({ product: this.props.product });
    };

    handleSubmit = ev => {
        this.setState({
            loading: true,
        });

        var productOption = this.state.productOption;
        if (productOption.id > 0) {
            ProductOptionService.putProductOption(productOption)
                .then((response) => {
                    this.setState({
                        loading: false,
                    });
                    this.props.editCompleted(productOption);
                })
                .catch((error) => {
                    this.setState({
                        loading: false,
                        error: error.response.data,
                        disableSave: true,
                    });
                });
        }
        else {
            ProductOptionService.postProductOption(productOption)
                .then((response) => {
                    this.setState({
                        loading: false,
                    });
                    this.props.addCompleted(productOption);
                })
                .catch((error) => {
                    this.setState({
                        loading: false,
                        error: error.response.data,
                        disableSave: true,
                    });
                });
        }
    }

    onChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        var productOption = this.state.productOption;
        if (target.options) {
            productOption.title = target.options[target.selectedIndex].text;
        }
        
        let disableSave = true;

        switch (name) {
            case "optionId":
                productOption.optionId = value;
                disableSave = value == "0";
                break;
            case "required":
                productOption.required = value == true ? 1 : 0;
                disableSave = productOption.optionId == 0;
                break;
        }

        this.setState({
            isOpen:true
        });

        this.setState({
            productOption: productOption,
            disableSave: disableSave,
            error: ""
        });

    };

    render() {
        return (
            <Modal isOpen={this.props.visible} className="modal-dialog modal-md">
                <ModalHeader>{this.props.product.title}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Добавить опцию</Label>
                            <Input name="optionId" type="select" value={this.state.productOption.optionId} onChange={this.onChange}>
                                {this.state.options.map((item, index) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <div isOpen={this.state.isOpen}>
                            <p>My controls</p>
                        </div>
                        <FormGroup switch>
                            <Input
                                name="required"
                                type="switch"
                                checked={this.state.productOption.required == 1 ? true : false}
                                onChange={this.onChange} />
                            <Label check>{this.state.productOption.required == 1 ? 'Обязательно' : 'Необязательно'}</Label>
                        </FormGroup>
                    </Form>
                    <br />
                    <Alert isOpen={this.state.error.length > 0} color="danger">
                        {this.state.error}
                    </Alert>

                </ModalBody>
                <ModalFooter>
                    {this.state.loading && <Spinner color="primary" />}
                    <Button
                        color="primary"
                        disabled={this.state.disableSave}
                        onClick={this.handleSubmit}>
                        Добавить
                    </Button>{" "}
                    <Button color="secondary" onClick={this.hideModal}>
                        Отмена
                    </Button>
                </ModalFooter>
            </Modal>


        );
    }
}