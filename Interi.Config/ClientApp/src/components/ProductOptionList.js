import React, { Component } from 'react';
import { Container, Label, Row, Col, Spinner, Badge, Table, Button } from "reactstrap";
import Loader from './Layout/Loader';
import { ToastContainer, toast, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from "./Breadcrumbs";
import ConfirmForm from "./ConfirmForm";
import EditProductOptionForm from "./EditProductOptionForm";
import ProductOptionService from "../services/ProductOptionService";
import ProductService from "../services/ProductService";

export class ProductOptionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            productOptions: [],
            product: { id: 0, title: "" },
            productOption: { id: 0, title: "" },
            confirm: null,
            confirmFormVisible: false,
            editProductOptionFormVisible: false
        };
    }

    componentDidMount() {
        var productId = this.props.match.params.id;
        this.loadOptions(productId);
    }

    loadOptions(id) {
        ProductOptionService.getProductOptionList(id)
            .then((response) => {
                this.setState({
                    productOptions: response.data
                });
                this.loadProduct(id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    loadProduct(id) {
        ProductService.getProductItem(id)
            .then((response) => {
                this.setState({
                    loading: false,
                    product: response.data
                });

            })
            .catch((error) => {
                console.log(error);
            });
    }

    showAddForm = () => {
        var productOption = { id: 0, productId:this.state.product.id, optionId:0, title: "" };
        this.setState({
            editProductOptionFormVisible: true,
            productOption: productOption
        });
    };

    showEditForm = (productOption) => {
        this.setState({
            editProductOptionFormVisible: true,
            productOption: productOption
        });
    };

    showConfirmForm = (item) => {
        const info = "Вы действительно желаете удалить опцию " + item.title + "?";
        const confirm = { id: item.id, title: item.title, header: "Удаление опции", info: info, warn: "Чтобы продолжить подтвердите действие" };
        this.setState({ confirmFormVisible: true, confirm: confirm });
    }

    handleConfirm = (confirm) => {
        this.setState({ confirmFormVisible: false, loading: true });
        ProductOptionService.deleteProductOption(confirm.id)
            .then((response) => {
                this.loadOptions(this.state.product.id);
                this.showToastMessage(confirm.title + " успешно удален");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleCancel = () => {
        this.setState({ editProductOptionFormVisible: false, confirmFormVisible: false });
    };

    editCompleted = (option) => {
        this.setState({
            editProductOptionFormVisible: false
        });
        this.loadOptions(this.state.product.id);
        this.showToastMessage(option.title + " успешно изменен");
    }

    addCompleted = (option) => {
        this.setState({
            editProductOptionFormVisible: false
        });
        this.loadOptions(this.state.product.id);
        this.showToastMessage(option.title + " успешно добавлен");
    }

    showToastMessage = (text) => { 
        toast.success(text, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    render() {
        if (this.state.loading) {
            return <Loader />;
        }
        document.title = this.state.product.title;
        return (
            <Container fluid>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumbs pages={[{ title: 'Продукты', url: 'product-list' }, { title: 'Опции продукта', url: '#' }]} />

                    </div>
                    <h4 className="page-title">{this.state.product.title}
                        <Button className="btn btn-success btn-sm ms-3" onClick={() => this.showAddForm()}>
                            Добавить
                        </Button>
                    </h4>
                </div>


                <Table striped>
                    <thead>
                        <tr>
                            <td>Наименование</td>
                            <td>Удалить</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.productOptions.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>
                                        {item.required == 1 ?
                                            <Badge color="primary">
                                                Да &nbsp;
                                            </Badge>
                                            :
                                            <Badge color="secondary">
                                                Нет
                                            </Badge>
                                        }
                                    </td>
                                    <td className="table-action">
                                        <Button color="info" className="btn-table" outline onClick={() => this.showEditForm(item)} title="Изменить">
                                            <i className="mdi mdi-pencil"></i>
                                        </Button>
                                        <Button color="danger" className="btn-table" outline onClick={() => this.showConfirmForm(item)} title="Удалить">
                                            <i className="mdi mdi-delete"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                {this.state.editProductOptionFormVisible && (
                    <EditProductOptionForm
                        visible={this.state.editProductOptionFormVisible}
                        product={this.state.product}                   
                        productOption={this.state.productOption}
                        handleCancel={this.handleCancel}
                        editCompleted={this.editCompleted}
                        addCompleted={this.addCompleted}
                    />
                )}
                {this.state.confirmFormVisible && (
                    <ConfirmForm
                        visible={this.state.confirmFormVisible}
                        confirm={this.state.confirm}
                        handleCancel={this.handleCancel}
                        handleConfirm={this.handleConfirm}
                    />
                )}
                <ToastContainer hideProgressBar={true} transition={Slide} />
            </Container>
        );
    }
}