import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'

class Search extends Component{
  static propTypes = {
    onUpdate:PropTypes.func
  }
  state = {
    query: '',
    showingBooks:[]
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render(){
    const { onUpdate } = this.props
    const { query } = this.state

    if (query) {
      BooksAPI.search(query).then((showingBooks)=>{
        this.setState({showingBooks})
      })
    } 

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
              books={this.state.showingBooks}
              onUpdate={this.props.onUpdate}
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default Search