import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { Home } from './components/Home';
import { ProductList } from './components/ProductList';
import { OrderList } from './components/OrderList';
import { OrderItem } from './components/OrderItem';
import { ProductOptionList } from './components/ProductOptionList';
import { OptionList } from './components/OptionList';

import './default.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/product-list' component={ProductList} />
                <Route path='/order-list' component={OrderList} />
                <Route path='/order-item/:id' component={OrderItem} />
                <Route path='/option-list' component={OptionList} />
                <Route path='/product-option-list/:id' component={ProductOptionList} />
            </Layout>
        );
    }
}
