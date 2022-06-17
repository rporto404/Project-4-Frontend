import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import './App.css'

const App = () => {
  const [books, setBooks] = useState([])
  const [toggleAddForm, setToggleAddForm] = useState(false)

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

  

  useEffect(() => {
    getBooks()
  }, [])

  return (
    <>
      <div className='jumbotron text-center bg-secondary h-50 p-3'>
        <h1 >Pages for Ages</h1>
      </div>

      <div className='d-flex flex-row text-center'>  
        <Add handleCreate={handleCreate}/>  
      </div>

      <div className='container d-flex flex-row flex-nowrap w-80% justify-content-center'>
        <div className='row p-3'>
          <div className='border-right text-center'>
            <h2>API Books</h2>
            <div>
                // add the api mapping here
            </div>
          </div>
          <div className="books border-left text-center">
            <h2>Personal Books</h2>
            <div className='card-deck d-flex'>
              {books.map((book) => {
                return (
                  <div className="book" key={book.id}>
                    {/* <p className='m-0'></p> */}
                    <div>
                    <hr></hr>
                    <h3 className='title'><i>'{book.title}'</i></h3>
                    <hr></hr>
                    <h5 className='author'>{book.author}</h5>
                    <hr></hr>
                    <h6>{book.genre}</h6>
                    <h6>{book.publisher},{book.year}</h6>
                    <hr></hr>
                    </div>
                    <div className='d-flex edit-delete'>
                     <button className='btn btn-warning'><Edit handleUpdate={handleUpdate} book={book}/></button>
                     <button className='lnr lnr-trash btn btn-danger' onClick={(event) => {handleDelete(event, book)}} value={book.id}></button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-secondary text-center text-lg-start">
        <div className="text-center p-3">
          <p>Created by Ryan Portorreal, Chris Elian and Matt Eckman</p>
        </div>
      </footer>

    </>
  )
}

export default App;
