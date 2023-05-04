import React, { Component } from 'react';
import { Container, Label, Row, Col, Spinner, Badge, Table, Button } from "reactstrap";
import Loader from './Layout/Loader';
import { ToastContainer, toast, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from "./Breadcrumbs";
import ConfirmForm from "./ConfirmForm";
import EditOrderForm from "./EditOrderForm";
import OrderService from "../services/OrderService";

export class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            order: null,
            confirm: null,
            editOrderFormVisible: false,
            confirmFormVisible: false
        };
    }

    componentDidMount() {
        document.title = "Список продуктов";
        this.loadData();
    }

    loadData() {
        OrderService.getOrderList()
            .then((response) => {
                this.setState({
                    loading: false,
                    data: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    showAddForm = () => {
        var order = { id: 0, title: "Новый продукт" };
        this.setState({
            editOrderFormVisible: true,
            order: order
        });
    };

    showEditForm = (order) => {
        this.setState({
            editOrderFormVisible: true,
            order: order
        });
    };

    showConfirmForm = (item) => {
        const info = "Вы действительно желаете удалить продукт " + item.title + "?";
        const confirm = { id: item.id, title: item.title, header: "Удаление продукта", info: info, warn: "Восстановление невозможно, операция необратима. Чтобы продолжить подтвердите действие" };
        this.setState({ confirmFormVisible: true, confirm: confirm });
    }

    handleCancel = () => {
        this.setState({ editOrderFormVisible: false, confirmFormVisible: false });
    };

    handleConfirm = (confirm) => {
        this.setState({ confirmFormVisible: false, loading: true });
        OrderService.deleteOrder(confirm.id)
            .then((response) => {
                this.loadData();
                this.showToastMessage(confirm.title + " успешно удален");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    editCompleted = (order) => {
        this.setState({
            editOrderFormVisible: false
        });
        this.loadData();
        this.showToastMessage(order.title + " успешно изменен");
    }

    addCompleted = (order) => {
        this.setState({
            editOrderFormVisible: false
        });
        this.loadData();
        this.showToastMessage(order.title + " успешно добавлен");
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
        return (
            <Container fluid>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumbs pages={[{title:'Продукты', url:'orders'}]} />
                    </div>
                    <h4 className="page-title">Список продуктов
                        <Button className="btn btn-success btn-sm ms-3" onClick={() => this.showAddForm()}>
                            Добавить
                        </Button>
                    </h4>
                </div>


                <Table striped>
                    <thead>
                        <tr>
                            <td>Наименование</td>
                            <td>Опции</td>
                            <td>Изменить</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((item, index) => {
                            return (
                                <tr key={index}>

                                    <td><a href={"/order-option-list/" + item.id}> {item.title}</a></td>
                                    <td className="table-action">
                                        <a href={"/order-option-list/" + item.id} target="_blank" className="btn-table btn btn-outline-success" title="Изменить опции">
                                            <i className="mdi mdi-playlist-edit"></i>
                                        </a>
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

                {this.state.editOrderFormVisible && (
                    <EditOrderForm
                        visible={this.state.editOrderFormVisible}
                        order={this.state.order}
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