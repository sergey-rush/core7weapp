import React, { Component } from 'react';


export class Footer extends Component {

  constructor(props) {
    super(props);
  } 

  render() {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              2023 © ИНТЕРИ - interi.ru
            </div>
            <div className="col-md-6">
              <div className="text-md-end footer-links d-none d-md-block">                
                <a href="#">Поддержка</a>
                <a href="#">Контакт</a>
                <a href="#">О компании</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
