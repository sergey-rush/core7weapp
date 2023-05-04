import React, { Component } from 'react';
import { Container, Label, Row, Col, Spinner, Badge, Table, Button } from "reactstrap";
import Loader from './Layout/Loader';
import { ToastContainer, toast, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from "./Breadcrumbs";
import ConfirmForm from "./ConfirmForm";
import EditOptionForm from "./EditOptionForm";
import OptionService from "../services/OptionService";

export class OptionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            option: null,
            confirm: null,
            editOptionFormVisible: false,
            confirmFormVisible: false
        };
    }

    componentDidMount() {
        document.title = "Список опций";
        this.loadData();
    }

    loadData() {
        OptionService.getOptionList()
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
        var option = { id: 0, title: "Новая опция" };
        this.setState({
            editOptionFormVisible: true,
            option: option
        });
    };

    showEditForm = (option) => {
        this.setState({
            editOptionFormVisible: true,
            option: option
        });
    };

    showConfirmForm = (item) => {
        const info = "Вы действительно желаете удалить опцию " + item.title + "?";
        const confirm = { id: item.id, title: item.title, header: "Удаление опции", info: info, warn: "Восстановление невозможно, операция необратима. Чтобы продолжить подтвердите действие" };
        this.setState({ confirmFormVisible: true, confirm: confirm });
    }

    handleConfirm = (confirm) => {
        this.setState({ confirmFormVisible: false, loading: true });
        OptionService.deleteOption(confirm.id)
            .then((response) => {
                this.loadData();
                this.showToastMessage(confirm.title + " успешно удален");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleCancel = () => {
        this.setState({ editOptionFormVisible: false, confirmFormVisible: false });
    };

    editCompleted = (option) => {
        this.setState({
            editOptionFormVisible: false
        });
        this.loadData();
        this.showToastMessage(option.title + " успешно изменен");
    }

    addCompleted = (option) => {
        this.setState({
            editOptionFormVisible: false
        });
        this.loadData();
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
        return (
            <Container fluid>

                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumbs pages={[{ title: 'Опции', url: 'option-list' }]} />
                    </div>
                    <h4 className="page-title">Список опций
                        <Button className="btn btn-success btn-sm ms-3" onClick={() => this.showAddForm()}>
                            Добавить
                        </Button>
                    </h4>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <td>Наименование</td>
                            <td>Изменить</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((item, index) => {
                            return (
                                <tr key={index}>

                                    <td>{item.title}</td>

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

                {this.state.editOptionFormVisible && (
                    <EditOptionForm
                        visible={this.state.editOptionFormVisible}
                        option={this.state.option}
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