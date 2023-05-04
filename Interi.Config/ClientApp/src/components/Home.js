import React, { Component } from 'react';
import Chart from "react-apexcharts";



export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      averageSales:{
        chart: { height: 203, type: "donut" },
        legend: { show: !1 },
        stroke: { colors: ["transparent"] },
        series: [44, 55, 41, 17],
        labels: ["Прямые", "Партнеров", "Общие", "Косвенные"],
        colors: ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"],
        responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: "bottom" } } }],
    },


      revenueOptions: {
        chart: { height: 364, type: "line", dropShadow: { enabled: !0, opacity: 0.2, blur: 7, left: -7, top: 7 } },
        dataLabels: { enabled: !1 },
        stroke: { curve: "smooth", width: 4 },
        series: [
          { name: "Текущая неделя", data: [10, 20, 15, 25, 20, 30, 20] },
          { name: "Предыдущая неделя", data: [0, 15, 10, 30, 15, 35, 25] },
        ],
        colors: ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"],
        zoom: { enabled: !1 },
        legend: { show: !1 },
        xaxis: { type: "string", categories: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], tooltip: { enabled: !1 }, axisBorder: { show: !1 } },
        yaxis: {
          labels: {
            formatter: function (e) {
              return e + "k";
            },
            offsetX: -15,
          },

        }
      },
      highPerformingProduct: {
        chart: { height: 257, type: "bar", stacked: !0 },
        plotOptions: { bar: { horizontal: !1, columnWidth: "20%" } },
        dataLabels: { enabled: !1 },
        stroke: { show: !0, width: 2, colors: ["transparent"] },
        series: [
          { name: "Реальные", data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81] },
          { name: "Ожидаемые", data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59] },
        ],
        zoom: { enabled: !1 },
        legend: { show: !1 },
        colors: ["#727cf5", "#e3eaef"],
        xaxis: { categories: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"], axisBorder: { show: !1 } },
        yaxis: {
          labels: {
            formatter: function (e) {
              return e + "k";
            },
            offsetX: -15,
          },
        },
        fill: { opacity: 1 },
        tooltip: {
          y: {
            formatter: function (e) {
              return "₽" + e + "k";
            },
          },
        },
      }
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <form className="d-flex">
                  <div className="input-group">
                    <input type="text" className="form-control form-control-light" id="dash-daterange" />
                    <span className="input-group-text bg-primary border-primary text-white">
                      <i className="mdi mdi-calendar-range font-13"></i>
                    </span>
                  </div>
                  <a href="#" className="btn btn-primary ms-2">
                    <i className="mdi mdi-autorenew"></i>
                  </a>
                  <a href="#" className="btn btn-primary ms-1">
                    <i className="mdi mdi-filter-variant"></i>
                  </a>
                </form>
              </div>
              <h4 className="page-title">Рабочий стол</h4>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-xl-5 col-lg-6">

            <div className="row">
              <div className="col-sm-6">
                <div className="card widget-flat">
                  <div className="card-body">
                    <div className="float-end">
                      <i className="mdi mdi-account-multiple widget-icon"></i>
                    </div>
                    <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Клиенты</h5>
                    <h3 className="m-3">36,254</h3>
                    <p className="mb-0 text-muted">
                      <span className="text-success me-2"><i className="mdi mdi-arrow-up-bold"></i> 5.27%</span>
                      <span className="text-nowrap">С начала месяца</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="card widget-flat">
                  <div className="card-body">
                    <div className="float-end">
                      <i className="mdi mdi-cart-plus widget-icon"></i>
                    </div>
                    <h5 className="text-muted fw-normal mt-0" title="Number of Orders">Заказы</h5>
                    <h3 className="m-3">5,543</h3>
                    <p className="mb-0 text-muted">
                      <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 1.08%</span>
                      <span className="text-nowrap">С начала месяца</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="card widget-flat">
                  <div className="card-body">
                    <div className="float-end">
                      <i className="mdi mdi-currency-usd widget-icon"></i>
                    </div>
                    <h5 className="text-muted fw-normal mt-0" title="Average Revenue">Прибыль</h5>
                    <h3 className="m-3">₽6,254</h3>
                    <p className="mb-0 text-muted">
                      <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 7.00%</span>
                      <span className="text-nowrap">С начала месяца</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="card widget-flat">
                  <div className="card-body">
                    <div className="float-end">
                      <i className="mdi mdi-pulse widget-icon"></i>
                    </div>
                    <h5 className="text-muted fw-normal mt-0" title="Growth">Рост</h5>
                    <h3 className="m-3">+ 30.56%</h3>
                    <p className="mb-0 text-muted">
                      <span className="text-success me-2"><i className="mdi mdi-arrow-up-bold"></i> 4.87%</span>
                      <span className="text-nowrap">С начала месяца</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="col-xl-7 col-lg-6">
            <div className="card card-h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="header-title">Прогноз & Рельность</h4>
                  <div className="dropdown">
                    <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="mdi mdi-dots-vertical"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">

                      <a href="#" className="dropdown-item">Sales Report</a>

                      <a href="#" className="dropdown-item">Export Report</a>

                      <a href="#" className="dropdown-item">Profit</a>

                      <a href="#" className="dropdown-item">Action</a>
                    </div>
                  </div>
                </div>

                <div dir="ltr">                  
                  <Chart options={this.state.highPerformingProduct} series={this.state.highPerformingProduct.series} type="bar" height="257" className="apex-charts" />
                </div>

              </div>
            </div>

          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="header-title">Выручка</h4>
                  <div className="dropdown">
                    <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="mdi mdi-dots-vertical"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">

                      <a href="#" className="dropdown-item">Sales Report</a>

                      <a href="#" className="dropdown-item">Export Report</a>

                      <a href="#" className="dropdown-item">Profit</a>

                      <a href="#" className="dropdown-item">Action</a>
                    </div>
                  </div>
                </div>

                <div className="chart-content-bg">
                  <div className="row text-center">
                    <div className="col-sm-6">
                      <p className="text-muted mb-0 mt-3">Текущая неделя</p>
                      <h2 className="fw-normal mb-3">
                        <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"></small>
                        <span>₽58,254</span>
                      </h2>
                    </div>
                    <div className="col-sm-6">
                      <p className="text-muted mb-0 mt-3">Предыдущая неделя</p>
                      <h2 className="fw-normal mb-3">
                        <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1"></small>
                        <span>₽69,524</span>
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="dash-item-overlay d-none d-md-block" dir="ltr">
                  <h5>Доход за сегодня: ₽2,562.30</h5>
                  <p className="text-muted font-13 mb-3 mt-2">
                    Будьте в курсе последних событий
                  </p>
                  <a href="#" className="btn btn-outline-primary">
                    Новости
                    <i className="mdi mdi-arrow-right ms-2"></i>
                  </a>
                </div>
                <div dir="ltr">
                  <Chart options={this.state.revenueOptions} series={this.state.revenueOptions.series} type="line" height="364" className="apex-charts mt-3" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="header-title">Убытки</h4>
                  <div className="dropdown">
                    <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="mdi mdi-dots-vertical"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">

                      <a href="#" className="dropdown-item">Sales Report</a>

                      <a href="#" className="dropdown-item">Export Report</a>

                      <a href="#" className="dropdown-item">Profit</a>

                      <a href="#" className="dropdown-item">Action</a>
                    </div>
                  </div>
                </div>
                <div className="mb-4 mt-3">

                </div>

                
<Chart options={this.state.averageSales} series={this.state.averageSales.series} type="donut" height="203" />

                <div className="chart-widget-list">
                  <p>
                    <i className="mdi mdi-square text-primary"></i> Прямые
                    <span className="float-end">₽300.56</span>
                  </p>
                  <p>
                    <i className="mdi mdi-square text-danger"></i> Партнеров
                    <span className="float-end">₽135.18</span>
                  </p>
                  <p>
                    <i className="mdi mdi-square text-success"></i> Общие
                    <span className="float-end">₽48.96</span>
                  </p>
                  <p className="mb-0">
                    <i className="mdi mdi-square text-warning"></i> Косвенные
                    <span className="float-end">₽154.02</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>
    );
  }
}
