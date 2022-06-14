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
      <h1>List of Books</h1>
      <Add handleCreate={handleCreate} />
      <div className="books">
        {books.map((book) => {
          return (
            <div className="book" key={book.id}>
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
    </>
  )
}

export default App;
