import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books:[]
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  updateShelf = (book,shelf) =>{
    BooksAPI.update(book, shelf)
    let updatedBooks = this.state.books.map(boo => {
      boo.id===book.id &&(boo.shelf = shelf)
      return boo
    })
    this.setState({books: updatedBooks})
  }

  shelfTitle=["currentlyReading","wantToRead","read"]  

  render() {
    return (
      <div className="app">
        <Route path='/search' render={()=>(
          <Search
            onUpdate={this.updateShelf}
            books={this.state.books}
          />
          )}/>

        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <Shelf
                    books={this.state.books.filter((book) => book.shelf===this.shelfTitle[0] )}
                    onUpdate={this.updateShelf}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Shelf
                    books={this.state.books.filter((book) => book.shelf===this.shelfTitle[1] )}
                    onUpdate={this.updateShelf}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Shelf
                    books={this.state.books.filter((book) => book.shelf===this.shelfTitle[2] )}
                    onUpdate={this.updateShelf}
                  />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'></Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
