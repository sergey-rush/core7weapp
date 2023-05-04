import React, { Component } from 'react';
import { Container, Label, Row, Col, Spinner, Badge, Table, Button } from "reactstrap";
import Loader from './Layout/Loader';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from "./Breadcrumbs";
import ConfirmForm from "./ConfirmForm";
import Chat from './Chat/Chat';
import OrderService from "../services/OrderService";

export class OrderItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            order: null,
            confirm: null,
            editOrderFormVisible: false,
            confirmFormVisible: false
        };
    }

    componentDidMount() {
        var orderId = this.props.match.params.id;
        this.loadData(orderId);
    }

    loadData(orderId) {
        OrderService.getOrderItem(orderId)
            .then((response) => {
                document.title = response.data.title;
                this.setState({
                    loading: false,
                    order: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
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

                    </div>
                    <h4 className="page-title">{this.state.order.title}</h4>
                </div>




                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 col-sm-11">

                        <div className="horizontal-steps mt-4 mb-4 pb-5" id="tooltip-container">
                            <div className="horizontal-steps-content">
                                <div className="step-item">
                                    <span data-bs-container="#tooltip-container" data-bs-toggle="tooltip" data-bs-placement="bottom" title="20/08/2018 07:24 PM">Order Placed</span>
                                </div>
                                <div className="step-item current">
                                    <span data-bs-container="#tooltip-container" data-bs-toggle="tooltip" data-bs-placement="bottom" title="21/08/2018 11:32 AM">Packed</span>
                                </div>
                                <div className="step-item">
                                    <span>Shipped</span>
                                </div>
                                <div className="step-item">
                                    <span>Delivered</span>
                                </div>
                            </div>

                            <div className="process-line" style={{ width: 33 + "%" }}></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <Chat />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title mb-3">Items from Order #12537</h4>

                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>The Military Duffle Bag</td>
                                                <td>3</td>
                                                <td>$128</td>
                                                <td>$384</td>
                                            </tr>
                                            <tr>
                                                <td>Mountain Basket Ball</td>
                                                <td>1</td>
                                                <td>$199</td>
                                                <td>$199</td>
                                            </tr>
                                            <tr>
                                                <td>Wavex Canvas Messenger Bag</td>
                                                <td>5</td>
                                                <td>$180</td>
                                                <td>$900</td>
                                            </tr>
                                            <tr>
                                                <td>The Utility Shirt</td>
                                                <td>2</td>
                                                <td>$79</td>
                                                <td>$158</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title mb-3">Order Summary</h4>

                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Description</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Grand Total :</td>
                                                <td>$1641</td>
                                            </tr>
                                            <tr>
                                                <td>Shipping Charge :</td>
                                                <td>$23</td>
                                            </tr>
                                            <tr>
                                                <td>Estimated Tax : </td>
                                                <td>$19.22</td>
                                            </tr>
                                            <tr>
                                                <th>Total :</th>
                                                <th>$1683.22</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title mb-3">Shipping Information</h4>
                                <h5>Stanley Jones</h5>
                                <div className="mb-0 font-14 address-lg">
                                    795 Folsom Ave, Suite 600<br />
                                    San Francisco, CA 94107<br />
                                    <abbr title="Phone">P:</abbr> (123) 456-7890 <br />
                                    <abbr title="Mobile">M:</abbr> (+01) 12345 67890
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title mb-3">Billing Information</h4>
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <p className="mb-2"><span className="fw-bold me-2">Payment Type:</span> Credit Card</p>
                                        <p className="mb-2"><span className="fw-bold me-2">Provider:</span> Visa ending in 2851</p>
                                        <p className="mb-2"><span className="fw-bold me-2">Valid Date:</span> 02/2020</p>
                                        <p className="mb-0"><span className="fw-bold me-2">CVV:</span> xxx</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title mb-3">Delivery Info</h4>
                                <div className="text-center">
                                    <i className="mdi mdi-truck-fast h2 text-muted"></i>
                                    <h5><b>UPS Delivery</b></h5>
                                    <p className="mb-1"><b>Order ID :</b> xxxx235</p>
                                    <p className="mb-0"><b>Payment Mode :</b> COD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <ToastContainer hideProgressBar={true} transition={Slide} />
            </Container>
        );
    }
}