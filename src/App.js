import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'

const App = () => {
  const [books, setBooks] = useState([])

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
      <div className='jumbotron text-center bg-primary text-dark h-50 p-3'>
        <h1>List of Books</h1>
      </div>
      <div className='text-center'>
        <Add handleCreate={handleCreate} />
      </div>
      <div className='container d-flex flex-row flex-nowrap'>
        <div className='row p-3'>
          <div className='col-sm border-right text-center'>
            <h2>API Books</h2>
            <div>
              // add the api mapping here
            </div>
          </div>
          <div className="books col-lg border-left text-center">
            <h2>Personal Books</h2>

            <div className='card-deck d-flex flex-wrap'>
            {books.map((book) => {
              return (
                <div className="card book m-1 w-50" key={book.id}>
                  <h4>Title: {book.title}</h4>
                  <h5>Author: {book.author}</h5>
                  <h5>Genre: {book.genre}</h5>
                  <h5>Year: {book.year}</h5>
                  <h5>Publisher: {book.publisher}</h5>
                  <Edit handleUpdate={handleUpdate} book={book} />
                  <button onClick={(event) => {handleDelete(event, book)}} value={book.id}>
                    X
                  </button>
                </div>
              )
            })}
              </div>
            </div>
          </div>
      </div>
      <footer className="bg-primary text-center text-lg-start">
        <div className="text-center p-3">
          <p>Created by Ryan Portorreal, Chris Elian and Matt Eckman</p>
        </div>
      </footer>
    </>
  )
}

export default App;
