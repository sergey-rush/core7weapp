import React, { Component } from 'react';
import './Sidebar.css';

export class Sidebar extends Component {
  constructor(props) {
    super(props);
  } 

  render() {
    return (
      <div className="leftside-menu menuitem-active">


        <a href="/" className="logo text-center logo-light">
          <span className="logo-lg">
            <img src="assets/images/logo.png" alt="" height="16" />
          </span>
          <span className="logo-sm">
            <img src="assets/images/logo_sm.png" alt="" height="16" />
          </span>
        </a>


        <a href="/" className="logo text-center logo-dark">
          <span className="logo-lg">
            <img src="assets/images/logo-dark.png" alt="" height="16" />
          </span>
          <span className="logo-sm">
            <img src="assets/images/logo_sm_dark.png" alt="" height="16" />
          </span>
        </a>

        <div className="h-100 show" id="leftside-menu-container" data-simplebar="init">
          <div className="simplebar-wrapper">
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-height-auto-observer"></div>
            </div>
            <div className="simplebar-mask">
              <div className="simplebar-offset">
                <div className="simplebar-content-wrapper" tabIndex="0" role="region" aria-label="scrollable content">
                  <div className="simplebar-content">


                    <ul className="side-nav">

                      <li className="side-nav-title side-nav-item">Основное</li>

                      <li className="side-nav-item">
                        <a href="/" className="side-nav-link">
                          <i className="uil-dashboard"></i>
                          <span> Рабочий стол </span>
                        </a>
                      </li>

                      <li className="side-nav-title side-nav-item">Продукты и опции</li>

                      <li className="side-nav-item">
                        <a href="/product-list" className="side-nav-link">
                          <i className="uil-bag-alt"></i>
                          <span> Продукты </span>
                        </a>
                      </li>   

                      <li className="side-nav-item">
                        <a href="/option-list" className="side-nav-link">
                          <i className="uil-list-ul"></i>
                          <span> Опции </span>
                        </a>
                      </li>  

                      <li className="side-nav-title side-nav-item">Навигация</li>                                        

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false" aria-controls="sidebarEcommerce" className="side-nav-link">
                          <i className="uil-store"></i>
                          <span> Задачи </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarEcommerce">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="apps-ecommerce-products.html">Мои задачи</a>
                            </li>
                            <li>
                              <a href="apps-ecommerce-products-details.html">Анализ</a>
                            </li>
                            <li>
                              <a href="apps-ecommerce-orders.html">Создать задачу</a>
                            </li>                            
                          </ul>
                        </div>
                      </li>

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarEmail" aria-expanded="false" aria-controls="sidebarEmail" className="side-nav-link">
                          <i className="uil-envelope"></i>
                          <span> Убытки </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarEmail">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="apps-email-inbox.html">Все</a>
                            </li>                            
                          </ul>
                        </div>
                      </li>

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarProjects" aria-expanded="false" aria-controls="sidebarProjects" className="side-nav-link">
                          <i className="uil-briefcase"></i>
                          <span> Котировки </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarProjects">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="apps-projects-list.html">Для андеррайтера</a>
                            </li>
                            <li>
                              <a href="apps-projects-details.html">За сегодня</a>
                            </li>                           
                          </ul>
                        </div>
                      </li>                     

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarTasks" aria-expanded="false" aria-controls="sidebarTasks" className="side-nav-link">
                          <i className="uil-clipboard-alt"></i>
                          <span> СТОА </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarTasks">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="apps-tasks.html">Группы</a>
                            </li>
                            <li>
                              <a href="apps-tasks-details.html">Договоры</a>
                            </li>
                            <li>
                              <a href="apps-kanban.html">Бренды</a>
                            </li>
                          </ul>
                        </div>
                      </li>

                     

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarReports" aria-expanded="false" aria-controls="sidebarReports" className="side-nav-link">
                          <i className="uil-folder-plus"></i>
                          <span> Отчеты </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarReports">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="apps-tasks.html">Убытки без движения</a>
                            </li>
                            <li>
                              <a href="apps-tasks-details.html">Ошибки в датах</a>
                            </li>
                            <li>
                              <a href="apps-kanban.html">Задачи по сотрудникам</a>
                            </li>
                            <li>
                              <a href="apps-tasks.html">Сроки урегулирования</a>
                            </li>
                            <li>
                              <a href="apps-tasks.html">Задачи на отсутствующих</a>
                            </li>
                            <li>
                              <a href="apps-tasks.html">Продажа полисов</a>
                            </li>
                            <li>
                              <a href="apps-tasks.html">Рейтинг убыточности</a>
                            </li>
                            <li>
                              <a href="apps-tasks.html">Сроки ремонта</a>
                            </li>
                            <li>
                              <a href="apps-tasks.html">Стоимость ремонта</a>
                            </li>
                            <li>
                              <a href="apps-tasks.html">Резервы по урегулированию</a>
                            </li>                            
                          </ul>
                        </div>
                      </li>

                      <li className="side-nav-title side-nav-item">Полезное</li>

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarPages" aria-expanded="false" aria-controls="sidebarPages" className="side-nav-link">
                          <i className="uil-copy-alt"></i>
                          <span> Справочники </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarPages">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="pages-profile.html">Сотрудники</a>
                            </li>
                            <li>
                              <a href="pages-profile-2.html">Сюрвейеры</a>
                            </li>
                            <li>
                              <a href="pages-invoice.html">Модели ТС</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarLayouts" aria-expanded="false" aria-controls="sidebarLayouts" className="side-nav-link">
                          <i className="uil-window"></i>
                          <span> Ссылки </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarLayouts">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="layouts-horizontal.html">Само-1</a>
                            </li>
                            <li>
                              <a href="layouts-detached.html">Само-2</a>
                            </li>
                            <li>
                              <a href="layouts-full.html">Кабинет сюрвейера</a>
                            </li>
                            <li>
                              <a href="layouts-detached.html">Сайт</a>
                            </li>
                            <li>
                              <a href="layouts-detached.html">Кабинет клиента</a>
                            </li>
                          </ul>
                        </div>
                      </li>

                      <li className="side-nav-title side-nav-item mt-1">Обслуживание</li>

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarBaseUI" aria-expanded="false" aria-controls="sidebarBaseUI" className="side-nav-link">
                          <i className="uil-box"></i>
                          <span> Сервис </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarBaseUI">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="ui-accordions.html">Эквифакс</a>
                            </li>
                            <li>
                              <a href="ui-alerts.html">Расшифровка VIN</a>
                            </li>
                            <li>
                              <a href="ui-avatars.html">Карточка клиента</a>
                            </li>                            
                          </ul>
                        </div>
                      </li>

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarExtendedUI" aria-expanded="false" aria-controls="sidebarExtendedUI" className="side-nav-link">
                          <i className="uil-package"></i>
                          <span> Эксперт </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarExtendedUI">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="extended-dragula.html">Меню</a>
                            </li>
                            <li>
                              <a href="extended-range-slider.html">Лог изменений</a>
                            </li>
                            <li>
                              <a href="extended-ratings.html">Настройки</a>
                            </li>
                            <li>
                              <a href="extended-scrollbar.html">Описание БП</a>
                            </li>
                            <li>
                              <a href="extended-scrollspy.html">Рассылка сообщений</a>
                            </li>
                            <li>
                              <a href="extended-treeview.html">Типы задач</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                     

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarIcons" aria-expanded="false" aria-controls="sidebarIcons" className="side-nav-link">
                          <i className="uil-streering"></i>
                          <span> Админ </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarIcons">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="icons-dripicons.html">Системный лог</a>
                            </li>
                            <li>
                              <a href="icons-mdi.html">Изменение в данных</a>
                            </li>
                            <li>
                              <a href="icons-unicons.html">Роли</a>
                            </li>
                            <li>
                              <a href="icons-unicons.html">Блокировки</a>
                            </li>
                            <li>
                              <a href="icons-unicons.html">Сессии</a>
                            </li>
                          </ul>
                        </div>
                      </li>

                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="#sidebarForms" aria-expanded="false" aria-controls="sidebarForms" className="side-nav-link">
                          <i className="uil-document-layout-center"></i>
                          <span> Агенты </span>
                          <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="sidebarForms">
                          <ul className="side-nav-second-level">
                            <li>
                              <a href="form-elements.html">Группы параметров</a>
                            </li>
                            <li>
                              <a href="form-advanced.html">Параметры расчета</a>
                            </li>
                            <li>
                              <a href="form-validation.html">Правила расчета</a>
                            </li>
                            <li>
                              <a href="form-wizard.html">Коэффициенты</a>
                            </li>
                            <li>
                              <a href="form-fileuploads.html">Акции</a>
                            </li>
                            <li>
                              <a href="form-editors.html">Правила отказа</a>
                            </li>
                            <li>
                              <a href="form-fileuploads.html">Опции</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>


                    <div className="help-box text-white text-center">
                      <a href="#" className="float-end close-btn text-white">
                        <i className="mdi mdi-close"></i>
                      </a>
                      <img src="assets/images/help-icon.svg" height="90" alt="Helper Icon Image" />
                      <h5 className="mt-3">REST API</h5>
                      <p className="mb-3">REST API — интерфейс интеграции (API), который использует HTTP-запросы для доступа к данным.</p>
                      <a href="https://localhost:7209/swagger/index.html" target="_blank" className="btn btn-secondary btn-sm">Смотреть</a>
                    </div>


                    <div className="clearfix"></div>

                  </div>
                </div>
              </div>
            </div>
            <div className="simplebar-placeholder"></div>
          </div>
          <div className="simplebar-track simplebar-horizontal simplebar-track-horizontal">
            <div className="simplebar-scrollbar simplebar-scrollbar-display-none"></div>
          </div>
          <div className="simplebar-track simplebar-vertical simplebar-track-vertical">
            <div className="simplebar-scrollbar simplebar-scrollbar-transform"></div>
          </div>
        </div>
      </div>
    );
  }
}
