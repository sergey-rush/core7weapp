import React, { Component } from 'react';
import { Badge, Spinner, Row, Col, Label, Button, Input, Alert, Form, FormGroup, FormText } from "reactstrap";
import Pagination from "./Pagination";
import Moment from 'moment';
import OrderService from "../services/OrderService";
import EditOrderForm from "./EditOrderForm";


const orderStates = {
  1: "Создана",
  2: "В работе",
  3: "Оценка",
  4: "Расчет",
  5: "Договор",
  6: "Оплата"
};


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orders: [],
      order: null,
      orderState: 0,
      countOrders: 0,
      confirm: null,
      editOrderFormVisible: false,
      confirmFormVisible: false,
      itemOffset:0
    };
  }

  componentDidMount() {
    document.title = "Список запросов";
    this.loadOrderList(0, 10);
    this.countOrders();
  }

  loadOrderList(index, size) {
    OrderService.getOrderList(index, size)
      .then((response) => {
        this.setState({
          loading: false,
          orders: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  countOrders() {
    OrderService.countOrders()
      .then((response) => {
        this.setState({
          countOrders: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showAddForm = () => {
    var order = { id: 0, orderId:"0", title: "Новый запрос", productId:0, optionId:0};
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
    const info = "Вы действительно желаете удалить запрос " + item.title + "?";
    const confirm = { id: item.id, title: item.title, header: "Удаление запроса", info: info, warn: "Восстановление невозможно, операция необратима. Чтобы продолжить подтвердите действие" };
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

  getOrderStatus = (orderState) => {
    switch (orderState) {
      case 1:
        return <Badge color="primary">Создана</Badge>
      case 2:
        return <Badge color="success">В работе</Badge>
      case 3:
        return <Badge color="danger">Оценка</Badge>
      case 4:
        return <Badge color="warning">Расчет</Badge>
      case 5:
        return <Badge color="info">Договор</Badge>
      case 6:
        return <Badge color="dark">Оплата</Badge>
    }
  };

  getPaidStatus = (paidState) => {
    switch (paidState) {
      case 1:
        return <Badge color="primary">К оплате</Badge>
      case 2:
        return <Badge color="success">Оплачено</Badge>
    }
  };

  handlePageChange=(index)=>{
    this.loadOrderList(index, 10);
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">

              </div>
              <h4 className="page-title">Запросы</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-xl-8">
                    <form className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                      <div className="col-auto">
                        <label htmlFor="inputSearch" className="visually-hidden">Поиск</label>
                        <input type="search" className="form-control" id="inputSearch" placeholder="Найти..." />
                      </div>
                      <div className="col-auto">
                        <div className="d-flex align-items-center">
                          <Input
                            name="orderState"
                            type="select"
                            defaultValue={this.state.orderState}
                            onChange={this.onChange}>
                            {Object.keys(orderStates).map((item, index) => <option value={orderStates[item]} key={index}>{orderStates[item]}</option>)}
                          </Input>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-xl-4">
                    <div className="text-xl-end mt-xl-0 mt-2">
                      <Button className="btn btn-danger mb-2 me-2" onClick={() => this.showAddForm()}>
                      <i className="mdi mdi-reorder-horizontal me-1"></i> Новый запрос
                      </Button>                     
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-centered table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>id</th>
                        <th>#</th>
                        <th>Продукт</th>
                        <th>Опции</th>
                        <th>Статус</th>
                        <th>Оплата</th>
                        <th>Создано</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.orders.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td><a href={"/order-item/" + item.orderId}>{item.orderId}</a></td>
                            <td>{item.title}</td>
                            <td>{item.info}</td>
                            <td>{this.getOrderStatus(item.orderState)}</td>
                            <td>{this.getPaidStatus(item.paidState)}</td>
                            <td title={item.created}>{Moment(item.created).format('D MMM HH:mm')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination countItems={this.state.countOrders} handlePageChange={this.handlePageChange} />
              </div>
            </div>
          </div>
        </div>
        {this.state.editOrderFormVisible && (
          <EditOrderForm
            visible={this.state.editOrderFormVisible}
            order={this.state.order}
            handleCancel={this.handleCancel}
            editCompleted={this.editCompleted}
            addCompleted={this.addCompleted}
          />
        )}
      </div>
    );
  }
}