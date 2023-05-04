import React, { Component } from 'react';

export default class Breadcrumbs extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-light-lighten p-2">
                    <li className="breadcrumb-item"><a href="#"><i className="uil-home-alt"></i> Главная</a></li>
                    {
                        this.props.pages.map((item, index) => {
                            return (
                                index == this.props.pages.length - 1 ?
                                    (<li key={index} className="breadcrumb-item active" aria-current="page">{item.title}</li>) :
                                    (<li key={index} className="breadcrumb-item"><a href={item.url}>{item.title}</a></li>)

                            );
                        })}

                </ol>
            </nav>
        );
    }
}