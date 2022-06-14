import logo from './logo.svg'
import './App.css'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add.js'
import Edit from './components/Edit.js'

const App = () => {
   let [books, setBooks] = useState([])

   const getBooks = () => {
      axios
         .get('https://floating-fortress-76589.herokuapp.com/api/books')
         .then(
            (response) => setBooks(response.data),
            (err) => console.log(err)
         )
   .catch((error) => console.log(error))
   }
   const handleCreate = (addBook) => {
      axios.post('https://floating-fortress-76589.herokuapp.com/api/books', addBook)
      .then((response) => {
         setBooks([...books, response.data])
      })
   }
   const handleUpdate = (editBook) => {
      axios
         .put('https://floating-fortress-76589.herokuapp.com/api/books/' + editBook.id, editBook)
         .then((response) => {
            setBooks(books.map((book) => {
               return book.id !== response.data.id ? book : response.data
            }))
         })
   }
   const handleDelete = (event, deletedBook) => {
      axios
         .delete('https://floating-fortress-76589.herokuapp.com/api/books/' + event.target.value)
         .then((response) => {
            setBooks(books.filter(book => book.id !== deletedBook.id))
         })
   }

   useEffect(() => {
      getBooks()
   }, [])

   return (
      <>
         <h1>Books</h1>
         <Add handleCreate={handleCreate}/>
         {books.map((book) => {
            return (
               <div className="book" key={book.id}>
                  <h2>{book.title}</h2>
                  <h3>{book.author}</h3>
                  <h3>{book.genre}</h3>
                  <h3>{book.year}</h3>
                  <h3>{book.publisher}</h3>
                  <Edit handleUpdate={handleUpdate} id={book.id}/>
                  <button onClick={handleDelete} value={book.id}>
                  X
                  </button>
               </div>
            )
         })}
      </>
   )
}
export default App;
