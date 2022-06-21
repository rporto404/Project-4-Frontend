import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/add'
import Edit from './components/edit'
import Login from './components/login'
import Search from './components/search'
import './App.css'

const App = () => {
  const [books, setBooks] = useState([])
  const [toggleAddForm, setToggleAddForm] = useState(false)
  const [toggleLoggedIn, setToggleLoggedIn] = useState(false)
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  let array = data.docs

  const getBooks = () => {
    axios
    .get('https://floating-fortress-76589.herokuapp.com/api/books')
    .then(
      (response) => setBooks(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }

  const handleCreate = (addBook) => {
    axios
    .post('https://floating-fortress-76589.herokuapp.com/api/books', addBook)
    .then((response) => {
      setBooks([...books, response.data])
      // getBooks()
    })
  }

  const handleUpdate = (editBook) => {
    axios
    .put('https://floating-fortress-76589.herokuapp.com/api/books/' + editBook.id, editBook)
    .then((response) => {
      setBooks(books.map((book) => {
        return book.id !== response.data.id ? book : response.data
      }))
      // getPeople()
    })
  }

  const handleDelete = (event, deletedBook) => {
    axios
    .delete('https://floating-fortress-76589.herokuapp.com/api/books/' + deletedBook.id)
    .then((response) => {
      setBooks(books.filter(book => book.id !== deletedBook.id))
      // getPeople()
    })
  }

  const searchHandler = (search) => {
      setSearch(search)
      if(search !== ''){
         const newBookList = array.filter((bookResult) => {
            return Object.values(bookResult)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())

         })
         setSearchResults(newBookList)
      } else {
         setSearchResults(array)
      }
  }

  // const setBookColor = () => {
  //   Math.floor(Math.random()*16777215)
  // }

  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
    setLoading(true)
    fetch(`http://openlibrary.org/search.json?author=tolkien`)
    .then((response) => response.json())
    .then((data) => setData(data))
    .then(() => setLoading())
    .catch(setError)
  }, [])

  if(error){
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  }

  return (
    <>
      <div className='titleDiv m-2 text-center bg-secondary h-50 p-3'>
        <h1 className='header'>Pages for Ages</h1>
        <h3 className='subHeader'> A Personal Library and Tolkien Database</h3>
      </div>
      <div className="text-center m-auto w-25 p-0">
        <Login setToggleLoggedIn={setToggleLoggedIn} />
      </div>
      <br/>
      <br/>
      {toggleLoggedIn ?
      <>
      <div className='d-flex m-auto w-50 flex-column text-center border rounded'>
        <Add handleCreate={handleCreate}/>
      </div>

      <div className='container d-flex flex-row flex-nowrap w-80% justify-content-center border rounded mt-5 p-2'>
        <div className='row p-3'>
          <div className="books text-center">
          <br/>
            <h2>Personal Books</h2>
            <h5>Check out our shared, personalized bookshelf of our favorite books!</h5>
            <div className='card-deck shelf d-flex'>
              {books.map((book) => {
                return (
                  <div className="book" key={book.id}>
                    <div className='spine'>
                      <hr></hr>
                      <h3 className='title'><i>'{book.title}'</i></h3>
                      <hr></hr>
                      <h5 className='author'>{book.author}</h5>
                      <hr></hr>
                      <h6>{book.genre}</h6>
                      <h6>{book.publisher}, {book.year}</h6>
                      <hr></hr>
                    </div>
                    <div className='btn-group justify-content-center align-items-end' role='group'>
                     <button className='lnr btn btn-warning edit h-75'><Edit handleUpdate={handleUpdate} book={book}/></button>
                     <button className='lnr lnr-trash btn btn-danger h-75' onClick={(event) => {handleDelete(event, book)}} value={book.id}></button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
      <div className='container d-flex flex-row flex-nowrap w-80% justify-content-center mt-5 border rounded'>
        <div className='row p-3'>
          <div className="books text-center flex-row">
            <h2>Tolkien Works</h2>
            <Search term={search} searchKeyword={searchHandler}/>
            <div>
                {search.length < 1 ?
                  null
                    :
                      <div className= 'card-deck shelf d-flex'>
                        {searchResults.map((item, i, a, b, c) => {
                          return (
                            <>
                              <div className="book text-primary results">
                                <div className='spine'>
                                  <h3 className='title' key={i}>{item.title}</h3>
                                  <hr></hr>
                                  <h5 className='author' key={a}>{item.author_name}</h5>
                                  <hr></hr>
                                  <h5 key={b}>{item.first_publish_year}</h5>
                                </div>
                              </div>
                            </>
                                  )
                        })}
                      </div>
                }
              </div>
            </div>
          </div>
      </div>
      </>
      : '' }

      <footer className="bg-light text-dark text-center text-lg-start">
        <div className="text-center p-3">
          <p>Created by</p>
          <div className='d-flex flex-row justify-content-around'>
            <h5><a href="https://github.com/rporto404" target='_blank'><i className="devicon-github-original colored"></i></a>Ryan Portorreal<a href="https://www.linkedin.com/in/ryan-portorreal/"target='_blank'><i className="devicon-linkedin-plain colored"></i></a></h5>
            <h5><a href="https://github.com/chriselian8" target='_blank'><i className="devicon-github-original colored"></i></a>Chris Elian<a href="https://www.linkedin.com/in/christopher-elian/"target='_blank'><i className="devicon-linkedin-plain colored"></i></a></h5>
            <h5><a href="https://github.com/eckmanmatt" target='_blank'><i className="devicon-github-original colored"></i></a>Matt Eckman<a href="https://www.linkedin.com/in/mattheweckman/"target='_blank'><i className="devicon-linkedin-plain colored"></i></a></h5>
          </div>
        </div>
      </footer>

    </>
  )
}

export default App;
