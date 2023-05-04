import React, { Component } from 'react';
import ContextService from "../../services/ContextService";
import $ from 'jquery';
import './Topbar.css';

export class Topbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile: {isAuth:true, image:"zeMWc6aw4jk.jpg", userName:"Владимир", title:"Менеджер"},
      joinModalVisible: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
    ContextService.register("Topbar", this);
  }

  showAlert(message) {
    //console.log("showAlert: " + message);
    
  }
  
  showJoinModal = () => {
    this.setState({ joinModalVisible: true });    
  };

  hideJoinModal = () => {
    this.setState({ joinModalVisible: false });
};

  btnMenuMobile = (event) => {
    event.preventDefault();
    $("body").toggleClass("sidebar-enable");

    var width = $(window).width();

    if (width < 768) {
      console.log("Switched to mobile view");
    }
    else {
      var mode = $('body').attr("data-leftbar-compact-mode");

      if (mode === "condensed") {
        $('body').attr("data-leftbar-compact-mode", "scrollable");
      } else {
        $('body').attr("data-leftbar-compact-mode", "condensed");
      }
    }
  }

  render() {
    //console.log(JSON.stringify(this.state.profile))

    if (this.state.loading) {
      return <div className="navbar-custom"><div className="spinner-button text-primary" role="status"></div></div>;
    }

    return (
      <div>
        <div className="navbar-custom">
          <ul className="list-unstyled topbar-menu float-end mb-0">
            <li className="dropdown notification-list d-lg-none">
              <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <i className="dripicons-search noti-icon"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                <form className="p-3">
                  <input type="text" className="form-control" placeholder="Search..." aria-label="Search" />
                </form>
              </div>
            </li>

            {
              this.state.profile.isAuth ?
                (
                  <>
                    <li className="dropdown notification-list">
                      <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <i className="dripicons-bell noti-icon"></i>
                        <span className="noti-icon-badge"></span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg">


                        <div className="dropdown-item noti-title px-3">
                          <h5 className="m-0">
                            <span className="float-end">
                              <a href="#" className="text-dark">
                                <small>Clear All</small>
                              </a>
                            </span>Notification
                          </h5>
                        </div>

                        <div className="px-3 div-data-simplebar" data-simplebar>

                          <h5 className="text-muted font-13 fw-normal mt-0">Today</h5>

                          <a href="#" className="dropdown-item p-0 notify-item card unread-noti shadow-none mb-2">
                            <div className="card-body">
                              <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="notify-icon bg-primary">
                                    <i className="mdi mdi-comment-account-outline"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 text-truncate ms-2">
                                  <h5 className="noti-item-title fw-semibold font-14">Datacorp <small className="fw-normal text-muted ms-1">1 min ago</small></h5>
                                  <small className="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                                </div>
                              </div>
                            </div>
                          </a>


                          <a href="#" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                            <div className="card-body">
                              <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="notify-icon bg-info">
                                    <i className="mdi mdi-account-plus"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 text-truncate ms-2">
                                  <h5 className="noti-item-title fw-semibold font-14">Admin <small className="fw-normal text-muted ms-1">1 hours ago</small></h5>
                                  <small className="noti-item-subtitle text-muted">New user registered</small>
                                </div>
                              </div>
                            </div>
                          </a>

                          <h5 className="text-muted font-13 fw-normal mt-0">Yesterday</h5>


                          <a href="#" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                            <div className="card-body">
                              <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="notify-icon">
                                    <img src="assets/images/users/avatar-2.jpg" className="img-fluid rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="flex-grow-1 text-truncate ms-2">
                                  <h5 className="noti-item-title fw-semibold font-14">Cristina Pride <small className="fw-normal text-muted ms-1">1 day ago</small></h5>
                                  <small className="noti-item-subtitle text-muted">Hi, How are you? What about our next meeting</small>
                                </div>
                              </div>
                            </div>
                          </a>

                          <h5 className="text-muted font-13 fw-normal mt-0">30 Dec 2021</h5>


                          <a href="#" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                            <div className="card-body">
                              <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="notify-icon bg-primary">
                                    <i className="mdi mdi-comment-account-outline"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 text-truncate ms-2">
                                  <h5 className="noti-item-title fw-semibold font-14">Datacorp</h5>
                                  <small className="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                                </div>
                              </div>
                            </div>
                          </a>


                          <a href="#" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                            <div className="card-body">
                              <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="notify-icon">
                                    <img src="assets/images/users/avatar-4.jpg" className="img-fluid rounded-circle" alt="" />
                                  </div>
                                </div>
                                <div className="flex-grow-1 text-truncate ms-2">
                                  <h5 className="noti-item-title fw-semibold font-14">Karen Robinson</h5>
                                  <small className="noti-item-subtitle text-muted">Wow ! this admin looks good and awesome design</small>
                                </div>
                              </div>
                            </div>
                          </a>

                          <div className="text-center">
                            <i className="mdi mdi-dots-circle mdi-spin text-muted h3 mt-0"></i>
                          </div>
                        </div>


                        <a href="#" className="dropdown-item text-center text-primary notify-item border-top border-light py-2">
                          View All
                        </a>

                      </div>
                    </li>
                    <li className="dropdown notification-list">
                      <a className="nav-link dropdown-toggle nav-user arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                        aria-expanded="false">
                        <span className="account-user-avatar">
                          <img src={"/avatars/" + this.state.profile.image} alt="user-image" className="rounded-circle" />
                        </span>
                        <span>
                          <span className="account-user-name">{this.state.profile.userName}</span>
                          <span className="account-position">{this.state.profile.title}</span>
                        </span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown">

                        <div className=" dropdown-header noti-title">
                          <h6 className="text-overflow m-0">Приветствуем !</h6>
                        </div>


                        <a href="/profile" className="dropdown-item notify-item">
                          <i className="mdi mdi-account-circle me-1"></i>
                          <span>Профиль</span>
                        </a>


                        <a href="#" className="dropdown-item notify-item">
                          <i className="mdi mdi-account-edit me-1"></i>
                          <span>Настройки</span>
                        </a>


                        <a href="/help" className="dropdown-item notify-item" target="_blank">
                          <i className="mdi mdi-lifebuoy me-1"></i>
                          <span>Помощь</span>
                        </a>


                        <a href="#" className="dropdown-item notify-item">
                          <i className="mdi mdi-lock-outline me-1"></i>
                          <span>Lock Screen</span>
                        </a>


                        <a href="/signout" className="dropdown-item notify-item">
                          <i className="mdi mdi-logout me-1"></i>
                          <span>Выйти</span>
                        </a>
                      </div>
                    </li>
                  </>
                )
                :
                (
                  <li className="notification-list">
                    <button type="button" onClick={this.showJoinModal} className="btn btn-outline-primary rounded-pill m-2">
                      <i className="uil uil-user me-1"></i><span><strong>Войти</strong></span>
                    </button>

                  </li>
                )
            }

          </ul>
          <button className="button-menu-mobile open-left">
            <i className="mdi mdi-menu"></i>
          </button>
          <div className="app-search dropdown d-none d-lg-block">
            <form>
              <div className="input-group">
                <input type="text" className="form-control dropdown-toggle" placeholder="Поиск..." id="top-search" />
                <span className="mdi mdi-magnify search-icon"></span>
                <button className="input-group-text btn-primary" type="submit">Поиск</button>
              </div>
            </form>

            <div className="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">

              <div className="dropdown-header noti-title">
                <h5 className="text-overflow mb-2">Найдено <span className="text-danger">17</span> результатов</h5>
              </div>


              <a href="#" className="dropdown-item notify-item">
                <i className="uil-notes font-16 me-1"></i>
                <span>Analytics Report</span>
              </a>


              <a href="#" className="dropdown-item notify-item">
                <i className="uil-life-ring font-16 me-1"></i>
                <span>How can I help you?</span>
              </a>


              <a href="#" className="dropdown-item notify-item">
                <i className="uil-cog font-16 me-1"></i>
                <span>User profile settings</span>
              </a>


              <div className="dropdown-header noti-title">
                <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
              </div>

              <div className="notification-list">

                <a href="#" className="dropdown-item notify-item">
                  <div className="d-flex">
                    <img className="d-flex me-2 rounded-circle" src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image" height="32" />
                    <div className="w-100">
                      <h5 className="m-0 font-14">Erwin Brown</h5>
                      <span className="font-12 mb-0">UI Designer</span>
                    </div>
                  </div>
                </a>


                <a href="#" className="dropdown-item notify-item">
                  <div className="d-flex">
                    <img className="d-flex me-2 rounded-circle" src="assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height="32" />
                    <div className="w-100">
                      <h5 className="m-0 font-14">Jacob Deo</h5>
                      <span className="font-12 mb-0">Developer</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          </div>
      </div>
    );
  }
}
