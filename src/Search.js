import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'

class Search extends Component{
  static propTypes = {
    onUpdate:PropTypes.func,
    books:PropTypes.array
  }
  state = {
    query: '',
    returnedBooks:[]
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if (query) {
      BooksAPI.search(query).then((returnedBooks)=>{
        returnedBooks.map( book =>{
          for(const b of this.props.books){
            if (book.id === b.id) {
              book.shelf= b.shelf
              break
            }
          }
        })
        this.setState({returnedBooks})
      }).catch(function (err) {
        this.setState({query:'',returnedBooks:[]})
        console.log(err)
      })
    }
  }

  render(){
    const { onUpdate, books } = this.props
    const { query } = this.state

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
              books={this.state.returnedBooks}
              onUpdate={this.props.onUpdate}
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default Search