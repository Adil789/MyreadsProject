import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import SearchBook from './components/search'
import * as BooksAPI from './BooksAPI'
class App extends React.Component {
    state = {
        AdilReads: [],
        yourSearch: []
    }
    //update the books in the shelfs of the home page 
    updateShelf = (book, shelf) => {
        
        if (shelf === 'none') {
            this.setState(beforeState => ({
                AdilReads: beforeState.AdilReads.filter(b => b.id !== book.id),
            }))
        }
        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
                const { AdilReads, yourSearch } = this.state
                const AdilReadsIds = AdilReads.map(b => b.id)
                const searchedBooksIds = AdilReads.map(b => b.id)
                let AdilNewReads = [] 
                let newSearchedBooks = []

                if (AdilReadsIds.includes(book.id) || searchedBooksIds.includes(book.id)) {
                    AdilNewReads = AdilReads.map(b => b.id === book.id ? { ...b, shelf } : b)
                    newSearchedBooks = yourSearch.map(b => b.id === book.id ? { ...b, shelf } : b)

                } else {
                    book.shelf = shelf
                    AdilNewReads = [...AdilReads, book]
                    newSearchedBooks = [...yourSearch, book]
                }
                this.setState(
                    { AdilReads: AdilNewReads, 
                    yourSearch: newSearchedBooks }
                    )

            }
            )
        }
    }
    //to search the book as we wish 
    searchQuery = (event) => {
        const query = event.target.value
        if (query !== '') { 
          BooksAPI.search(query).then(yourSearches => {
            if (!yourSearches || yourSearches.error) {
              this.setState({ yourSearch: [] })
              return
            }      
            const adjustedBooks = yourSearches.map(findResult => {
                this.state.AdilReads.map(book => {
                if (book.id === findResult.id) findResult.shelf = book.shelf
              }
          )
              return findResult
            }
            )        
            this.setState(
                { yourSearch: adjustedBooks }
                )      
          }
          )
        } else {
            this.setState(
                { yourSearch: [] }
                )

        }
      }
 componentDidMount() {
        BooksAPI.getAll().then(AdilReads => {
            this.setState(
                { AdilReads }
                )
        }
        )
    }
   // if you searched book is not found then no book is displayed 
    noneBookFound = () => this.setState(
        { yourSearch : []}
        )

    //to update the search results in the search box
    updateSearchResults=(query)=>{
            if(query===""){
                const currentState = this.state;
                currentState.yourSearches=[];
                this.setState(currentState);
                console.log(query);
            }
            else{
                BooksAPI.search(query).then((data)=>{
                    const currentState = this.state;
                    data.map((book)=>{
                        const x = this.state.books.find((b)=>(b.id === book.id))
                        book.shelf = (x) ? x.shelf : "none"
                    })
                    currentState.yourSearches=data;
                    this.setState(currentState)
                }
                )                
            }
        }
        //return to the home page when we add book to the home page shelfs
    render() {
        return (
            <div className="app">
                <Route path="/search" exact render={
                    () => (
                    <SearchBook 
                    noneBookFound={this.noneBookFound} 
                    searchQuery={this.searchQuery} 
                    updateShelf={this.updateShelf} 
                    books={this.state.yourSearch} 
                    />
                )} />
                <Route path="/" exact render={() => (
                    <HomePage 
                    updateShelf={this.updateShelf} 
                    books={this.state.AdilReads} 
                    />
                )} />

            </div>
        )
    }
}
export default App