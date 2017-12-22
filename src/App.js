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
  shelfTitle=["currentlyReading","wantToRead","read"]  

  render() {
    console.log(this.shelfTitle[0])
    return (
      <div className="app">
        <Route path='/search' render={()=>(
          <Search
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
                    shelf_={this.shelfTitle[0]}
                    books ={this.state.books}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Shelf
                    shelf_={this.shelfTitle[1]}
                    books ={this.state.books}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Shelf
                    shelf_={this.shelfTitle[2]}
                    books ={this.state.books}
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
