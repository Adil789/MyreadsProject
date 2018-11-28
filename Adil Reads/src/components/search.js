import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class SearchBook extends Component {
    componentDidMount() {
        this.props.emptybooks && typeof this.props.emptybooks === 'function' && this.props.emptyBooks();
    }
    render() {
        return <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/">
                    Close
                    </Link>
                <div className="search-books-input-wrapper">
                    <input element="input" type="text" value={this.props.books.string}
                        onChange={this.props.searchQuery} placeholder="Click here to Search Book by Title or Author"
                    />
                </div>
            </div>
            <div className="search-books-results">
                <BookShelf updateShelf={this.props.updateShelf} shelf="Searched Books Are Appeared Here" books={this.props.books} />
            </div>
        </div>
    };
};

export default SearchBook;