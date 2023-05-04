import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { Home } from './components/Home';
import { ProductList } from './components/ProductList';
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
                <Route path='/option-list' component={OptionList} />
                <Route path='/product-option-list/:id' component={ProductOptionList} />
            </Layout>
        );
    }
}
