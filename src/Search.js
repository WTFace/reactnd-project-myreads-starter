import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Shelf from './Shelf'

class Search extends Component{
  static propTypes = {
    books: PropTypes.array,
    onUpdate:PropTypes.func
  }
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render(){
    const { books, onUpdate } = this.props
    const { query } = this.state
    console.log(books)

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    } else {
      showingBooks = []
    }
    showingBooks.sort(sortBy('title'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          ></Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title || author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            <Shelf
              books={showingBooks}
              onUpdate={this.props.onUpdate}
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default Search