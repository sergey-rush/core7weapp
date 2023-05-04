import React, { Component } from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="wrapper">
        
        <div className="content-page">
          <div className="content">
            <Topbar />
            <div className="container-fluid">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
