import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

export default class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemsPerPage: 10,
            itemOffset: 0
        };
    }

    handlePageClick = (event) => {
        const newOffset = (event.selected * this.state.itemsPerPage) % this.props.countItems;
        this.setState({
            itemOffset: newOffset
        });

        this.props.handlePageChange(event.selected);
    };

    render() {       
        const pageCount = Math.ceil(this.props.countItems / this.state.itemsPerPage);

        return (  
                <ReactPaginate
                    previousLabel="Пред"
                    nextLabel="След"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                />
        );
    }
}